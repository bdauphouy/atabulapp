import { Restaurant } from '@prisma/client'
import fs from 'fs/promises'
import path from 'path'

import bcrypt from 'bcrypt'
import joi from 'joi'
import jwt from 'jsonwebtoken'
import Koa from 'koa'

import _ from 'lodash'
import sendEmail from '../../utils/email/sendEmail'
import errors from '../../utils/errors'
import uploadFile from '../../utils/uploadFile'

export default class RestaurantController {
  private static async getLocation(
    ctx: Koa.Context,
    longitude: number | undefined,
    latitude: number | undefined,
  ) {
    const nearBy: Restaurant[] = await ctx.prisma.$queryRaw`select id
    from Restaurant
    order by abs(${longitude}  - longitude) + abs(${latitude} - latitude); `
    const finalResult = nearBy.map((element: { id: number }) => {
      return ctx.prisma.restaurant.findMany({
        take: 20,
        where: {
          id: element.id,
        },
        include: {
          distinctions: true,
          photos: true,
          discounts: true,
          types: true,
        },
      })
    })
    const resultArr = await Promise.all(finalResult)
    resultArr.map((element: { password: string | undefined }[]) => {
      delete element[0].password
    })
    return resultArr
  }
  public static async nearBy(ctx: Koa.Context) {
    const coordinatesSchema = joi
      .object<{
        longitude: number
        latitude: number
      }>()
      .keys({
        longitude: joi.number().required(),
        latitude: joi.number().required(),
      })
    const { error: coordinatesError, value: coordinates } =
      coordinatesSchema.validate(ctx.request.body)
    const latitude: number | undefined = coordinates?.latitude
    const longitude: number | undefined = coordinates?.longitude

    if (coordinatesError) {
      ctx.throw(400, coordinatesError)
    }
    const resultArr = await RestaurantController.getLocation(
      ctx,
      longitude,
      latitude,
    )

    ctx.body = resultArr
  }
  public static async availableDiscounts(ctx: Koa.Context) {
    const coordinatesSchema = joi
      .object<{
        longitude: number
        latitude: number
      }>()
      .keys({
        longitude: joi.number().required(),
        latitude: joi.number().required(),
      })
    const { error: coordinatesError, value: coordinates } =
      coordinatesSchema.validate(ctx.request.body)
    const latitude: number | undefined = coordinates?.latitude
    const longitude: number | undefined = coordinates?.longitude

    if (coordinatesError) {
      ctx.throw(400, coordinatesError)
    }
    const restaurants = await RestaurantController.getLocation(
      ctx,
      longitude,
      latitude,
    )
    const flattened = _.flatten(restaurants)
    const resultArr: typeof flattened = []
    flattened.forEach(element => {
      if (element.discounts.length != 0) {
        resultArr.push(element)
      }
    })
    ctx.body = resultArr
  }

  public static async lastminute(ctx: Koa.Context) {
    const coordinatesSchema = joi
      .object<{
        longitude: number
        latitude: number
      }>()
      .keys({
        longitude: joi.number().required(),
        latitude: joi.number().required(),
      })
    const { error: coordinatesError, value: coordinates } =
      coordinatesSchema.validate(ctx.request.body)
    const latitude: number | undefined = coordinates?.latitude
    const longitude: number | undefined = coordinates?.longitude

    if (coordinatesError) {
      ctx.throw(400, coordinatesError)
    }
    const restaurants = await RestaurantController.getLocation(
      ctx,
      longitude,
      latitude,
    )
    const flattened = _.flatten(restaurants)
    const resultArr: typeof flattened = []
    flattened.forEach(element => {
      if (element.discounts.length != 0) {
        Object.values(element.discounts).map(el => {
          if (el.date) {
            const discountDate: number = new Date(el.date).getTime()
            const today: number = Date.now()
            const difference = today - discountDate
            const timeDifference: number = Math.round(
              difference / (1000 * 3600 * 24),
            )
            if (timeDifference <= 2) {
              resultArr.push(element)
            }
          }
        })
      }
    })
    ctx.body = resultArr
  }
  public static async create(ctx: Koa.Context) {
    const bodySchema = joi
      .object<{
        name: string
        address: string
        coordinates: string
        zipCode: string
        city: string
        phone: string
        email: string
        password: string
        preferredContact: {
          fullName: string
          email: string
          phone: string
        }
        types: number[]
        distinctions: number[]
        headChefFullName: string | null
        pastryChefFullName: string | null
        sommelierFullName: string | null
        restaurantManagerFullName: string | null
      }>()
      .keys({
        name: joi.string().required(),
        address: joi.string().required(),
        coordinates: joi.string().required(),
        zipCode: joi
          .string()
          .regex(/^\d{5}$/)
          .required(),
        city: joi.string().required(),
        phone: joi
          .string()
          .required()
          .regex(/^[+][(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/),
        email: joi.string().required().email(),
        password: joi.string().required(),
        preferredContact: joi
          .object({
            fullName: joi.string().required(),
            email: joi.string().required().email(),
            phone: joi
              .string()
              .required()
              .regex(/^[+][(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/),
          })
          .required(),
        types: joi.array().min(1).items(joi.number()).required(),
        distinctions: joi.array().items(joi.number()).default([]),
        headChefFullName: joi.string().optional(),
        pastryChefFullName: joi.string().optional(),
        sommelierFullName: joi.string().optional(),
        restaurantManagerFullName: joi.string().optional(),
      })

    const { error: bodyError, value: body } = bodySchema.validate(
      ctx.request.body,
    )

    if (bodyError) {
      ctx.throw(400, bodyError)
      return
    }

    const types = await ctx.prisma.cookingType.findMany({
      where: {
        OR: body.types.map(type => ({ id: type })),
      },
    })

    const allTypesExist = body.types.every(type =>
      types.some(t => t.id === type),
    )

    if (!allTypesExist) {
      ctx.throw(400)
    }

    const distinctions = await ctx.prisma.restaurantDistinction.findMany({
      where: {
        OR: body.distinctions.map(distinction => ({ id: distinction })),
      },
    })

    const allDistinctionsExist = body.distinctions.every(distinction =>
      distinctions.some(d => d.id === distinction),
    )

    if (!allDistinctionsExist) {
      ctx.throw(400)
    }

    if (
      await ctx.prisma.restaurant.findUnique({
        where: { email: body.email },
      })
    ) {
      ctx.throw(409, errors.RESTAURANT_ALREADY_EXISTS.message(ctx.lang))
      return
    }

    const restaurant = await ctx.prisma.restaurant.create({
      data: {
        ...body,
        preferredContact: {
          create: { ...body.preferredContact },
        },
        types: {
          connect: body.types.map(type => ({ id: type })),
        },
        distinctions: {
          connect: body.distinctions.map(distinction => ({
            id: distinction,
          })),
        },
        password: await bcrypt.hash(body.password, 10),
      },
      include: {
        preferredContact: true,
      },
    })

    try {
      await sendEmail({
        to: restaurant.email,
        subject: 'Bienvenue parmi nous !',
        template: {
          name: 'account-created',
          data: {
            user: {
              name: restaurant.name,
            },
          },
        },
      })
    } catch (e) {
      // TODO: add to sentry
      console.error('Failed to send email', e)
    }

    if (restaurant.preferredContact) {
      try {
        await sendEmail({
          to: restaurant.preferredContact.email,
          subject:
            "Vous avez été ajouté en tant que contact préféré d'un restaurant",
          template: {
            name: 'preferred-contact-chosen',
            data: {
              restaurantName: restaurant.name,
            },
          },
        })
      } catch (e) {
        // TODO: add to sentry
        console.error('Failed to send email', e)
      }
    }

    ctx.body = restaurant
    ctx.status = 201
  }

  public static async login(ctx: Koa.Context) {
    const bodySchema = joi
      .object<{
        email: string
        password: string
      }>()
      .keys({
        email: joi.string().email().required(),
        password: joi.string().required(),
      })

    const { error: bodyError, value: body } = bodySchema.validate(
      ctx.request.body,
    )

    if (bodyError) {
      ctx.throw(400, bodyError)
      return
    }

    const restaurant = await ctx.prisma.restaurant.findUnique({
      where: { email: body.email },
    })

    if (!restaurant) {
      ctx.throw(404, errors.RESTAURANT_NOT_FOUND.message(ctx.lang))
      return
    }

    const isPasswordValid = await bcrypt.compare(
      body.password,
      restaurant.password,
    )

    if (!isPasswordValid) {
      ctx.throw(401, errors.INVALID_PASSWORD.message(ctx.lang))
      return
    }

    const token = jwt.sign({ id: restaurant.id }, ctx.env.JWT_SECRET, {
      expiresIn: '1d',
    })

    ctx.body = { token, restaurant }
  }

  public static async findOne(ctx: Koa.Context) {
    const paramsSchema = joi.object<{ id: number }>().keys({
      id: joi.number().required(),
    })

    const { error: paramsError, value: params } = paramsSchema.validate(
      ctx.params,
    )

    if (paramsError) {
      ctx.throw(400, paramsError)
      return
    }

    const restaurant = await ctx.prisma.restaurant.findUnique({
      where: { id: params.id },
    })

    if (!restaurant) {
      ctx.throw(404, errors.UNKNOWN_RESTAURANT.message(ctx.lang))
    }

    const { password: _, ...sentInformations } = restaurant

    ctx.body = sentInformations
    ctx.status = 200
  }

  public static async sendConfirmationEmail(ctx: Koa.Context) {
    const paramsSchema = joi
      .object<{
        id: string
      }>()
      .keys({
        id: joi.string().required(),
      })

    const { error: paramsError, value: params } = paramsSchema.validate(
      ctx.params,
    )

    if (paramsError) {
      ctx.throw(400, paramsError)
      return
    }

    const bodySchema = joi
      .object<{
        callbackUrl: string
      }>()
      .keys({
        callbackUrl: joi.string().uri().required(),
      })

    const { error: bodyError, value: body } = bodySchema.validate(
      ctx.request.body,
    )

    if (bodyError) {
      ctx.throw(400, bodyError)
      return
    }

    const restaurant = await ctx.prisma.restaurant.findUnique({
      where: { id: parseInt(params.id) },
    })

    if (!restaurant) {
      ctx.throw(404, errors.RESTAURANT_NOT_FOUND.message(ctx.lang))
      return
    }

    const token = Buffer.from(
      jwt.sign({ id: restaurant.id }, ctx.env.JWT_SECRET, { expiresIn: '1d' }),
    ).toString('base64')

    try {
      await sendEmail({
        to: restaurant.email,
        subject: 'Confirmation de votre compte',
        template: {
          name: 'confirm-email',
          data: {
            confirmationUrl: `${body.callbackUrl}?token=${token}`,
          },
        },
      })
    } catch (e) {
      // TODO: add to sentry
      console.error('Failed to send email', e)
    }

    ctx.status = 204
  }

  public static async confirmEmail(ctx: Koa.Context) {
    // const querySchema = joi
    //   .object<{
    //     token: string
    //   }>()
    //   .keys({
    //     token: joi.string().required(),
    //   })

    // const { error: queryError, value: query } = querySchema.validate(ctx.query)

    // if (queryError) {
    //   ctx.throw(400, queryError)
    //   return
    // }

    // const token = Buffer.from(query.token, 'base64').toString()
    // const { id } = jwt.verify(token, ctx.env.JWT_SECRET) as { id: number }

    // const restaurant = await ctx.prisma.restaurant.update({
    //   where: { id },
    //   data: { isConfirmed: true },
    // })

    // if (!restaurant) {
    //   ctx.throw(404, errors.RESTAURANT_NOT_FOUND.message(ctx.lang))
    //   return
    // }

    ctx.status = 204
  }

  public static async uploadPhoto(ctx: Koa.Context) {
    const paramsSchema = joi
      .object<{
        id: number
      }>()
      .keys({
        id: joi.number().required(),
      })

    const { error: paramsError, value: params } = paramsSchema.validate(
      ctx.params,
    )

    if (paramsError) {
      ctx.throw(400, paramsError)
      return
    }

    const restaurant = await ctx.prisma.restaurant.findUnique({
      where: { id: params.id },
    })

    if (!restaurant) {
      ctx.throw(401, errors.UNKNOWN_RESTAURANT.message(ctx.lang))
      return
    }

    const files = ctx.request.files

    if (!files) {
      ctx.throw(400, errors.RESTAURANT_PHOTO_REQUIRED.message(ctx.lang))
      return
    }

    if (!Array.isArray(files)) {
      ctx.throw(400, errors.RESTAURANT_PHOTO_REQUIRED.message(ctx.lang))
      return
    }

    const file = files[0]

    if (!file.mimetype.startsWith('image')) {
      ctx.throw(400, errors.INVALID_PHOTO_FILE_TYPE.message(ctx.lang))
      return
    }

    const restaurantPhoto = await ctx.prisma.restaurantPhoto.create({
      data: {
        restaurantId: restaurant.id,
      },
    })

    await uploadFile(
      file.buffer,
      `restaurants/${restaurant.id}/photos`,
      `${restaurantPhoto.id}.${file.mimetype.split('/')[1]}`,
    )

    ctx.status = 204
  }

  public static async getPhotosUrl(ctx: Koa.Context) {
    const paramsSchema = joi
      .object<{
        id: number
      }>()
      .keys({
        id: joi.number().required(),
      })

    const { error: paramsError, value: params } = paramsSchema.validate(
      ctx.params,
    )

    if (paramsError) {
      ctx.throw(400, paramsError)
      return
    }

    if (
      !(await ctx.prisma.restaurant.findUnique({
        where: { id: params.id },
      }))
    ) {
      ctx.throw(404, errors.UNKNOWN_RESTAURANT.message(ctx.lang))
      return
    }

    const images = await ctx.prisma.restaurantPhoto.findMany({
      where: {
        restaurantId: params.id,
      },
    })

    ctx.body = images.map(
      element => `restaurants/${params.id}/photos/${element.id}`,
    )
  }

  public static async getPhoto(ctx: Koa.Context) {
    const paramsSchema = joi
      .object<{
        id: number
        photoId: string
      }>()
      .keys({
        id: joi.number().required(),
        photoId: joi.string().required(),
      })

    const { error: paramsError, value: params } = paramsSchema.validate(
      ctx.params,
    )

    if (paramsError) {
      ctx.throw(400, paramsError)
      return
    }

    const files = await fs.readdir(`restaurants/${params.id}/photos`)
    const file = files.find(
      file => file.split('.').slice(0, -1).join('.') === params.photoId,
    )

    if (!file) {
      ctx.throw(404, errors.IMAGE_NOT_FOUND.message(ctx.lang))
      return
    }

    const filePath = path.resolve(
      process.cwd(),
      ctx.env.DATA_DIR,
      `restaurants/${params.id.toString()}/photos/${file}`,
    )

    ctx.send(await fs.readFile(filePath))
  }
}

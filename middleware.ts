/* eslint-disable @next/next/no-server-import-in-page */
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export const middleware = (request: NextRequest) => {
  const getDeviceType = () => {
    console.log(request.headers.get('user-agent'))
    const ua = request.headers.get('user-agent') || ''
    if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
      return 'tablet'
    }
    if (
      /Mobile|iP(hone|od)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(
        ua,
      )
    ) {
      return 'mobile'
    }
    return 'desktop'
  }

  const response = NextResponse.next()

  response.cookies.set('deviceType', getDeviceType())

  return response

  // switch (getDeviceType()) {
  //   case 'mobile' || 'tablet':
  //     if (!request.nextUrl.pathname.startsWith('/mobile')) {
  //       return NextResponse.redirect(new URL('/mobile', request.url))
  //     } else {
  //       return response
  //     }
  //   default:
  //     if (request.nextUrl.pathname.startsWith('/mobile')) {
  //       return NextResponse.redirect(new URL('/', request.url))
  //     } else {
  //       return response
  //     }
  // }
}

export const config = {
  matcher: [
    '/((?!api|_next|images|tag-icons|manifest.json|pwa-icons|favicon.ico).*)',
  ],
}

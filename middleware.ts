/* eslint-disable @next/next/no-server-import-in-page */
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export const middleware = (request: NextRequest) => {
  const getDeviceType = () => {
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

  // switch (getDeviceType()) {
  //   case 'mobile' || 'tablet':
  //     if (!request.nextUrl.pathname.startsWith('/mobile')) {
  //       return NextResponse.redirect(new URL('/mobile', request.url))
  //     } else {
  //       return NextResponse.next()
  //     }
  //   default:
  //     if (request.nextUrl.pathname.startsWith('/mobile')) {
  //       return NextResponse.redirect(new URL('/', request.url))
  //     } else {
  //       return NextResponse.next()
  //     }
  // }
}

export const config = {
  matcher: [
    '/((?!api|_next|images|tag-icons|manifest.json|pwa-icons|favicon.ico).*)',
  ],
}

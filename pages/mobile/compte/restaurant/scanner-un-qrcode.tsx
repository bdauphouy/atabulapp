import AccountLayout from '@/components/layouts/mobile/AccountLayout'
import QrScope from '@/components/mobile/account/QrScope'
import { useRouter } from 'next/router'
import QrScanner from 'qr-scanner'
import { ReactElement, useEffect, useRef } from 'react'

const ScanQrCode = () => {
  const videoRef = useRef(null)

  const router = useRouter()

  useEffect(() => {
    if (
      'mediaDevices' in navigator &&
      'getUserMedia' in navigator.mediaDevices
    ) {
      navigator.mediaDevices
        .getUserMedia({
          video: true,
        })
        .then(stream => {
          if (videoRef.current) {
            videoRef.current.srcObject = stream
          }
        })
    }

    if (videoRef.current) {
      const qrScanner = new QrScanner(videoRef.current, result => {
        console.log(result)
        // api.me(result).then(({ error, user }) => {
        //   if (error) return
        //   if (user) {
        //     Cookie.set(
        //       'qrData',
        //       JSON.stringify({
        //         qr: result,
        //         user,
        //       }),
        //     )
        //     qrScanner.stop()
        //     router.push('/mobile/compte/restaurant/carte-membre')
        //   }
        // })
      })

      qrScanner.start()
    }
  }, [router])

  return (
    <>
      <video
        ref={videoRef}
        id="qr-scanner-video"
        autoPlay
        muted
        className="absolute top-0 left-0 -z-10 h-screen w-full object-cover"
      >
        Scanner un QR Code
      </video>
      <QrScope />
    </>
  )
}

export default ScanQrCode

ScanQrCode.getLayout = (page: ReactElement) => {
  return (
    <AccountLayout title="Scanner" isTransparent>
      {page}
    </AccountLayout>
  )
}

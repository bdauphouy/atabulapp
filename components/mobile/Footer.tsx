import Button from '@/components/shared/Button'
import { useRouter } from 'next/router'

type FooterProps = {
  formId: string
  footerLeftButton: {
    text: string
    action?: 'go-back' | `go-to-[/${string}]`
  }
  footerRightButton: { text: string; action?: string }
}

const Footer = ({
  formId,
  footerLeftButton,
  footerRightButton,
}: FooterProps) => {
  const router = useRouter()

  const buttonLeftHandler = () => {
    if (!footerLeftButton.action) return

    switch (footerLeftButton.action) {
      case 'go-back':
        return router.back()
    }

    if (footerLeftButton.action.match(/go-to-\[\/[a-z|0-9\/]+\]/)) {
      const url = footerLeftButton.action.split('[')[1].split(']')[0]

      return router.push(url)
    }
  }

  const buttonRightHandler = () => {
    if (!footerRightButton.action) return

    if (footerRightButton.action.match(/go-to-\[\/[a-z|0-9\/]+\]/)) {
      const url = footerRightButton.action.split('[')[1].split(']')[0]

      return router.push(url)
    }
  }

  return (
    <footer className="fixed bottom-0 left-0 flex w-full items-center justify-between border-t-[1px] border-solid border-alto bg-white p-6">
      <Button onClick={buttonLeftHandler} variant="tertiary">
        {footerLeftButton.text}
      </Button>
      <Button
        onClick={buttonRightHandler}
        form={formId}
        submit
        variant="secondary"
      >
        {footerRightButton.text}
      </Button>
    </footer>
  )
}

export default Footer

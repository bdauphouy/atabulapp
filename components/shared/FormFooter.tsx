import Button from '@/components/shared/Button'
import { FormFooterActionsProps } from '@/lib/types'
import { useRouter } from 'next/router'

type FormFooterProps = {
  fixed?: boolean
} & FormFooterActionsProps

const FormFooter = ({
  formId,
  footerLeftButton,
  footerRightButton,
  fixed = false,
}: FormFooterProps) => {
  const router = useRouter()

  const buttonLeftHandler = () => {
    if (!footerLeftButton.action && !footerLeftButton.customAction) return

    if (footerLeftButton.customAction) return footerLeftButton.customAction()

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
    <footer
      className={`${
        fixed ? 'fixed' : ''
      } bottom-0 left-0 flex w-full items-center justify-between border-t-[1px] border-solid border-alto bg-white p-6`}
    >
      {footerLeftButton ? (
        <Button onClick={buttonLeftHandler} variant="tertiary">
          {footerLeftButton.text}
        </Button>
      ) : (
        <div />
      )}
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

export default FormFooter

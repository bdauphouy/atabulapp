import Button from '@/components/shared/Button'
import { FormFooterActionsProps } from '@/lib/types'
import { useRouter } from 'next/router'

type FormFooterProps = {
  isFixed?: boolean
  isInTheForeground?: boolean
} & FormFooterActionsProps

const FormFooter = ({
  formId,
  footerLeftButton,
  footerRightButton,
  isInTheForeground = false,
}: FormFooterProps) => {
  const router = useRouter()

  const handleClick = (buttonPosition: 'left' | 'right') => {
    const button =
      buttonPosition === 'left' ? footerLeftButton : footerRightButton

    if (!button.action && !button.customAction) return

    if (button.customAction) return button.customAction()

    switch (button.action) {
      case 'go-back':
        return router.back()
    }

    if (button.action.match(/go-to-\[\/[a-z|0-9\/]+\]/)) {
      const url = button.action.split('[')[1].split(']')[0]

      return router.push(url)
    }
  }

  return (
    <footer
      className={`absolute ${
        isInTheForeground ? 'z-[99999999]' : ''
      } bottom-0 left-0 flex w-full items-center justify-between border-t-[1px] border-solid border-alto/60 bg-white p-6`}
    >
      {footerLeftButton ? (
        <Button
          onClick={() => handleClick('left')}
          variant="tertiary"
          isLoading={footerLeftButton.isLoading}
        >
          {footerLeftButton.text}
        </Button>
      ) : (
        <div />
      )}
      {footerRightButton ? (
        <Button
          onClick={() => handleClick('right')}
          form={formId}
          isSubmit
          variant="secondary"
          isLoading={footerRightButton.isLoading}
        >
          {footerRightButton.text}
        </Button>
      ) : (
        <div />
      )}
    </footer>
  )
}

export default FormFooter

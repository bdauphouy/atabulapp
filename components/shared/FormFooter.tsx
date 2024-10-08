import Button from '@/components/shared/Button'
import { FormFooterActionsProps } from '@/lib/types'
import { useRouter } from 'next/router'

type FormFooterProps = {
  isAbsolute?: boolean
  isFixed?: boolean
  isInTheForeground?: boolean
  progress?: number
} & FormFooterActionsProps

const FormFooter = ({
  isAbsolute = true,
  isFixed = false,
  formId,
  footerLeftButton,
  footerRightButton,
  isInTheForeground = false,
  progress = 0,
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
      className={`${isFixed ? 'fixed' : isAbsolute ? 'absolute' : 'relative'} ${
        isInTheForeground ? 'z-[99999999]' : ''
      } bottom-0 left-0 flex w-full items-center justify-between border-t-[1px] border-solid border-alto/60 bg-white p-6 md:py-8`}
    >
      <div
        style={{ width: progress + '%' }}
        className="absolute left-0 -top-0.5 h-0.5 rounded-md bg-scarlet transition-[width] duration-300"
      ></div>
      {footerLeftButton ? (
        <Button
          onClick={() => handleClick('left')}
          variant="tertiary"
          isLoading={footerLeftButton.isLoading}
          isDisabled={footerRightButton.isDisabled}
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
          isDisabled={footerRightButton.isDisabled}
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

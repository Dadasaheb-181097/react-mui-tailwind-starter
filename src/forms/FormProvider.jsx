import { FormProvider as RHFFormProvider } from 'react-hook-form'

export function FormProvider({ methods, onSubmit, children }) {
  return (
    <RHFFormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} noValidate>
        {children}
      </form>
    </RHFFormProvider>
  )
}

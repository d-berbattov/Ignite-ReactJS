import { Button, Text, TextArea, TextInput } from '@ignite-ui/react'
import { ConfirmForm, FormActions, FormError, FormHeader } from './styles'
import { CalendarBlank, Clock } from 'phosphor-react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import dayjs from 'dayjs'
import { api } from '../../../../../lib/axios'
import { useRouter } from 'next/router'

const confirmFormSchema = z.object({
  name: z
    .string()
    .min(3, { message: 'O nome precisa no mínimo de 3 caracteres' }),
  email: z.string().email({ message: 'Digite um e-mail válido!' }),
  observations: z.string().nullable(),
})

type ConfirmFormData = z.infer<typeof confirmFormSchema>

interface ConfirmStepProps {
  schedulingDate: Date
  onCancelConfirmation: () => void
}

export function ConfirmStep({
  schedulingDate,
  onCancelConfirmation,
}: ConfirmStepProps) {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<ConfirmFormData>({
    resolver: zodResolver(confirmFormSchema),
  })

  const router = useRouter()

  const username = String(router.query.username)

  async function handleConfirmScheduling(data: ConfirmFormData) {
    const { observations, name, email } = data

    await api.post(`/users/${username}/schedule`, {
      name,
      email,
      observations,
      date: schedulingDate,
    })

    onCancelConfirmation()
  }

  const desribedDate = dayjs(schedulingDate).format('DD[ de ]MMMM[ de ]YYYY')
  const descibedTime = dayjs(schedulingDate).format('HH:mm[h]')

  return (
    <div>
      <ConfirmForm as="form" onSubmit={handleSubmit(handleConfirmScheduling)}>
        <FormHeader>
          <Text>
            <CalendarBlank />
            {desribedDate}
          </Text>
          <Text>
            <Clock />
            {descibedTime}
          </Text>
        </FormHeader>

        <label>
          <Text size="sm">Nome Completo</Text>
          <TextInput placeholder="Seu nome" {...register('name')} />
          {errors.name && (
            <FormError size="sm">{errors.name.message}</FormError>
          )}
        </label>
        <label>
          <Text size="sm">Endereço de e-mail</Text>
          <TextInput
            type="email"
            placeholder="jonhdoe@example.com"
            {...register('email')}
          />
          {errors.email && (
            <FormError size="sm">{errors.email.message}</FormError>
          )}
        </label>

        <label>
          <Text size="sm">Observações</Text>
          <TextArea
            placeholder="jonhdoe@example.com"
            {...register('observations')}
          />
        </label>

        <FormActions>
          <Button
            onClick={onCancelConfirmation}
            variant="tertiary"
            type="button"
          >
            Cancelar
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            Confirmar
          </Button>
        </FormActions>
      </ConfirmForm>
    </div>
  )
}

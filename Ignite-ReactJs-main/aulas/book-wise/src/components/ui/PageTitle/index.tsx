import React, { ComponentProps, ReactNode } from 'react'
import { Container } from './styles'
import { Heading } from '@/components/Typography'

type PageTitleProps = ComponentProps<typeof Container> & {
  icon: ReactNode
  title: string
}

export const PageTitle = ({ icon, title, ...props }: PageTitleProps) => {
  return (
    <Container {...props}>
      {icon}
      <Heading size="lg">{title}</Heading>
    </Container>
  )
}

/* eslint-disable @next/next/no-img-element */
import { signIn } from 'next-auth/react'
import { AuthButton, Container } from './styles'
import { useRouter } from 'next/router'

interface AuthButtonsProps {
  callbackUrl?: string
}

export const AuthButtons = ({ callbackUrl = '/' }: AuthButtonsProps) => {
  const rounter = useRouter()

  const handleSignIn = (provider?: string) => {
    if (!provider) {
      rounter.push(callbackUrl)
      return
    }
    signIn(provider, {
      callbackUrl,
    })
  }

  return (
    <Container>
      <AuthButton onClick={() => handleSignIn('google')}>
        <img src="/images/icons/google.svg" alt="Google Logo" />
        Entrar com Google
      </AuthButton>

      <AuthButton onClick={() => handleSignIn('github')}>
        <img src="/images/icons/github.svg" alt="Github Logo" />
        Entrar com Github
      </AuthButton>

      <AuthButton onClick={() => handleSignIn()}>
        <img src="/images/icons/rocket.svg" alt="Rocket Logo" />
        Entrar como visitante
      </AuthButton>
    </Container>
  )
}

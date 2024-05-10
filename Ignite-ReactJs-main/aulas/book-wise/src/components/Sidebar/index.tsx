/* eslint-disable @next/next/no-img-element */
import { signOut, useSession } from 'next-auth/react'
import { Navigation } from '../Navigation'
import { Container, LoginButton, UserDetails } from './styles'
import { SignIn, SignOut } from '@phosphor-icons/react'
import { Text } from '../Typography'
import { Avatar } from '../ui/Avatar'
import { useRouter } from 'next/router'

export const Sidebar = () => {
  const { data: session } = useSession()

  const user = session?.user

  const router = useRouter()

  const handleOpenProfile = () => {
    router.push(`/profile/${user?.id}`)
  }

  return (
    <Container>
      <div>
        <img className="logo" src="/images/logo.svg" alt="BookWise Logo" />
        <Navigation />
      </div>

      <footer>
        {!user ? (
          <LoginButton href="/login">
            Fazer login
            <SignIn size={24} />
          </LoginButton>
        ) : (
          <UserDetails>
            <Avatar
              size="sm"
              alt={user?.name}
              src={user?.avatar_url}
              onClick={handleOpenProfile}
              css={{ cursor: 'pointer' }}
            />
            <Text size="sm">{user?.name}</Text>
            <SignOut color="#f85a68" onClick={() => signOut()} />
          </UserDetails>
        )}
      </footer>
    </Container>
  )
}

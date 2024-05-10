import * as Dialog from '@radix-ui/react-dialog'
import { ReactNode } from 'react'
import {
  BookContent,
  BookDetailsContainer,
  BookDetailsWrapper,
  BookImage,
  BookInfos,
  DialogClose,
  DialogContent,
  DialogOverlay,
} from './styles'
import { BookOpen, Bookmark, Bookmarks, X } from '@phosphor-icons/react'
import { Heading, Text } from '../Typography'
import { RatingStars } from '../RatingStars'
import { BookInfo } from './BookInfo'

type RatingsDialogProps = {
  children: ReactNode
}

export const RatingsDialog = ({ children }: RatingsDialogProps) => {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>{children}</Dialog.Trigger>

      <Dialog.Portal>
        <DialogOverlay />
        <DialogContent>
          <DialogClose>
            <X size={24} />
          </DialogClose>

          <BookDetailsWrapper>
            <BookDetailsContainer>
              <BookImage
                width={171}
                height={242}
                alt="Book name"
                src="https://book-wise.vercel.app/_next/image?url=%2Fimages%2Fbooks%2Fo-hobbit.png&w=128&q=75"
              />
              <BookContent>
                <div>
                  <Heading size="sm">Book Name</Heading>
                  <Text color="gray-300" css={{ marginTop: '$2' }}>
                    Joe Doe
                  </Text>
                </div>
                <div>
                  <RatingStars rating={4} size="md" />
                  <Text color="gray-400" size="sm" css={{ marginTop: '$1' }}>
                    2 avaliações
                  </Text>
                </div>
              </BookContent>
            </BookDetailsContainer>
            <BookInfos>
              <BookInfo
                icon={<Bookmarks />}
                title="Categorias"
                info="ficção, Ação"
              />
              <BookInfo icon={<BookOpen />} title="Páginas" info="217" />
            </BookInfos>
          </BookDetailsWrapper>
        </DialogContent>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

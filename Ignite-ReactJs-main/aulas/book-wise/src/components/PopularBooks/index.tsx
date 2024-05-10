import { useQuery } from '@tanstack/react-query'
import { BookCard, BookWithAvgRating } from '../BookCard'
import { Text } from '../Typography'
import { Link } from '../ui/Link'
import { Container } from './styles'
import { api } from '@/lib/axios'

export const PopularBooks = () => {
  const { data: popularBooks } = useQuery<BookWithAvgRating[]>(
    ['popular-books'],
    async () => {
      const { data } = await api.get('/books/popular')
      return data?.books ?? []
    },
  )

  console.log(popularBooks)

  return (
    <Container>
      <header>
        <Text size="sm">Livros Populares</Text>
        <Link href="/explore" text="Ver todos" />
      </header>

      <section>
        {popularBooks?.map((book) => (
          <BookCard key={`{popular-${book.id}}`} book={book} />
        ))}
      </section>
    </Container>
  )
}

import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Comment from '#models/comment'
import User from '#models/user'
import Book from '#models/book'

export default class CommentSeeder extends BaseSeeder {
  public async run() {
    const users = await User.all()
    const books = await Book.all()

    if (users.length === 0 || books.length === 0) {
      console.log('⚠️ Pas d’utilisateurs ou de livres disponibles pour créer des commentaires')
      return
    }

    const random = <T>(arr: T[]) => arr[Math.floor(Math.random() * arr.length)]

    await Comment.createMany([
      {
        text: 'Un livre magnifique, j’ai adoré chaque page.',
        userId: random(users).id,
        bookId: random(books).id,
      },
      {
        text: 'Très intéressant mais parfois un peu long.',
        userId: random(users).id,
        bookId: random(books).id,
      },
      {
        text: 'Un classique incontournable, à lire absolument.',
        userId: random(users).id,
        bookId: random(books).id,
      },
      {
        text: 'Je n’ai pas trop accroché à l’histoire.',
        userId: random(users).id,
        bookId: random(books).id,
      },
      {
        text: 'Un chef-d’œuvre littéraire qui m’a marqué.',
        userId: random(users).id,
        bookId: random(books).id,
      },
    ])
  }
}

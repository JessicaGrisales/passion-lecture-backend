import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Evaluate from '#models/evaluate'
import Book from '#models/book'
import User from '#models/user'

export default class EvaluateSeeder extends BaseSeeder {
  public async run() {
    const books = await Book.all()
    const users = await User.all()

    if (books.length === 0 || users.length === 0) {
      console.log('⚠️ Pas de livres ou utilisateurs disponibles pour créer des évaluations')
      return
    }

    const random = <T>(arr: T[]) => arr[Math.floor(Math.random() * arr.length)]

    await Evaluate.createMany([
      {
        bookId: random(books).id,
        userId: random(users).id,
        star: 5,
      },
      {
        bookId: random(books).id,
        userId: random(users).id,
        star: 4,
      },
      {
        bookId: random(books).id,
        userId: random(users).id,
        star: 3,
      },
      {
        bookId: random(books).id,
        userId: random(users).id,
        star: 2,
      },
      {
        bookId: random(books).id,
        userId: random(users).id,
        star: 1,
      },
    ])
  }
}

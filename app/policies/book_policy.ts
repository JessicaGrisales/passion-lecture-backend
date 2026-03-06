import User from '#models/user'
import Book from '#models/book'
import { BasePolicy } from '@adonisjs/bouncer'

export default class BookPolicy extends BasePolicy {
  private async isOwner(user: User, book: Book): Promise<boolean> {
    return user.id === book.userId
  }
  // Peut mettre à jour un livre
  async update(user: User, book: Book) {
    return user.isAdmin || this.isOwner(user, book)
  }
  // Peut supprimer un livre
  async delete(user: User, book: Book) {
    return user.isAdmin || this.isOwner(user, book)
  }
}

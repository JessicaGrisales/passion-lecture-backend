import type { HttpContext } from '@adonisjs/core/http'
import Comment from '#models/comment'
import Book from '#models/book'
import { commentValidator } from '#validators/comment'
 
export default class CommentsController {
  /**
   * Liste des commentaires d’un livre
   */
  async index({ params, response }: HttpContext) {
    const comments = await Comment.query()
      .where('book_id', params.books_id)
      .preload('user')
      .orderBy('created_at', 'desc')
 
    return response.ok(comments)
  }
 
  /**
   * Créer un commentaire pour un livre
   */
  async store({ request, params, auth, response }: HttpContext) {
    const book = await Book.find(params.books_id)
    if (!book) {
      return response.notFound({ error: 'Livre introuvable' })
    }
 
    const user = auth.user
    if (!user) {
      return response.unauthorized({ error: 'Utilisateur non authentifié' })
    }
 
    const { text } = await request.validateUsing(commentValidator)
 
    const comment = await Comment.create({
      text,
      bookId: book.id,
      userId: user.id,
    })
 
    await comment.load('user')
    return response.created(comment)
  }
 
  /**
   * Afficher un commentaire précis
   */
  async show({ params, response }: HttpContext) {
    const comment = await Comment.query()
      .where('id', params.id)
      .andWhere('book_id', params.books_id)
      .preload('user')
      .firstOrFail()
 
    return response.ok(comment)
  }
 
  /**
   * Mettre à jour un commentaire
   */
  async update({ params, request, auth, response }: HttpContext) {
    const comment = await Comment.findOrFail(params.id)
 
    if (auth.user?.id !== comment.userId) {
      return response.forbidden({ error: 'Action non autorisée' })
    }
 
    const { text } = await request.validateUsing(commentValidator)
    comment.text = text
    await comment.save()
 
    return response.ok(comment)
  }
 
  /**
   * Supprimer un commentaire
   */
  async destroy({ params, auth, response }: HttpContext) {
    const comment = await Comment.findOrFail(params.id)
 
    if (auth.user?.id !== comment.userId) {
      return response.forbidden({ error: 'Action non autorisée' })
    }
 
    await comment.delete()
    return response.noContent()
  }
}
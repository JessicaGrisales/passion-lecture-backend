import type { HttpContext } from '@adonisjs/core/http'

import Book from '#models/book'
//import { request } from 'http'
import { bookValidator } from '#validators/book'
import BookPolicy from '#policies/book_policy'

export default class BooksController {
  async index({ response }: HttpContext) {
    //Correspond à la requête HTTP get / book

    const book = await Book.query()
      .orderBy('title')
      .preload('category')
      .preload('user')
      .preload('writer')
      .preload('evaluate')
      .preload('comments')
    console.log(book.length)

    //const book = {}
    return response.ok(book)
  }

  async store({ request, response }: HttpContext) {
    console.log('Données recues:', request.all())
    // Récupération des données envoyées par le client
    // Récupère les données envoyés par le client et validation des données
    const {
      title,
      numberOfPages,
      pdfLink,
      abstract,
      editor,
      editionYear,
      imagePath,
      userId,
      categoryId,
      writerId,
    } = await request.validateUsing(bookValidator) // Ajout Jess userId

    // Création du livre avec les données validées
    const book = await Book.create({
      title,
      numberOfPages,
      pdfLink,
      abstract,
      editor,
      editionYear,
      imagePath,
      userId, // Ajout de userId
      categoryId, // Ajout de CategoryId
      writerId,
    })
    // Création d'un nouveau livre avec les données récupérées
    return response.created(book)
  }

  async show({ params, response }: HttpContext) {
    const book = await Book.query()
      .where('id', params.id)
      .preload('category')
      .preload('user')
      .preload('writer')
      .preload('comments', (q) => q.preload('user'))
      .preload('evaluate')
      .firstOrFail()

    return response.ok(book)
  }

  async myBooks({ auth, response }: HttpContext) {
    const user = await auth.authenticate()

    const books = await Book.query()
      .where('user_id', user.id)
      .preload('category')
      .preload('writer')
      .preload('user')
      .preload('evaluate')
      .preload('comments')

    return response.ok(books)
  }
  async update({ auth, request, params, response, bouncer }: HttpContext) {
    // Mettre à jour un livre
    const { title, numberOfPages, pdfLink, abstract, editor, editionYear, imagePath } =
      await request.validateUsing(bookValidator)
    //const user = await auth.authenticate()

    // Vérification de l'existance du livre
    const book = await Book.query().where('id', params.id).firstOrFail()

    if (await bouncer.with(BookPolicy).denies('update', book)) {
      return response.unauthorized({
        message:
          "Vous n'êtes pas l'auteur de ce commentaire. Vous n'avez pas le droit de le modifier",
      })
    }

    // Mise à jour des données du livre
    book.merge({
      title,
      numberOfPages,
      pdfLink,
      abstract,
      editor,
      editionYear,
      imagePath,
    })

    // Sauvegarde des modifications
    await book.save()
    //await book.load('user')
    return response.ok(book)
  }

  async destroy({ params, response }: HttpContext) {
    // Vérification de l'existance du livre
    const book = await Book.findOrFail(params.id)
    // Supression du livre
    await book.delete()

    return response.noContent()
  }

  //Index permettant de indexer les livres par catégories
  async indexByCategory({ params, response }: HttpContext) {
    const category = params.category_id

    const booksByCategory = await Book.query().where('category_id', category).preload('category')

    return response.ok(booksByCategory)
  }
}

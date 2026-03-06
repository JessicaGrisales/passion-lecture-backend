/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import AuthController from '#controllers/auth_controller'
import BooksController from '#controllers/books_controller'
import CategoriesController from '#controllers/categories_controller'
import UsersController from '#controllers/users_controller'
import WritersController from '#controllers/writers_controller'

import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'
import CommentsController from '#controllers/comments_controller'
import EvaluatesController from '#controllers/evaluates_controller'

router.get('/', async () => {
  return {
    hello: 'Api is Working',
  }
})
router.resource('/api/books', BooksController).apiOnly()
router.resource('/api/writers', WritersController).apiOnly()
router.resource('/api/category', CategoriesController).apiOnly()
router.resource('/api/users', UsersController).apiOnly()

router
  .group(() => {
    router.resource('writers', WritersController).apiOnly()
    router.resource('category', CategoriesController).apiOnly()
    router.resource('users', UsersController).apiOnly()
    router.resource('comments', CommentsController).apiOnly()
  })
  .prefix('/api/books/:books_id')
  .use(middleware.auth())

// Ajout par Jess pour afficher les books par catégorie
router.get('/api/categories', [CategoriesController, 'index'])

// Route Imbriqué permettant de trouver tous les livres par categories
router.get('/api/category/:category_id/books', [BooksController, 'indexByCategory'])

// Routes pour l'authentification
router
  .group(() => {
    // Ajout Jess
    router.post('register', [AuthController, 'register'])
    router.post('login', [AuthController, 'login'])
    router.post('logout', [AuthController, 'logout']).use(middleware.auth())
  })
  // Route pour l'authentification / register
  .prefix('/api/user')
router
  .group(() => {
    router.get('my-books', [BooksController, 'myBooks'])
  })
  .prefix('/api')
  .use(middleware.auth())
router
  .group(() => {
    router.post('books/:id/rate', [EvaluatesController, 'rate'])
  })
  .prefix('/api')
  .use(middleware.auth())

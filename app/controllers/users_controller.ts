import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import { userValidator } from '#validators/user'
export default class UsersController {
  /**
   * Display a list of resource
   */
  async index({ response }: HttpContext) {
    const user = await User.query()
      .orderBy('id')
      .orderBy('username', 'asc')
      .preload('evaluate')
      .preload('comment')
    return response.ok(user)
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request, response }: HttpContext) {
    const { username, hashPassword, isAdmin } = await request.validateUsing(userValidator)
    const user = await User.create({ username, hashPassword, isAdmin })

    return response.created(user)
  }

  /**
   * Show individual record
   */
  async show({ params, response }: HttpContext) {
    const user = await User.query().where('id', params.id).preload('book').firstOrFail()
    return response.ok(user)
  }
  /**
   * Handle form submission for the edit action
   */
  async update({ params, request, response }: HttpContext) {
    const { username, hashPassword, isAdmin } = await request.validateUsing(userValidator)
    const user = await User.findByOrFail(params.id)
    user.merge({ username, hashPassword, isAdmin })
    await user.save()
    return response.ok({ user })
  }

  /**
   * Delete record
   */
  async destroy({ params, response }: HttpContext) {
    const user = await User.findByOrFail(params.id)
    await user.delete()

    return response.noContent()
  }
}

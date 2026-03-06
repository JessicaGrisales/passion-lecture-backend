import type { HttpContext } from '@adonisjs/core/http'
import Category from '#models/category'
import { categoryValidator } from '#validators/category'
export default class CategoriesController {
  /**
   * Display a list of resource
   */
  async index({ response }: HttpContext) {
    const category = await Category.query().orderBy('id').orderBy('label', 'asc')
    return response.ok(category)
  }
  /**
   * Handle form submission for the create action
   * Attend la vérification
   */
  async store({ request, response }: HttpContext) {
    const { label } = await request.validateUsing(categoryValidator)
    const category = await Category.create({ label })

    return response.created(category)
  }

  /**
   * Show individual record
   */
  async show({ params, response }: HttpContext) {
    const category = await Category.query().where('id', params.id).firstOrFail()
    return response.ok(category)
  }
  /**
   * Handle form submission for the edit action
   */
  async update({ params, request, response }: HttpContext) {
    const { label } = await request.validateUsing(categoryValidator)
    const category = await Category.findByOrFail(params.id)
    category.merge({ label })
    await category.save()
    return response.ok({ category })
  }
  /**
   * Delete record
   */
  async destroy({ params, response }: HttpContext) {
    const category = await Category.findOrFail(params.id)
    await category.delete()
    return response.noContent()
  }
}

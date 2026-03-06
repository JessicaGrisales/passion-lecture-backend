import type { HttpContext } from '@adonisjs/core/http'
import Evaluate from '#models/evaluate'
import { evaluateValidator } from '#validators/evaluate'

export default class EvaluatesController {
  /**
   * Display a list of resource
   */
  async index({ response }: HttpContext) {
    const evaluates = await Evaluate.query().orderBy('id')
    return response.ok(evaluates)
  }

  /**
   * Create (not used for rating a book)
   */
  async store({ request, response }: HttpContext) {
    const { star } = await request.validateUsing(evaluateValidator)
    const evaluate = await Evaluate.create({ star })
    return response.created(evaluate)
  }

  /**
   * Show individual record
   */
  async show({ params, response }: HttpContext) {
    const evaluate = await Evaluate.query().where('id', params.id).firstOrFail()
    return response.ok(evaluate)
  }

  /**
   * Update (not used for rating a book)
   */
  async update({ params, request, response }: HttpContext) {
    const { star } = await request.validateUsing(evaluateValidator)
    const evaluate = await Evaluate.findByOrFail(params.id)
    evaluate.merge({ star })
    await evaluate.save()
    return response.ok({ evaluate })
  }

  /**
   * Delete
   */
  async destroy({ params, response }: HttpContext) {
    const evaluate = await Evaluate.findOrFail(params.id)
    await evaluate.delete()
    return response.noContent()
  }

  /**
   * ⭐ MÉTHODE IMPORTANTE : Noter un livre
   */
  async rate({ auth, request, params, response }: HttpContext) {
    const user = await auth.authenticate()

    // Validation de la note
    const { star } = await request.validateUsing(evaluateValidator)

    // Vérifier si l'utilisateur a déjà noté ce livre
    const existing = await Evaluate
      .query()
      .where('book_id', params.id)
      .where('user_id', user.id)
      .first()

    if (existing) {
      existing.star = star
      await existing.save()
      return response.ok(existing)
    }

    // Sinon créer une nouvelle note
    const newRating = await Evaluate.create({
      star,
      bookId: params.id,
      userId: user.id,
    })

    return response.created(newRating)
  }
}

import { BaseModel, belongsTo, column, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import User from './user.js'
import Category from './category.js'
import Writer from './writer.js'
import Comment from './comment.js'
import Evaluate from './evaluate.js'

export default class Book extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare title: string

  @column()
  declare numberOfPages: number

  @column()
  declare pdfLink: string

  @column()
  declare abstract: string

  @column()
  declare editor: string

  @column()
  declare editionYear: number

  @column()
  declare imagePath: string

  @column()
  declare categoryId: number

  @column()
  declare userId: number

  @column()
  declare writerId: number

  @belongsTo(() => Category)
  declare category: BelongsTo<typeof Category>

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  @belongsTo(() => Writer)
  declare writer: BelongsTo<typeof Writer>

  @hasMany(() => Comment)
  declare comments: HasMany<typeof Comment>   // ← PLURIEL

  @hasMany(() => Evaluate)
  declare evaluate: HasMany<typeof Evaluate>
}

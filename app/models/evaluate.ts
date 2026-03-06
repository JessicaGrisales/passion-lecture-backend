import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import Book from './book.js'
import User from './user.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class Evaluate extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare star: number

  @column({ columnName: 'book_id' })
  declare bookId: number

  @column({ columnName: 'user_id' })
  declare userId: number

  @belongsTo(() => Book)
  declare book: BelongsTo<typeof Book>

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}

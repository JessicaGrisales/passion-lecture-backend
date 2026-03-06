import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import Book from './book.js'
import User from './user.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
export default class Comment extends BaseModel {
  @column({ isPrimary: true })
  declare id: number
 
  @column()
  declare bookId: number
 
  @column()
  declare userId: number
  @column()
  declare text: string
  @belongsTo(() => Book)
  declare book: BelongsTo<typeof Book>
 
  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>
 
  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime
 
  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
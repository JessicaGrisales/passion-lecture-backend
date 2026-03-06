import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import Book from './book.js'
import type { HasMany } from '@adonisjs/lucid/types/relations'

export default class Writer extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare lastname: string

  @column()
  declare firstname: string

  //Relation 1 Writer -> N Bookes
  @hasMany(() => Book)
  declare books: HasMany<typeof Book>
}

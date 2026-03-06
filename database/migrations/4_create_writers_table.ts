import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'writers'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.string('lastname').notNullable()
      table.string('firstname')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}

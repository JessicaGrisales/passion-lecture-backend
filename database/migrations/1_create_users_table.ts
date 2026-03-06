import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').notNullable()
      table.string('username').nullable().unique()
      table.string('is_admin')
      table.string('hash_password').notNullable() //Pourquoi hash?? docs password
      table.string('email').notNullable().unique()
      table.string('role').notNullable().defaultTo('book') //Ajout Jess Attention cours teachers
      table.timestamp('updated_at').nullable() //Ajout Jess
      table.timestamp('created_at').notNullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}

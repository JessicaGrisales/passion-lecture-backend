import { WriterFactory } from '#database/factories/writer_factory'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    await WriterFactory.createMany(10)
  }
}

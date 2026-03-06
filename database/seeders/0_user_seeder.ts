import { BaseSeeder } from '@adonisjs/lucid/seeders'
import User from '#models/user'

export default class CategorySeeder extends BaseSeeder {
  public async run() {
    // Write your database queries inside the run method

    await User.create({
      username: 'admin',
      isAdmin: true,
      hashPassword: 'admin',
      email: 'admin@admin.admin',
    })
  }
}

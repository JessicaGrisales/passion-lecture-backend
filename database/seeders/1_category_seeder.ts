import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Category from '#models/category'

export default class CategorySeeder extends BaseSeeder {
  public async run() {
    // Write your database queries inside the run method
    const categories = [
      { label: "Romans" },
      { label: "Science-fiction" },
      { label: "Fantastique / Fantasy" },
      { label: "Policier / Thriller" },
      { label: "Historique" },
      { label: "Romance" },
      { label: "Biographie / Autobiographie" },
      { label: "Développement personnel" },
      { label: "Essais" },
      { label: "Poésie" },
      { label: "Littérature jeunesse" },
      { label: "Bandes dessinées / Comics" },
      { label: "Documentaire" },
      { label: "Cuisine" },
      { label: "Voyage" },
      { label: "Art et photographie" },
      { label: "Philosophie" },
      { label: "Science et technologie" },
      { label: "Santé et bien-être" },
      { label: "Religion et spiritualité" }
    ]

    await Category.createMany(categories)
  }
}

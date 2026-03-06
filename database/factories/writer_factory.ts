import factory from '@adonisjs/lucid/factories'
import Writer from '#models/writer'

export const WriterFactory = factory
  .define(Writer, async ({ faker }) => {
    return {
      lastname: faker.person.lastName(),
      firstname: faker.person.firstName(),
    }
  })
  .build()

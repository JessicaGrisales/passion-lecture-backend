import vine from '@vinejs/vine'

export const registerValidator = vine.compile(
  vine.object({
    // Le Pseudo
    username: vine
      .string()
      .minLength(3)
      .maxLength(32)
      .unique(async (query, field) => {
        const user = await query.from('users').where('username', field).first()
        return !user
      }),

    email: vine
      .string()
      .email()
      .unique(async (query, field) => {
        const user = await query.from('users').where('email', field).first()
        return !user
      }),

    // J'ajoute .confirmed() pour la sécurité
    hashPassword: vine.string().minLength(8).maxLength(512).confirmed(),
  })
)

export const loginValidator = vine.compile(
  vine.object({
    username: vine.string(), // ou email selon le choix
    hashPassword: vine.string(),
  })
)

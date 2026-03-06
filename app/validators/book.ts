import vine from '@vinejs/vine'

const bookValidator = vine.compile(
  vine.object({
    title: vine.string().minLength(2).maxLength(255),
    numberOfPages: vine.number(),
    pdfLink: vine.string().minLength(2).maxLength(255),
    abstract: vine.string().minLength(2).maxLength(255),
    editor: vine.string().minLength(2).maxLength(255),
    editionYear: vine.number(),
    imagePath: vine.string(),

    userId: vine.number().exists(async (db, value) => {
      // Ajout Jessica
      const user = await db.from('users').where('id', value).first() 
      // user est soit un objet (si trouvé), soit undefined (si non trouvé).
      // Explication du !!user :
      // Si user est un objet → !!user devient true
      // Si user est undefined → !!user devient false
      return !!user
    }),

    categoryId: vine.number().exists(async (db, value) => {
      // Ajout Diogo
      const category = await db.from('categories').where('id', value).first() 
      // user est soit un objet (si trouvé), soit undefined (si non trouvé).
      // Explication du !!category :
      // Si category est un objet → !!user devient true
      // Si category est undefined → !!user devient false
      return !!category
    }),
    writerId: vine.number().exists(async (db, value) => {
      // Ajout Diogo
      const writer = await db.from('writers').where('id', value).first() 
      // user est soit un objet (si trouvé), soit undefined (si non trouvé).
      // Explication du !!writer :
      // Si writer est un objet → !!user devient true
      // Si writer est undefined → !!user devient false
      return !!writer
    }),
  })
)
export { bookValidator }

import vine from '@vinejs/vine'
const commentValidator = vine.compile(
  vine.object({
    text: vine.string().minLength(2).maxLength(255),
  })
)
export { commentValidator }

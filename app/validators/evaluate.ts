import vine from '@vinejs/vine'

const evaluateValidator = vine.compile(
  vine.object({
    star: vine.number().min(1).max(5),
  })
)

export { evaluateValidator }

import vine from '@vinejs/vine'

const userValidator = vine.compile(
    vine.object(
        {
            username: vine.string().minLength(2).maxLength(255),
            hashPassword:vine.string().minLength(2).maxLength(255),
            isAdmin:vine.boolean()
        }
    )
)
export {userValidator}
import vine from "@vinejs/vine";

export const newPostSchema = vine.object({
    newPost: vine.string().trim().minLength(3),
    image: vine.string().optional(),
})

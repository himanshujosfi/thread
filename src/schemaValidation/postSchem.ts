import vine from "@vinejs/vine";

export const postSchema = vine.object({
    content: vine.string().trim().minLength(5),
    // image: vine.string().minLength(6),
});


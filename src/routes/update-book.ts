import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from 'zod'
import { generateSlug } from "../utils/generate-slug.js";
import { prisma } from "../lib/prisma.js";

export async function updateBook(app: FastifyInstance){
    app
    .withTypeProvider<ZodTypeProvider>()
    .patch('/books/:bookId', {
        schema: {
            params: z.object({
                bookId: z.string().uuid()
            }),
            body: z.object({
                title: z.string(),
                details: z.string().nullable(),
            })
        }
    }, async (req, res) => {

        const { bookId } = req.params
        const { title, details } = req.body

        const slug = generateSlug(title)

        const book = await prisma.book.update({
            where: {
                id: bookId
            },
            data: {
                title,
                details,
                slug,
            }
        })

        return {
            id: book.id,
            title: book.title,
            details: book.details,
            slug: book.slug,
        }
    })
}
import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { prisma } from "../lib/prisma.js";

export async function getBookById(app: FastifyInstance) {
    app
    .withTypeProvider<ZodTypeProvider>()
    .get('/books/:bookId', {
        schema: {
            params: z.object({
                bookId: z.string().uuid()    
            })
        }
    }, async (req, res) => {

        const { bookId } = req.params

        const book = await prisma.book.findUnique({
            where: {
                id: bookId
            }
        })

        if(book === null){
            return res.status(400).send({ message: 'Book does not exist!' })
        }

        return res.status(200).send({
            id: book.id,
            title: book.title,
            details: book.details,
            slug: book.slug,
        })

    })
}
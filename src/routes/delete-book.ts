import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { prisma } from "../lib/prisma.js";

export async function deleteBookByID(app: FastifyInstance) {
    app
    .withTypeProvider<ZodTypeProvider>()
    .delete(('/books/:bookId'), {
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

        if(book == null){
            return res.status(400).send({message: 'book not found'})
        }

        const deletedBook = await prisma.book.delete({
            where: {
                id: bookId
            }
        })

        return res.status(202).send(deletedBook)
    })
}
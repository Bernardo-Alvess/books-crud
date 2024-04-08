import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod"
import { z } from "zod"
import { prisma } from "../lib/prisma.js"
import { title } from "process";

export async function getBooks(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>().get('/books', {
        schema: {
            querystring: z.object({
                index: z.string().nullish().default('0').transform(Number)
            })
        }
    } , async (req, res) => {

        const { index } = req.query

        const books = await prisma.book.findMany({
            skip: index * 10,
            take: 10,
        })

        return res.send({
            books: books.map(book => {
                return {
                    id: book.id,
                    title: book.title,
                    details: book.details
                }
            })
        })
    })
}
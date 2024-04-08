import { FastifyInstance } from "fastify";
import { z } from "zod"
import { prisma } from "../lib/prisma.js"
import { generateSlug } from "../utils/generate-slug.js"
import { ZodTypeProvider } from "fastify-type-provider-zod";

export async function createBook(app: FastifyInstance){
    app.withTypeProvider<ZodTypeProvider>().post('/books', {
        schema: {
            body: z.object({
                title: z.string().min(4),
                details: z.string().nullable()
            })
        }
    }, async (req, res) => {
        
        const { title, details } = req.body

        const slug = generateSlug(title)
    
        const bookWithSameSlug = await prisma.book.findUnique({
            where: {
                slug,
                
            }
        })
    
        if(bookWithSameSlug !== null){
            return res.status(400).send({message: 'Book with same title already exists!'})
        }
    
        const book = await prisma.book.create({
            data: {
                title,
                slug,
                details,
            }
        })
    
        return res.status(201).send({title: book.title})
    })
}
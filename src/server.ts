import fastify from "fastify"
import { PrismaClient } from "@prisma/client"
import { z } from "zod"
import { ZodTypeProvider, validatorCompiler, serializerCompiler} from "fastify-type-provider-zod"
import { generateSlug } from "./utils/generate-slug.js"
import { fastifyCors } from "@fastify/cors"
import { createBook } from "./routes/create-book.js"
import { getBooks } from "./routes/get-books.js"

const prisma = new PrismaClient({
    log: ['query']
})

const app = fastify()

app.register(fastifyCors, {origin: '*'})
app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)


app.register(createBook)
app.register(getBooks)

app.listen({port: 3333}).then(() => {
    console.log('HTPP Server Running')
    console.log('Running at: http://localhost:3333')
})
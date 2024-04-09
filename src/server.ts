import fastify from "fastify"
import { validatorCompiler, serializerCompiler} from "fastify-type-provider-zod"
import { fastifyCors } from "@fastify/cors"
import { createBook } from "./routes/create-book.js"
import { getBooks } from "./routes/get-all-books.js"
import { getBookById } from "./routes/get-book-by-id.js"
import { updateBook } from "./routes/update-book.js"

const app = fastify()

app.register(fastifyCors, {origin: '*'})
app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)


app.register(createBook)
app.register(getBooks)
app.register(getBookById)
app.register(updateBook)

app.listen({port: 3333}).then(() => {
    console.log('HTPP Server Running')
    console.log('Running at: http://localhost:3333')
})
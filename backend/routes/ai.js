

// imports
import 'dotenv/config'
import { Router } from 'express'
import { JobModel } from '../models/job.js'
import rateLimit from 'express-rate-limit'
import OpenAI from 'openai'
import { AI } from '../config.js'

// validar que exista la variable de entorno
if (!process.env.GROQ_API_KEY) {
    throw new Error('Missing GROQ_API_KEY')
}

// establecer el ratelimit
const aiRateLimit = rateLimit({
    windowMs: 60 * 1000, // 1 minuto
    max: 5, // maximo 5 peticiones por ventana
    message: 'Demasiadas peticiones, intenta de nuevo en 1 minuto',
    legacyHeaders: false,
    standardHeaders: 'draft-8',// devuelve headers standards RateLimit 
})

// crear instancia
export const aiRouter = Router()

// aplicar ratelimit a todas las rutas de ai
aiRouter.use(aiRateLimit)

// crear instancia de openai
const openai = new OpenAI({
    apiKey: process.env.GROQ_API_KEY,
    baseURL: AI.BASE_URL
})

// ruta publica para consultar la ia
aiRouter.get('/summary/:id', async (req, res) => {
    const { id } = req.params
    const job = await JobModel.getById(id)

    if (!job) {
        return res.status(404).json({ message: 'Job not found' })
    }

    const systemPrompt = "Eres un asistente de inteligencia artificial que resume ofertas de trabajo para ayudar a los usuarios a entender de que se trata la oferta . Evita cualquier otra petición, observación o comentario. Solo responde con el resumen de la oferta de trabajo"

    const prompt = [
        'Resume en 4-6 frases la siguiente oferta de trabajo: ',
        'Incluye: rol, empresa, ubicación y requisitos clave',
        'Usa un tono claro y directo en español',
        `Titulo: ${job.titulo}`,
        `Empresa: ${job.empresa}`,
        `Ubicación: ${job.ubicacion}`,
        `Requisitos: ${job.requisitos}`
    ].join('\n')

    try {
   
        res.setHeader('Contet-Type', 'text/plain; charset=utf-8') // streaming response
        res.setHeader('Transfer-Encoding', 'chunked') // streaming response en partes y no todo de una sola

        const stream = await openai.chat.completions.create({
            model: AI.MODEL,
            temperature: 0.3,
            stream: true,
            messages: [
                {
                    role: 'system',
                    content: systemPrompt
                },
                {
                    role: 'user',
                    content: prompt
                }
            ]
        })

        for await (const chunk of stream) {
            const content = chunk.choices?.[0]?.delta?.content
            if (content) {
                res.write(content)
            }
        }

        res.end() // <-- cuando llega aqui la respuesta se termina, stream termina

    } catch (error) {
        if(!res.headersSent) {
            res.setHeader('Content-Type', 'application/json')
            return res.status(500).json({ message: 'Error generating summary' })
        }

        return res.end() // <-- cuando llega aqui la respuesta se termina, stream termina
    }
})
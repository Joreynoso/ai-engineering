process.loadEnvFile()

// imports
import { Router } from 'express'
import OpenAi from 'openai'
import { JobModel } from '../models/job.js'

// crear instancia
export const aiRouter = Router()

// crear instancia de openai
const openai = new OpenAi({
    apiKey: process.env.OPENAI_API_KEY
})

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

    // cuando llamamos a la ia puede salir todo mal, por eso el trycatch
    try {
        // temrino usaro para referirse a la charla que tenemos
        // con la inteligencia artificial
        const completion = await openai.chat.completions.create({
            model: ''
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

        // chekear respuesta
        console.log('OpenAi response', completion)

        // crear sumario con respuesta de Openai
        const summary = completion.choices[0].message.content.trim()

        // devolver error si algo sale mal al generar el summary
        if (!summary) {
            return res.status(502).json({ message: 'No summary generating' })
        }

        // si todo sale bien, respondemos con el summary
        return res.json({ summary })

    } catch (error) {
        console.error(error)
        return res.status(500).json({ message: 'Error generating summary' })
    }
})
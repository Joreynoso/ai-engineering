import { useState } from "react"

const API_URL = import.meta.env.VITE_API_URL

export function useAiSummary(jobId) {
    const [summary, setSummary] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const generateSummary = async () => {
        setLoading(true)
        setError(null)
        setSummary('')

        try {
            const response = await fetch(`${API_URL}/ai/summary/${jobId}`)

            // habilitar el reader y usamos el decoder
            const reader = response.body.getReader()
            const decoder = new TextDecoder('utf-8')

            while (true) {
                const { done, value } = await reader.read()
                if (done) break

                // cada chunk es un fragmento de texto
                const text = decoder.decode(value, { stream: true })

                // actualizar el estado con lo que teniamos previamente + el texto
                setSummary(prev => prev + text)
            }

        } catch {
            setError('Error al generar el resumen')
        } finally {
            setLoading(false)
        }
    }

    return {
        summary,
        loading,
        generateSummary,
        error
    }
}
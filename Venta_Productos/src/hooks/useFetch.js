import { useState, useEffect, useCallback } from 'react'

export function useFetch(url) {
    const [estado, setEstado] = useState({ data: null, cargando: true, error: null })
    const [intento, setIntento] = useState(0)

    useEffect(() => {
        if (!url) return
            // Si la URL cambia antes de que llegue la respuesta, cancelamos la anterior
        const controller = new AbortController()

        setEstado((prev) => ({...prev, cargando: true, error: null }))

        fetch(url, { signal: controller.signal })
            .then((res) => {
                if (!res.ok) {
                    const error = new Error(`La API respondió con estado ${res.status}`)
                    error.status = res.status
                    throw error
                }
                return res.json()
            })
            .then((data) => setEstado({ data, cargando: false, error: null }))
            .catch((error) => {
                if (error.name === 'AbortError') return
                setEstado({ data: null, cargando: false, error })
            })

        return () => controller.abort()
    }, [url, intento])

    // Para el botón "Reintentar"
    const reintentar = useCallback(() => setIntento((n) => n + 1), [])

    return {...estado, reintentar }
}
'use client'
import { useEffect, useRef } from 'react'
import { Html5QrcodeScanner } from 'html5-qrcode'

export default function QrScanner({ onDecode, onError }) {
    const containerId = 'qr-reader'
    const containerRef = useRef(null)

    useEffect(() => {
        if (!containerRef.current) return

        const config = {
            fps: 10,
            qrbox: { width: 300, height: 300 }
        }
        // verbose=false para no loguear todos los pasos
        const scanner = new Html5QrcodeScanner(containerId, config, false)

        scanner.render(
            // Success callback: sólo el texto
            (decodedText) => {
                onDecode(decodedText)
                // opcional: scanner.clear() si quieres detener tras leer uno
            },
            // Error callback: filtramos NotFoundException (frames sin QR)
            (errorMessage) => {
                if (!errorMessage.includes('NotFoundException')) {
                    onError(errorMessage)
                }
            }
        )

        return () => {
            scanner.clear().catch(() => {})
        }
    }, [onDecode, onError])

    return <div id={containerId} ref={containerRef} />
}

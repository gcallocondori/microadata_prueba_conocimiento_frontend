'use client'

import { useState } from 'react'
import QrScanner from '../components/QrScanner'

export default function SalidaPage() {
    const [qrData, setQrData] = useState('')
    const [precioVenta, setPrecioVenta] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [result, setResult] = useState(null)

    const handleSubmit = async e => {
        e.preventDefault()
        setLoading(true)
        setError(null)
        setResult(null)
        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/productos/salida`,
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ qrData, precioVenta: parseFloat(precioVenta) }),
                }
            )
            if (!res.ok) {
                const err = await res.json().catch(() => null)
                throw new Error(err?.message || `Error ${res.status}`)
            }
            const data = await res.json()
            setResult(data)
            setQrData('')
            setPrecioVenta('')
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="space-y-8">
            <h2 className="text-3xl font-bold text-center">Salida de Producto</h2>

            <QrScanner
                onDecode={text => {
                    setQrData(text)
                    setError(null)
                }}
                onError={msg => setError(msg)}
            />

            <form
                onSubmit={handleSubmit}
                className="bg-white shadow-lg p-6 rounded grid gap-4"
            >
                <label>
                    <span className="font-medium">Datos QR</span>
                    <textarea
                        className="mt-1 w-full border rounded p-2"
                        rows="2"
                        value={qrData}
                        onChange={e => setQrData(e.target.value)}
                        required
                    />
                </label>

                <label>
                    <span className="font-medium">Precio Venta</span>
                    <input
                        type="number"
                        step="0.01"
                        className="mt-1 w-full border rounded p-2"
                        value={precioVenta}
                        onChange={e => setPrecioVenta(e.target.value)}
                        required
                    />
                </label>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
                >
                    {loading ? 'Procesando…' : 'Vender'}
                </button>

                {error && <p className="text-red-600">{error}</p>}
                {result && (
                    <div className="p-4 bg-green-50 border-l-4 border-green-400">
                        <p><strong>ID:</strong> {result.movimientoId}</p>
                        <p><strong>Stock:</strong> {result.cantidadRestante}</p>
                        <p><strong>Precio Venta:</strong> {result.precioVenta}</p>
                        <p><strong>Fecha:</strong> {new Date(result.fechaHora).toLocaleString()}</p>
                    </div>
                )}
            </form>
        </div>
    )
}

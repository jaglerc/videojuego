import { useEffect, useState } from 'react'
import { getProgress } from '../services/api'
import fondoBosque from '../assets/fondoBosque.jpg'
import arbolIndividual from '../assets/arbolIndividual.png'

export default function Forest({ player, onScanQR }) {
    const [progress, setProgress] = useState(null)

    useEffect(() => {
        const fetchProgress = async () => {
            try {
                const res = await getProgress(player.id)
                setProgress(res.data)
            } catch (err) {
                console.error("Error al cargar progreso:", err)
            }
        }
        fetchProgress()
    }, [player.id])

    const treesCount = progress?.seeds || 0

    // Definimos coordenadas (top, left) y escalas para que los árboles
    // se vean naturales en el paisaje.
    const treePositions = [
        { top: '55%', left: '12%', scale: 'scale-110' }, // El grande de la izquierda
        { top: '62%', left: '35%', scale: 'scale-75' },  // Uno mediano cerca del río
        { top: '65%', left: '60%', scale: 'scale-90' },  // Otro en la llanura
        { top: '58%', left: '80%', scale: 'scale-50' },  // Uno pequeño al fondo
    ]

    return (
        <div className="relative h-screen w-screen overflow-hidden bg-[#1a3a2a]">
            {/* 1. FONDO BASE (El que no tiene árboles) */}
            <img
                src={fondoBosque}
                alt="Paisaje base"
                className="absolute inset-0 w-full h-full object-cover z-0"
            />

            {/* 2. CAPA DE ÁRBOLES DINÁMICOS */}
            <div className="absolute inset-0 z-10 pointer-events-none">
                {treePositions.map((pos, index) => (
                    <img
                        key={index}
                        src={arbolIndividual}
                        alt="Árbol crecido"
                        className={`absolute transition-all duration-1000 ease-out ${pos.scale}`}
                        style={{
                            top: pos.top,
                            left: pos.left,
                            // Si el índice es menor a las semillas recolectadas, se muestra, si no, escala 0 y opacidad 0
                            opacity: index < treesCount ? 1 : 0,
                            transform: index < treesCount ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0)',
                        }}
                    />
                ))}
            </div>

            {/* 3. INTERFAZ DE USUARIO (Tus textos y botones) */}
            <div className="absolute inset-0 z-20 flex flex-col items-center justify-between py-10 px-6 bg-black/20">
                <div className="text-center">
                    <h1 className="text-white font-extrabold text-2xl uppercase drop-shadow-lg">
                        Tu Bosque
                    </h1>
                    <p className="text-[#a8d5b5] font-bold">
                        {treesCount} Semillas Germinadas
                    </p>
                </div>

                {/* Card de progreso (similar a tu estilo) */}
                <div className="w-full max-w-[300px] bg-[#0a4a43]/85 border-[4px] border-white rounded-[20px] p-4 text-center">
                    <p className="text-white text-[11px] font-semibold">
                        {treesCount === 0
                            ? "Escanea códigos QR para empezar a reforestar el valle."
                            : "¡Excelente! El cambio está ocurriendo paso a paso."}
                    </p>

                    <div className="flex justify-center gap-2 mt-4">
                        {/* Indicador visual de semillas */}
                        {[...Array(3)].map((_, i) => (
                            <span key={i} className="text-xl">
                                {i < treesCount ? '🌳' : '🌱'}
                            </span>
                        ))}
                    </div>
                </div>

                <button
                    onClick={() => onScanQR('general')}
                    className="bg-white text-[#0A4A43] font-extrabold text-xs px-8 py-3 rounded-full uppercase shadow-xl active:scale-95 transition-transform"
                >
                    Escanear Nuevo QR
                </button>
            </div>
        </div>
    )
}
import fondoBosque from '../assets/fondoBosque.png'
import logo from '../assets/logo.png'
import { useNavigate } from 'react-router-dom'

export default function RegisterPage() {
    const navigate = useNavigate()

    const handleStart = () => {
        navigate('/instrucciones')
    }

    return (
        <div className="relative h-screen w-screen overflow-hidden">
            <img
                src={fondoBosque}
                alt="fondoBosque"
                className="absolute inset-0 w-full h-full object-cover z-0"
            />

            <div className="absolute inset-0 z-10 flex flex-col items-center px-6 pt-10">

                <div className="w-full max-w-[350px]">

                    {/* LOGO + TEXTO */}
                    <div className="flex items-center justify-center gap-1 mb-6">
                        <img
                            src={logo}
                            alt="logo"
                            className="w-[350px] h-[150px] object-contain object-right mt-1 -ml-20 -mr-20"
                        />

                        <h1 className="text-white font-extrabold text-[22px] leading-[0.95] uppercase text-left min-w-[120px]">
                            ¡El bosque
                            <br />
                            profundo te
                            <br />
                            necesita!
                        </h1>
                    </div>

                    {/* CARD */}
                    <div className="mx-auto w-full max-w-[250px] h-[350px] border-[7px] border-white rounded-[20px] px-4 py-5 text-center bg-[#0a4a43]/85">

                        <h2 className="text-white font-extrabold text-[12px] leading-tight uppercase mb-4">
                            Debemos sembrar
                            <br />
                            juntos un nuevo
                            <br />
                            paisaje
                        </h2>

                        <p className="text-white text-[10px] mt-10 leading-[1.5] font-semibold mb-4">
                            Para lograrlo, es necesario recolectar semillas. ¿Cómo se hace? Acércate a cada uno de los códigos QR, responde las preguntas de los Informes de los Estamentos Nacionales y acumula semillas.
                        </p>

                        <p className="text-white text-[10px] mt-10 leading-[1.5] font-semibold">
                            Entre más semillas logres,
                            <br />
                            más oportunidades tienes de
                            <br />
                            ganar premios sorpresa.
                        </p>
                    </div>

                    {/* BOTÓN */}
                    <div className="flex justify-center mt-5">
                        <button
                            onClick={handleStart}
                            className="bg-[#0A4A43] text-white font-extrabold text-[9px] px-7 py-2 rounded-full uppercase shadow-md hover:bg-[#0d5e55] transition-colors"
                        >
                            ¿Empezamos?
                        </button>
                    </div>

                </div>
            </div>
        </div>
    )
}
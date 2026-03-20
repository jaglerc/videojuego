import fondo from '../assets/fondo.png'
import logoInforme from '../assets/logoInforme.png'
import semillas from '../assets/semillas.png'
import { useNavigate } from 'react-router-dom'

export default function HomePage() {
    const navigate = useNavigate()

   const handleStart = () => {
  navigate('/game')
}

    return (
        <div className="relative h-screen w-screen overflow-hidden">
            <img
                src={fondo}
                alt="fondo"
                className="absolute inset-0 w-full h-full object-cover z-0"
            />

            <div className="absolute inset-0 z-10 flex flex-col items-center justify-start -mt-2">

                <img src={logoInforme} className="w-[400px] h-[200px] mt-10" />
                <div className="mx-auto w-full max-w-[250px] h-[170px] border-[7px] border-white rounded-[20px] mb-5 px-4 py-5 mt-5text-center bg-[#0a4a43]/85">
                    <p className="text-white">Recuerda que cada respuesta correcta es una semilla que fortalece nuestro bosque.</p>
                </div>
                <div className="mx-auto w-full max-w-[250px] h-[120px] border-[7px] border-white rounded-[20px] px-4 py-5 text-center bg-[#0a4a43]/85">
                    <p className="text-white">Tienes 0 semillas</p>
                    <img src={semillas} className="-mt-8"></img>
                </div>

                <button onClick={handleStart} className="text-white bg-[#0A3634] rounded-full p-2 mt-7 mb-10">
  ¡Listo, voy a escanear!
</button>

            </div>

        </div>
    );
}

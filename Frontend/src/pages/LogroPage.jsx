import fondo from '../assets/fondo.png'
import logoScout from '../assets/logoScout.png'
import marcaDos from '../assets/marcaDos.png'
import marcaCuatro from '../assets/marcaCuatro.png'
import marco from '../assets/marco.png'
import { useState } from 'react'

export default function QuizPreguntaUno() {
    const [name, setName] = useState("");

    const createPlayer = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:3000/player", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name: name })
        });
        const data = await response.json();
        console.log("Jugador creado:", data);
    };

    return (
        <div className="relative h-screen w-screen overflow-hidden font-sans">
            {/* 1. IMAGEN DE FONDO (Se mantiene igual) */}
            <img
                src={fondo}
                alt="fondo"
                className="absolute inset-0 w-full h-full object-cover z-0"
            />

            {/* 2. MARCAS DECORATIVAS (Encima del fondo) */}
            <img
                src={marcaDos}
                className="absolute inset-0 w-10 h-10 object-cover z-1 opacity-50 pointer-events-none"
            />

            {/* CONTENIDO PRINCIPAL */}
            <div className="absolute inset-0 z-10 flex flex-col p-8 md:p-12">
                <h1 className="text-white text-3xl font-black ml-40 mt-10">BIEN!</h1>
                <img src={marcaCuatro} className="w-30 h-20 object-contain -mt-17 ml-68" alt="2" />
                {/* HEADER: Número y Título */}
                

                <div className="relative flex justify-center items-center">
                    <img src={marco} className="h-60 w-[350px] ml-22 object-contain scale-110 -mt-5" alt="marco" />
                </div>

                {/* 2. TEXTO QUE SUBE (Ajuste aquí) */}
                <div className="flex flex-col items-center -mt-20 relative z-10">
                    {/* El -mt-20 lo empuja hacia arriba sobre el espacio del marco */}
                    <p className="text-white text-center font-bold text-lg leading-tight mt-10">
                        Para el informe del Consejo
                        <br />
                        Nacional obtuviste:
                    </p>
                </div>
                <div className="mx-auto w-full max-w-[250px] h-[170px] border-[7px] border-white rounded-[20px] mb-5 px-4 py-5 mt-5 text-center bg-[#0a4a43]/85">
                    <p className="text-white">Tienes una semilla.</p>
                </div>
                <button className="bg-[#0A4A43] w-50 ml-14 text-white font-extrabold text-[9px] px-7 py-2 rounded-full uppercase shadow-md hover:bg-[#0d5e55] transition-colors">
                    Seguimos?
                </button>


                {/* FOOTER: Semicírculo con Logo */}
                <div className="flex justify-center -mb-8"> {/* Ajuste para que se pegue abajo */}
                    <img src={logoScout} className="w-full h-full object-contain mt-14" alt="Logo Scouts" />
                </div>

            </div>
        </div>
    );
}
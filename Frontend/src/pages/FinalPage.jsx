import React from 'react';
// Asumiendo que esta es la única imagen que tienes
import logo from '../assets/logo.png'; // El logo circular blanco.

export default function FinalPage() {
    return (
        <div className="flex justify-center items-center h-screen bg-gray-100 font-sans">
            {/* Contenedor principal del póster (color sólido verde bosque) */}
            <div className="bg-[#0A4D46] w-[400px] h-[750px] shadow-2xl flex flex-col items-center py-10 px-8 text-white relative">

                {/* Sección superior: Logos */}
                <div className="relative mb-6 flex flex-col items-center w-full">
                    {/* Logo con tamaño incrementado (w-64) */}
                    <img src={logo} alt="ASN 2026 Logo" className="w-[900px] h-[250px]" />
                </div>

                {/* Línea divisoria superior - Incrementada de w-16 a w-32 */}
                <div className="w-32 h-0.5 bg-white/50 mb-10"></div>

                {/* Sección central: Texto Principal */}
                <div className="text-center mb-10 -mt-10 leading-snug">
                    <p className="text-[20px] font-light">
                        Desarrollado con
                    </p>
                    <p className="text-[20px]">
                        <span className="font-bold italic">Profundidad</span> para la
                    </p>
                    <p className="text-[22px] mt-1 leading-tight">
                        Asociación Scout de
                        <br/>
                        Colombia
                    </p>
                </div>

                {/* Línea divisoria inferior - Incrementada de w-16 a w-32 */}
                <div className="w-32 h-0.5 bg-white/50 mb-10"></div>

                {/* Sección inferior: Créditos */}
                <div className="text-center mt-auto mb-112 w-full px-4 flex flex-col gap-5">
                    <div>
                        <p className="text-[16px] font-bold">
                            Carla Nereli Velasco Gonzalez
                        </p>
                        <p className="text-[11px] uppercase tracking-wider text-white/90">
                            Secretaria del Consejo Scout Nacional
                        </p>
                    </div>
                    <div>
                        <p className="text-[16px] font-bold">
                            Jagler David Caviedes
                        </p>
                        <p className="text-[11px] uppercase tracking-wider text-white/90">
                            Desarrollador
                        </p>
                    </div>
                    {/* Nuevo Desarrollador */}
                    <div>
                        <p className="text-[16px] font-bold">
                            Deivy Patiño Rodriguez
                        </p>
                        <p className="text-[11px] uppercase tracking-wider text-white/90">
                            Desarrollador
                        </p>
                    </div>
                </div>

            </div>
        </div>
    );
}
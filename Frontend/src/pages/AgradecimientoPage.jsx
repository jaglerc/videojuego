import fondoBosque2 from '../assets/fondoBosque2.png';
import logoScout from '../assets/logoScout.png';
import semilla from '../assets/semillaIndividual.png';

export default function AgradecimientoPage() {
    const semillasObtenidas = 15;

    return (
        <div className="relative min-h-screen h-dvh w-full overflow-hidden font-sans flex flex-col items-center">
            <img
                src={fondoBosque2}
                alt="fondo"
                className="absolute inset-0 w-full h-full object-cover z-0"
            />

            <div className="absolute inset-0 bg-black/5 z-0" />

            <div className="relative z-10 flex flex-col items-center w-full h-full">

                <div className="flex flex-col items-center pt-10 sm:pt-16 px-6 w-full">

                    <div className="flex justify-center items-center space-x-2 mb-6 h-24">
                        {[0, 1, 2].map((i) => (
                            <img
                                key={i}
                                src={semilla}
                                alt="semilla"
                                className={`w-28 h-16 sm:w-16 sm:h-20 mt-10 object-contain drop-shadow-md transition-transform 
                                    ${i === 1 ? 'translate-y-4' : '-translate-y-2'}`}

                            />
                        ))}
                    </div>

                    {/* Recuadro Obtuviste */}
                    <div className="bg-[#0a4a43] border-[3px] border-white mt-15 px-6 py-2 rounded-lg mt-8 shadow-xl mb-6 inline-block">
                        <h2 className="text-white text-xl sm:text-2xl font-bold whitespace-nowrap">
                            Obtuviste {semillasObtenidas} Semillas
                        </h2>
                    </div>

                    {/* Cápsula Tarea */}
                    <div className="bg-[#5c8d47] mt-10 px-8 py-4 rounded-[40px] max-w-[280px] sm:max-w-xs shadow-lg border border-white/20 text-center">
                        <p className="text-white italic text-base sm:text-lg leading-tight font-medium">
                            y tu tarea es ir a sembrarlas en nuestro <br />
                            <span className="font-black not-italic uppercase">Bosque Profundo</span>
                        </p>
                    </div>
                </div>

                {/* Bloque Inferior: Siempre pegado abajo */}
                <div className="mt-auto w-full flex flex-col items-center">
                    {/* Banner Verde */}
                    <div className="w-full bg-[#0a4a43] py-5 shadow-[0_-5px_15px_rgba(0,0,0,0.2)]">
                        <h3 className="text-white text-lg sm:text-xl font-black leading-tight tracking-tighter text-center uppercase">
                            ¡Gracias a la <br /> gestión de todo <br /> un país scout!
                        </h3>
                    </div>

                    {/* Logo: Usamos -mb para que descanse visualmente en el borde */}
                    <div className="flex justify-center w-full -mb-2 mt-10">
                        <img
                            src={logoScout}
                            className="w-150 h-auto object-contain -mb-17 "
                            alt="Logo Scouts"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
import fondo from '../assets/fondo.png'
import logo from '../assets/logo.png'
import { useState } from 'react'

export default function HomePage() {
    const [name, setName] = useState("");
    const createPlayer = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:3000/player", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: name
            })
        });
        const data = await response.json();
        console.log("Jugador creado:", data);
    };

    

    return (
        <div className="relative h-screen w-screen overflow-hidden">
            <img
                src={fondo}
                alt="fondo"
                className="absolute inset-0 w-full h-full object-cover z-0"
            />

            <div className="absolute inset-0 z-10 flex flex-col items-center justify-start pt-5">

                <img src={logo} className="w-[490px] h-[200px]" />

                <h1 className="text-white text-center text-xl leading-tight">
                    LXIII ASAMBLEA
                    <br/>
                    SCOUT NACIONAL
                </h1>

                <p className="mt-3 px-4 py-1 text-green-900 bg-white border border-white rounded-full text-sm">ES HORA DE JUGAR!</p>

                <p className="text-white mt-4 font-bold text-lg text-center text-sm leading-tight">
                    SEMBRANDO EL BOSQUE
                    <br/>
                    PROFUNDO
                </p>
                <form onSubmit={createPlayer} className="flex flex-col">
                    <label className="text-white font-bold">Nombre</label>
                    <input value={name} onChange={(e) => setName(e.target.value)} className="border border-white bg-white rounded-full h-[20px]">
                    </input>
                    <label className="text-white font-bold">Region</label>
                    <input className="border border-white bg-white rounded-full h-[20px]"></input>
                    <button type="submit" className="text-white bg-[#0A3634] rounded-full mt-10">COMENZAR</button>
                </form>

            </div>

        </div>
    );
}

import { useState } from "react";

//utils
import icons_trades_types from "./icons_trades_types";
import safetyStandards from "./security_standard";

export const ProgressReport = () => {

    const [projectDetails, setProjectDetails] = useState({
        name: "Proyecto Gamma",
        progress: 65,
        trades_involved: ["Electricista", "Albañil", "Fontanero"],
        security_standards: {
            "OSHA 1926": true,
            "ANSI A10 Series": false,
            "NFPA 70": true,
            "NFPA 241": false,
            "EPA Asbestos Regulations": false,
            "EPA Lead Renovation, Repair and Painting (RRP) Rule": true,
            "NIOSH Guidelines": false,
            "ANSI/ASSE Z117.1": false,
            "OSHA 1910 Subpart D": false,
            "OSHA 1910 Subpart F": false,
            "ANSI/ISEA Z89.1": false,
            "ANSI/ISEA Z87.1": false,
            "NFPA 101": false,
            "OSHA 1910.120": false
        }
    })

    return (
        <div className="min-h-screen justify-center bg-blue-50 px-20">
            <div className="grid grid-cols-3 gap-4 justify-between content-end pt-12 pb-4 border-b-2 border-blue-900">
                <div className="col-start-1 col-end-3">
                    <h1 className="text-blue-900 text-4xl font-bold">{projectDetails.name}</h1>
                </div>
                <div className="col-start-3 col-end-4 justify-self-end">
                    <h1 className="text-blue-700 text-2xl font-bold">
                        Fase | Estructura
                    </h1>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-4 justify-between py-6">
                <h2 className="text-blue-900 w-full text-2xl font-bold mb-5">Trades involucrados</h2>
                <div className="col-start-1 col-end-4 flex flex-wrap">
                    {projectDetails?.trades_involved?.length ? (
                        icons_trades_types
                            .filter(trade =>
                                projectDetails.trades_involved.includes(trade.trade_type)
                            )
                            .map((trade) => (
                                <span
                                    key={trade.trade_type}
                                    className={`${trade.color_assigned} text-white flex w-32 items-center gap-2 px-3 py-1 me-2 rounded-md text-sm`}
                                >
                                    {trade.icon}
                                    {trade.trade_type}
                                </span>
                            ))
                    ) : (
                        <p className="text-slate-500">
                            No hay trades involucrados en este proyecto.
                        </p>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-3 gap-4 justify-between pt-6 border-b-2 border-blue-900">
                <div className="col-start-1 col-end-3">
                    <h2 className="text-blue-900 w-full text-2xl font-bold mb-5">Registro de avances</h2>
                </div>
                <button type="button"
                    className="bg-blue-900 text-white w-48 h-12 mb-2 py-1 px-1 rounded-md hover:bg-blue-700 justify-self-end">
                    Agregar avance
                </button>
            </div>

            <div className="grid grid-cols-3 gap-10 justify-between pt-6">
                <div className="col-start-1 col-end-3">
                    <div className="my-4">
                        <h3 className="my-4 text-blue-700 font-bold text-lg">Avance {projectDetails.progress}%</h3>
                        <svg width="400" height="400" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M200.002 3.72842e-09C228.956 0.000176621 257.565 6.28722 283.852 18.4267C310.139 30.5661 333.477 48.2685 352.252 70.3103C371.028 92.3522 384.793 118.208 392.598 146.091C400.403 173.974 402.06 203.219 397.455 231.805C392.851 260.391 382.095 287.636 365.929 311.658C349.764 335.68 328.576 355.906 303.829 370.937C279.082 385.969 251.366 395.448 222.597 398.719C193.828 401.991 164.692 398.977 137.202 389.885L168.602 294.942C182.347 299.488 196.915 300.995 211.3 299.36C225.685 297.724 239.543 292.985 251.916 285.469C264.29 277.953 274.884 267.841 282.967 255.829C291.049 243.818 296.428 230.196 298.73 215.902C301.032 201.609 300.204 186.987 296.301 173.045C292.399 159.104 285.516 146.176 276.128 135.155C266.74 124.134 255.071 115.282 241.927 109.213C228.784 103.143 214.479 99.9999 200.002 100L200.002 3.72842e-09Z" fill="url(#paint0_linear_370_1753)" />
                            <path d="M137.202 389.885C92.0749 374.961 53.7383 344.453 29.0631 303.829C4.38782 263.205 -5.01301 215.121 2.54548 168.195C10.104 121.269 34.1276 78.5695 70.3108 47.7483C106.494 16.9271 152.471 -0.000289923 200.002 5.93553e-09L200.002 100C176.237 100 153.248 108.464 135.157 123.875C117.066 139.285 105.054 160.635 101.275 184.098C97.4959 207.56 102.196 231.602 114.533 251.914C126.871 272.225 146.039 287.48 168.602 294.942L137.202 389.885Z" fill="#B6D2FF" />
                            <defs>
                                <linearGradient id="paint0_linear_370_1753" x1="137" y1="350.5" x2="320.5" y2="46" gradientUnits="userSpaceOnUse">
                                    <stop offset="0.158604" stop-color="#3B64CE" />
                                    <stop offset="1" stop-color="#1E3268" />
                                </linearGradient>
                            </defs>
                        </svg>
                    </div>
                    <div className="my-10 bg-orange-100 p-6 rounded-md">
                        <h2 className="text-blue-900 w-full text-2xl font-bold mb-5">Historial de registros</h2>
                        <ul className="space-y-0">
                            <li className="inline">
                                <div className="flex gap-3 items-center">
                                    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M7.32129 1.46387C10.5561 1.46387 13.1786 4.08654 13.1787 7.32129C13.1787 10.5561 10.5561 13.1787 7.32129 13.1787C4.08654 13.1786 1.46387 10.5561 1.46387 7.32129C1.46394 4.08659 4.08659 1.46394 7.32129 1.46387Z" fill="white" stroke="#1890FF" stroke-width="2.92857" />
                                    </svg>

                                    <span className="font-medium text-slate-500">01/02/26</span>
                                    <span className="text-slate-700">Chequeo de cimientos</span>
                                </div>
                                <div className="text-zinc-300 text-xl text-start w-12 ms-0.5">|</div>
                            </li>

                            <li className="gap-3 items-center">

                                <div className="flex gap-3 items-center">
                                    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M7.32129 1.46387C10.5561 1.46387 13.1786 4.08654 13.1787 7.32129C13.1787 10.5561 10.5561 13.1787 7.32129 13.1787C4.08654 13.1786 1.46387 10.5561 1.46387 7.32129C1.46394 4.08659 4.08659 1.46394 7.32129 1.46387Z" fill="white" stroke="#1890FF" stroke-width="2.92857" />
                                    </svg>

                                    <span className="font-medium text-slate-500">05/02/26</span>
                                    <span className="text-slate-700">Análisis de conexión eléctrica</span>
                                </div>
                                <div className="text-zinc-300 text-xl text-start w-12 ms-0.5">|</div>
                            </li>

                        </ul>

                    </div>
                </div>
                <div className="bg-blue-100 col-start-3 col-end-4 rounded-md">
                    <div className="justify-items-center mt-6 mt-2">
                        <h2 className="text-blue-900 text-xl font-bold">Estandares de seguridad</h2>
                        <h3 className="text-slate-500">(Marcar el casillero correcto)</h3>
                    </div>
                    <div className="m-4">
                        {safetyStandards.map((standard) => (
                            <div key={standard.standard_name} className="text-slate-500">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={projectDetails?.security_standards?.[standard.standard_name] || false}
                                        readOnly
                                        className="w-4 h-4 rounded border-slate-700 accent-blue-800 focus:ring-blue-700 focus:ring-offset-slate-900"
                                    />
                                    <span className="text-sm text-slate-500 py-2">
                                        {standard.standard_name}
                                    </span>
                                </label>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="grid-cols-start-1 col-end-4 justify-self-center py-10">
                <button type="submit"
                className="bg-blue-900 text-white w-80 px-4 py-2 rounded-md hover:bg-blue-800">
                    Actualizar
                </button>
            </div>

        </div>
    );
}
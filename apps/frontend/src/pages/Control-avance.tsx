import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const ControlAvance: React.FC = () => {

    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();

    const UserIcon = () => (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 stroke-current" viewBox="0 0 24 24" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
    );
    const CheckIcon = () => (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 stroke-white" viewBox="0 0 24 24" fill="none" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
    );

    type TimelineState = 'completed' | 'current' | 'pending' | 'none';

    const projectData = [
        { id: 1, name: "Project Alpha" },
        // { id: 2, name: "Project Beta" },
        // { id: 3, name: "Project Gamma" },
    ]

    const workers = [
        { id: 1, name: "Ramon Alcaide Gomez", role: "construction worker" },
        { id: 2, name: "Paco Fernandez Rodriguez", role: "Plumber" },
        { id: 3, name: "Piero Medina", role: "electrician" },
    ]

    const projectManagers = [
        { id: 1, name: "Maria Garcia", role: "Project Manager" },
        { id: 2, name: "Juan Perez", role: "Project Manager" },
    ]

    const phases = [
        { id: 1, title: 'Start project', status: 'Started', state: 'completed' },
        { id: 2, title: 'Planning project', status: 'In progress', state: 'pending' },
        { id: 3, title: 'Execution of the project', status: 'Pending approval', state: 'none' },
        { id: 4, title: 'Project closing', status: 'Pending', state: 'none' },
    ]

    const trades = [
        { id: 1, name: "Carpentry" },
        { id: 2, name: "Plumbing" },
        { id: 3, name: "Electrical" },
    ]

    const stateStyles = {
        completed: "bg-green-500",
        current: "bg-sky-200 border-2 border-sky-300",
        pending: "bg-yellow-200 border-2 border-yellow-300",
        none: "bg-gray-200 border-2 border-gray-300",
    };

    return (
        <>
            {projectData.length === 0 ? (
                <div className="container  bg-white mx-auto text-black text-center p-5 m-5">
                    <h1 className="text-3xl font-bold mb-6">No se encontraron proyectos</h1>
                </div>
            ) : (projectData.map((project) => (
                <div className=" flex flex-row mx-auto bg-white text-black border-b-4 border-gray-600 mt-5" key={project.id}>
                    <div className="basis-2/3 bg-white text-black text-start flex items-center px-5" key={project.id}>
                        <h1 className="text-3xl font-bold mb-3">{project.name}</h1>
                    </div>
                    <div className="basis-1/3 flex justify-end items-center pr-3">
                        <button className="bg-blue-900 text-white hover:bg-blue-600 py-2 px-4 rounded w-40 h-10 flex items-center justify-center">Planos</button>
                    </div>
                </div>
            ))
            )}

            <div>
                <div>
                    {/* Project Manager */}
                    <div className="bg-white text-black p-5">
                        <h2 className="text-2xl font-semibold my-2">Project manager</h2>
                        <div
                            className="py-2 px-2 flex gap-4 items-center border border-gray-300 rounded-lg bg-sky-100"
                        >
                            <img
                                src="#"
                                alt="Foto"
                                className="size-20 rounded-full border bg-gray-400 object-cover"
                            />
                            <h3 className="font-bold">{projectManagers[0]?.name}</h3>
                            <p>{projectManagers[0]?.role}</p>
                        </div>
                    </div >

                    {/* <!-- equipo asignado --> */}
                    <div className="bg-white text-black p-5">
                        <h2 className="mt-4 text-2xl font-semibold my-2">Equipo asignado</h2>
                        {workers.length === 0 ? (
                            <p>There is not workers assigned to this project.</p>
                        ) : (
                            workers.map((worker) => (
                                <div className="border border-gray-300 rounded-lg" key={worker.id}>
                                    <div
                                        className="py-2 px-2 flex gap-4 items-center border border-gray-300 rounded-lg bg-sky-100">
                                        <img
                                            src="#"
                                            alt="Foto"
                                            className="size-20 rounded-full border bg-gray-400 object-cover"
                                        />
                                        <h3 className="font-bold">{worker.name}</h3>
                                        <p>{worker.role}</p>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>


                <div>
                    {/* <!-- phases of the project -->*/}
                    <div className="relative pt-2 bg-white text-black p-5">
                        <h2 className="text-xl font-semibold text-[#0A1F61] mb-8">Phases of the project</h2>

                        <div className="mb-10">
                            {phases.map((phase, index) => (
                                <div key={phase.id} className="flex relative pb-4">
                                    <div className="flex flex-col items-center justify-center mr-6 relative">
                                        <div className={`w-6 h-6 rounded-full z-10 flex items-center justify-center ${stateStyles[phase.state]}`}>
                                            {phase.state === 'completed' && <CheckIcon />}
                                        </div>

                                        {index < phases.length - 1 && (
                                            <div className={`absolute top-6 bottom-[-50px] w-[2px] ${phase.state === 'completed' ? 'bg-green-500' : 'bg-gray-300'
                                                }`}></div>
                                        )}
                                    </div>

                                    <div className="flex-1 bg-[#E6EDF8] border border-[#B0C0D0] rounded-lg p-3">
                                        <h3 className={`text-base font-medium m-0 mb-1 ${phase.state === 'pending' ? 'text-gray-500' : 'text-gray-900'
                                            }`}>
                                            {phase.title}
                                        </h3>
                                        <p className="text-sm text-gray-500 m-0">{phase.status}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* <!-- Trades section --> */}
                        <div className="bg-white text-black p-5">
                            <h2 className="text-2xl font-semibold my-2">Trades</h2>
                            {trades.length === 0 ? (
                                <p>There is not trades assigned to this project.</p>
                            ) : (
                                trades.map((trade) => (
                                    <div
                                        className="py-1 px-2 my-3 flex w-40 border border-gray-300 rounded-lg bg-sky-100"
                                        key={trade.id}
                                    >
                                        <p>{trade.name}</p>
                                    </div>
                                ))
                            )}

                        </div>
                    </div>
                </div>

                {/* <!-- Buttons --> */}
                <div className="flex justify-around bg-white text-black p-5">
                    {/* <!-- Button approve progress  --> */}
                    <div className="p-2 my-3 text-center bg-blue-900 hover:bg-blue-600 mt-4 w-60 rounded">
                        <button type="submit" id="new-project" className="text-white text-xl font-mono">Approve progress</button>
                    </div>

                    {/* button AI analysis */}
                    <div className="p-2 my-3 text-center bg-blue-900 hover:bg-blue-600 mt-4 w-60 rounded bg-gradient-to-r from-blue-900 to-orange-700">
                        <button type="submit" id="ai-analysis" className="text-white text-xl font-mono">AI Analysis ✨</button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ControlAvance;
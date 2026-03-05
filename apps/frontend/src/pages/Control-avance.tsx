import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import icons_trade_types from "../pages/Report/icons_trades_types";
import { ButtonPlans } from '../components/common/Button_plans';
import { ButtonDelete } from '../components/common/Button_delete';
import { ButtonAI } from '../components/common/Button_AI';

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
        { id: 2, title: 'Planning project', status: 'In progress', state: 'current' },
        { id: 3, title: 'Execution of the project', status: 'Pending', state: 'none' },
        { id: 4, title: 'Project closing', status: 'Pending', state: 'none' },
    ]

    const iconsStyles = {
        "Plumbing": "bg-blue-200 border-blue-300",
        "Electrical": "bg-green-200 border-green-300",
    }

    const trades = [
        { id: 1, name: "Carpintero", icon: icons_trade_types["Carpintero"] },
        { id: 2, name: "Fontanero", icon: icons_trade_types["Fontanero"] },
        { id: 3, name: "Electricista", icon: icons_trade_types["Electricista"] },
    ]

    const stateStyles = {
        completed: "bg-green-500",
        current: "bg-sky-200 border-2 border-sky-300",
        pending: "bg-yellow-200 border-2 border-yellow-300",
        none: "bg-gray-200 border-2 border-gray-300",
    };

    return (
        <>
            <div className="v-screen bg-white">
                {projectData.length === 0 ? (
                    <div className="mx-auto text-black text-center p-5 m-5">
                        <h1 className="text-3xl font-bold mb-6">There are no projects available.</h1>
                    </div>
                ) : (projectData.map((project) => (
                    <div className=" flex text-black border-b-4 border-gray-600 pt-5" key={project.id}>
                        <div className="basis-2/3 text-black text-start flex items-center px-5" key={project.id}>
                            <h1 className="text-3xl font-bold mb-3">{project.name}</h1>
                        </div>
                        <div className="flex basis-1/3 justify-end">
                            <ButtonAI />
                            <ButtonPlans />
                            <ButtonDelete />
                        </div>
                    </div>
                ))
                )}

                <div className="grid grid-cols-2 mx-auto pb-10">
                    <div className="col-span-1">
                        {/* Project Manager */}
                        <div className="text-black p-5">
                            <h2 className="text-3xl font-bold my-2">Project manager</h2>
                            <div
                                className="py-2 px-2 flex gap-4 items-center pt-10"
                            >
                                <p className="size-10 rounded-full border bg-orange-300 flex items-center justify-center"><UserIcon /></p>
                                <div className="flex flex-col pl-4" >
                                    <h3 className="font-bold text-2xl">{projectManagers[0]?.name}</h3>
                                    <p>{projectManagers[0]?.role}</p>
                                </div>
                            </div>
                        </div >

                        {/* <!-- equipo asignado --> */}
                        <div className="text-black p-5">
                            <h2 className="mt-4 text-3xl font-bold my-2">Assigned team</h2>
                            {workers.length === 0 ? (
                                <p>There is not workers assigned to this project.</p>
                            ) : (
                                workers.map((worker) => (
                                    <div className="" key={worker.id}>
                                        <div
                                            className="py-2 px-2 flex gap-4 items-center mb-3 pt-10">
                                            <p className="size-10 rounded-full border bg-orange-300 flex items-center justify-center"><UserIcon /></p>
                                            <div className="flex flex-col">
                                                <h3 className="font-bold text-2xl">{worker.name}</h3>
                                                <p>{worker.role}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>


                    <div className="col-span-1 p-2">
                        {/* <!-- phases of the project -->*/}
                        <div className="relative text-black p-5">
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
                            <div className="flex flex-wrap gap-3 text-black p-5">
                                <div className="w-full">
                                    <h2 className=" text-2xl font-semibold my-2">Trades</h2>
                                </div>
                                {trades.length === 0 ? (
                                    <p>There is not trades assigned to this project.</p>
                                ) : (
                                    trades.map((trade) => {
                                        const tradeInfo = icons_trade_types.find(
                                            (item) => item.trade_type === trade.name
                                        );

                                        return (
                                            <div
                                                key={trade.id}
                                                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-white font-medium shadow-md
                                            ${tradeInfo?.color_assigned || "bg-gray-400"}`}
                                            >
                                                {tradeInfo?.icon}
                                                <span>{trade.name}</span>
                                            </div>
                                        );
                                    })
                                )}

                            </div>
                        </div>
                    </div>
                </div>

                {/* <!-- Button approve progress  --> */}
                <div className="p-7">
                    <div className="p-2 my-3 text-center bg-blue-900 hover:bg-blue-600 hover:scale-95 transition-transform mt-4 rounded">
                        <button type="submit" id="approve_progress" className="text-white text-xl font-mono">Approve progress</button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ControlAvance;
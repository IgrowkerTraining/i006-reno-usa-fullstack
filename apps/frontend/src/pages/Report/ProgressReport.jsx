import { useState } from "react";
import { useParams } from "react-router-dom";

//hooks
import { useProject } from "@/src/hooks/useProject";

//utils
import icons_trades_types from "../../components/common/icons_trades_types";
import safetyStandards from "./security_standard";

//components
import { DonutChart } from "./DonutChart";

export const ProgressReport = () => {

    const { id } = useParams();
    const { project, loading, error, refetch } = useProject(id);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    const calculateProgress = (project) => {
        if (!project?.phases?.length) return 0;

        let totalTasks = 0;
        let completedTasks = 0;

        project.phases.forEach(phase => {
            phase.tasks?.forEach(task => {
                totalTasks += 1;
                if (task.completed) completedTasks += 1;
            });
        });

        if (totalTasks === 0) return 0;

        return Math.round((completedTasks / totalTasks) * 100);
    };

    const progress = calculateProgress(project);

    console.log(project?.trades);

    // const [projectDetails, setProjectDetails] = useState({});

    return (
        <div className="min-h-screen justify-center bg-blue-50 px-20">
            <div className="col-1 border-b-2 border-blue-900 pb-3 pt-6">
                <h1 className="text-blue-900 text-4xl font-bold">{project.name}</h1>
            </div>

            <div className="grid grid-cols-1 gap-4 justify-between py-6">
                <h2 className="text-blue-900 w-full text-2xl font-bold mb-5">Active Trades </h2>
                <div className="col-start-1 col-end-4 flex flex-wrap">
                    {project?.trades?.length ? (
                        icons_trades_types
                            .filter(trade =>
                                project?.trades?.includes(trade.trade_type)
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
                            There're no trades assigned to this project.
                        </p>
                    )}
                </div>
            </div>
            <div className="col-1 mt-6 border-b-2 border-blue-900">
                <h2 className="text-blue-900 w-full text-2xl font-bold mb-5">Progress Tracking</h2>
            </div>

            <div className="grid grid-cols-4 justify-between pt-6">
                <div className="col-start-1 col-end-3">
                    <div className="my-4">
                        <h3 className="my-4 text-blue-800 font-bold text-lg">Advance {progress}%</h3>
                        <DonutChart progress={progress} />
                    </div>
                </div>
                <div className="bg-blue-100 col-start-3 col-end-5 rounded-md">
                    <div className="justify-items-center mt-6 mt-2">
                        <h2 className="text-blue-900 text-xl font-bold">Security Standards</h2>
                        <h3 className="text-slate-500">(Check the completed tasks)</h3>
                    </div>
                    <div className="m-4">
                        {safetyStandards.map((standard) => (
                            <div key={standard.standard_name} className="text-slate-500">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={project?.security_standards?.[standard.standard_name] || false}
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

            <div className="my-10 bg-orange-100 p-6 rounded-md">
                <h2 className="text-blue-900 w-full text-2xl font-bold mb-5">Record History</h2>
                <ul className="space-y-0">
                    <li className="inline">
                        <div className="flex gap-3 items-center">
                            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M7.32129 1.46387C10.5561 1.46387 13.1786 4.08654 13.1787 7.32129C13.1787 10.5561 10.5561 13.1787 7.32129 13.1787C4.08654 13.1786 1.46387 10.5561 1.46387 7.32129C1.46394 4.08659 4.08659 1.46394 7.32129 1.46387Z" fill="white" stroke="#1890FF" strokeWidth="2.92857" />
                            </svg>

                            <span className="font-medium text-slate-500">01/02/26</span>
                            <span className="text-slate-700">Chequeo de cimientos</span>
                        </div>
                        <div className="text-zinc-300 text-xl text-start w-12 ms-0.5">|</div>
                    </li>

                    <li className="gap-3 items-center">

                        <div className="flex gap-3 items-center">
                            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M7.32129 1.46387C10.5561 1.46387 13.1786 4.08654 13.1787 7.32129C13.1787 10.5561 10.5561 13.1787 7.32129 13.1787C4.08654 13.1786 1.46387 10.5561 1.46387 7.32129C1.46394 4.08659 4.08659 1.46394 7.32129 1.46387Z" fill="white" stroke="#1890FF" strokeWidth="2.92857" />
                            </svg>

                            <span className="font-medium text-slate-500">05/02/26</span>
                            <span className="text-slate-700">Análisis de conexión eléctrica</span>
                        </div>
                        <div className="text-zinc-300 text-xl text-start w-12 ms-0.5">|</div>
                    </li>

                </ul>

            </div>

            <button type="submit"
                className="bg-blue-900 text-lg w-full text-white px-4 py-2 rounded-md hover:bg-blue-800">
                Update
            </button>

        </div>
    );
}
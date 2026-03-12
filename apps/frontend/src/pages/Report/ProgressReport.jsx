import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

//hooks
import { useProject } from "@/src/hooks/useProject";

//utils
import icons_trades_types from "../../components/common/icons_trades_types";

//components
import { DonutChart } from "../../components/common/DonutChart";
import { PhaseIcons } from "./phase_icons";
import { projectService } from "@/src/services/project.service";

export const ProgressReport = () => {

    const { id } = useParams();
    const { project, loading, error, refetch } = useProject(id);
    const [phases, setPhases] = useState([]);
    const [pendingTasks, setPendingTasks] = useState([]);
    const [metrics, setMetrics] = useState(null);
    const durationData = metrics?.duration;

    const [selectedTaskIds, setSelectedTaskIds] = useState([]);
    const [updatedHistory, setUpdatedHistory] = useState([]);
    const progress = metrics?.progress?.advancePercentage || 0;
    const duration = durationData?.totalDays ? Math.round((durationData.elapsedDays / durationData.totalDays) * 100) : 0;

    const normalizedTrades = project?.trades?.map(t => t.toLowerCase()) || [];

    const loadHistory = async () => {
        if (!project?.id) return;

        try {
            const history = await projectService.getHistory(project.id);
            setUpdatedHistory(history.data || []);
        } catch (err) {
            console.error("Error loading history:", err);
            setUpdatedHistory([]);
        }
    };

    const loadPhases = async () => {
        if (!project?.id) return;

        try {
            const response = await projectService.getPhases(project.id);
            setPhases(response.data || []);
        } catch (err) {
            console.error("Error loading phases:", err);
            setPhases([]);
        }
    };

    const getPendingTasks = (phases) => {
        if (!phases?.length) return [];

        const currentPhase = phases.find(phase => phase.status !== "completed");
        return currentPhase?.tasks || [];
    };

    // const getPendingTasks = async () => {
    //     if (!project?.id) return;

    //     try {
    //         const response = await projectService.getMyPendingTasks(project.id);
    //         setPendingTasks(response.data || response || []);
    //     } catch (err) {
    //         console.error("Error loading pending tasks:", err);
    //         setPendingTasks([]);
    //     }
    // };

    const loadMetrics = async () => {
        if (!project?.id) return;

        try {
            const response = await projectService.getMetrics(project.id);
            setMetrics(response.data || response);
        } catch (err) {
            console.error("Error loading metrics:", err);
            setMetrics(null);
        }
    };

    // const tasks = project?.phases?.flatMap(phase => phase.tasks) || [];
    // const testTasks = getPendingTasks(phases);

    const formatDate = (isoString) => {
        if (!isoString) return "";
        const date = new Date(isoString);

        return date.toLocaleString("en-GB", {
            day: "2-digit",
            month: "numeric",
            year: "numeric"
        });
    };

    const handleCheckboxChange = (taskId) => {
        setSelectedTaskIds(prev =>
            prev.includes(taskId)
                ? prev.filter(id => id !== taskId)
                : [...prev, taskId]
        );
    };

    const handleUpdate = async () => {
        try {
            if (!selectedTaskIds.length) {
                console.log("No tasks to update");
                return;
            }

            await projectService.updateTaskStatus({
                taskIds: selectedTaskIds
            });

            setSelectedTaskIds([]);

            await refetch();
            await loadPhases();
            await loadHistory();
            await loadMetrics();

        } catch (err) {
            console.error(err);
            alert(err.message || "Error updating tasks");
        }
    };

    useEffect(() => {
        if (project?.id) {
            loadMetrics();
            loadPhases();
            loadHistory();
        }
    }, [project?.id]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="justify-center bg-[#F8FAFC] px-20">
            <div className="col-1 border-b-2 border-[#0C277B] pb-3 pt-6">
                <h1 className="text-[#0C277B] text-4xl font-bold">{project.name}</h1>
            </div>

            <div className="grid grid-cols-1 gap-4 justify-between py-6">
                <h2 className="text-[#0C277B] w-full text-2xl font-bold mb-5">Active Trades </h2>
                <div className="col-start-1 col-end-4 flex flex-wrap">
                    {project?.trades?.length ? (
                        icons_trades_types
                            .filter(trade =>
                                normalizedTrades.includes(trade.trade_type.toLowerCase())
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
                        <p className="text-slate-500 font-bold">
                            There're no trades assigned to this project.
                        </p>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-2 justify-between pt-2 items-start">
                <div className="col-span-1 col-span-2 mt-6 border-b-2 border-[#0C277B]">
                    <h2 className="text-[#0C277B] w-full text-2xl font-bold mb-5">Progress Tracking</h2>
                </div>
                <div className="my-8">
                    <h3 className="mb-4 text-[#3B64CE] font-bold text-lg flex items-center">Advance {progress}%</h3>
                    <div className="ps-16">
                        <DonutChart
                            progress={progress}
                            radiusChart={175}
                            strokeChart={75} />
                    </div>
                </div>
                <div className="my-10 bg-blue-100 rounded-md">
                    <div className="justify-items-center mt-6 mt-2 pt-3">
                        <h2 className="text-[#0C277B] text-xl font-bold">Security Standards</h2>
                        <h3 className="text-slate-500">(Check the completed tasks)</h3>
                    </div>
                    <div className="mx-4 p-8">
                        {getPendingTasks(project?.phases).map((task) => (
                            <div key={task.id} className="text-slate-500">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={
                                            task.status === "completed" || selectedTaskIds.includes(task.id)
                                        }
                                        onChange={() => handleCheckboxChange(task.id)}
                                        className="w-4 h-4 rounded border-slate-700 accent-blue-800 focus:ring-blue-700 focus:ring-offset-slate-900"
                                    />
                                    <span className="text-sm text-slate-500 py-2">
                                        {task.name}
                                    </span>
                                </label>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="p-2">
                <h2 className="text-[#0C277B] w-full text-2xl font-bold mb-8">
                    Project Duration - {metrics?.duration?.totalDays || 0} days
                </h2>
                <div className="mb-10 w-full h-8 bg-blue-200 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-gradient-to-r from-blue-500 to-sky-500 rounded-full"
                        style={{ width: `${duration}%` }}
                    />
                </div>
            </div>

            <div className="grid grid-cols-4 gap-3 mb-16">
                <div className="col-span-1 col-span-5 mt-6">
                    <h2 className="text-[#0C277B] w-full text-2xl font-bold mb-5">Project Stages</h2>
                </div>
                {phases.map((phase, index) => (
                    <div key={phase.id} className="p-2">
                        <div className="flex align-items-center w-64">
                            <PhaseIcons status={phase.status} number={index + 1} />
                            <h2 className="ps-3 pt-3 text-slate-800 w-40 font-normal">{phase.name}</h2>
                        </div>
                        <p className="ms-16 text-slate-500 capitalize">{phase.status}</p>
                    </div>
                ))}
            </div>

            <div className="mt-6 mb-20 bg-[#FFF2EE] p-6 rounded-md max-h-72 overflow-y-auto">
                <h2 className="text-[#0C277B] w-full text-2xl font-bold mb-5">Record History</h2>
                <ul className="space-y-0">
                    {updatedHistory.length > 0 ? updatedHistory.map((task) => (
                        <li key={task.id} className="inline">
                            <div className="flex gap-3 items-center">
                                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M7.32129 1.46387C10.5561 1.46387 13.1786 4.08654 13.1787 7.32129C13.1787 10.5561 10.5561 13.1787 7.32129 13.1787C4.08654 13.1786 1.46387 10.5561 1.46387 7.32129C1.46394 4.08659 4.08659 1.46394 7.32129 1.46387Z" fill="white" stroke="#1890FF" strokeWidth="2.92857" />
                                </svg>

                                <span className="font-medium text-slate-500">{formatDate(task.completedAt)}</span>
                                <span className="text-slate-700">{task.name}</span>
                            </div>
                            <div className="text-zinc-300 text-xl text-start w-12 ms-0.5">|</div>
                        </li>
                    )) :
                        <p className="text-slate-500">No records yet.</p>}

                </ul>

            </div>

            <button
                type="submit"
                onClick={handleUpdate}
                className="bg-[#0C277B] text-lg w-full text-white px-4 py-2 mb-10 rounded-md hover:bg-[#1a2f71]">
                Update
            </button>

        </div>
    );
}
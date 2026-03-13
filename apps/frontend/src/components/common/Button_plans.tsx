import { useNavigate, useParams } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import { useProjects } from "@/src/context/ProjectsContext";
import { storage } from "../../utils/storage";
import { projectService } from "../../services/project.service";

interface ButtonPlansProps {
    name: string;
    projectId?: string;
    planUrl?: string;
    projectManagerId?: string;
    onPlanUpdate?: (newUrl: string) => void;
}

export const ButtonPlans: React.FC<ButtonPlansProps> = ({ name, projectId, planUrl: initialPlanUrl, projectManagerId, onPlanUpdate }) => {
    
    const currentUser = storage.getUser();
    const isProfessional = currentUser?.role === 'professional' || currentUser?.id === projectManagerId;
    const [currentPlanUrl, setCurrentPlanUrl] = useState(initialPlanUrl || '');
    const [newPlanUrl, setNewPlanUrl] = useState('');

    useEffect(() => {
        setCurrentPlanUrl(initialPlanUrl || '');
    }, [initialPlanUrl]);

    const handleAddUrl = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && newPlanUrl.trim() && isProfessional) {
            e.preventDefault();
            try {
                if (projectId && projectId !== 'temp') {
                    await projectService.update(projectId, { project_plan_photo: newPlanUrl.trim() });
                }
                setCurrentPlanUrl(newPlanUrl.trim());
                if (onPlanUpdate) onPlanUpdate(newPlanUrl.trim());
                setNewPlanUrl('');
            } catch (error) {
                console.error("Error updating plan URL:", error);
            }
        }
    };

    const handleRemoveUrl = async () => {
        if (isProfessional) {
            try {
                if (projectId && projectId !== 'temp') {
                    await projectService.update(projectId, { project_plan_photo: '' });
                }
                setCurrentPlanUrl('');
                if (onPlanUpdate) onPlanUpdate('');
            } catch (error) {
                console.error("Error removing plan URL:", error);
            }
        }
    };

    const PaperclipIcon = () => (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-2 stroke-[#0A1F61]" viewBox="0 0 24 24" fill="none" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" /></svg>
    );

    return (
        <div className="flex justify-end items-center px-3 py-4 hover:scale-95 transition-transform duration-300">
            <button type="button" command="show-modal" commandfor="Plans" className="bg-blue-900 text-white hover:bg-blue-600 py-2 px-4 rounded w-40 h-10 flex items-center justify-center">Plans</button>
            <el-dialog>
                <dialog
                    id="Plans"
                    aria-labelledby="dialog-title"
                    className="fixed inset-0 size-auto max-h-none max-w-none overflow-y-auto bg-transparent backdrop:bg-transparent"
                >
                    <el-dialog-backdrop className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in" />

                    <div
                        tabIndex="0"
                        className="bg-blue-50 flex min-h-full items-end justify-center p-4 text-center focus:outline-none sm:items-center sm:p-0"
                    >
                        <el-dialog-panel className="relative transform overflow-hidden rounded-lg bg-blue-50 text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in w-full m-10 data-closed:sm:translate-y-0 data-closed:sm:scale-95">

                            <div className="px-4 pt-5 pb-4">
                                <div className="flex border-blue-900 border-b-2 items-center justify-between">
                                    <div className="flex items-center">
                                        <button
                                            type="button"
                                            command="close"
                                            commandfor="Plans"
                                            className="mt-3 inline-flex justify-start rounded-md px-3 py-3 text-sm font-semibold text-slate-500 shadow-xs inset-ring inset-ring-gray-300 hover:text-slate-600 sm:mt-0 sm:w-auto"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                            </svg>
                                        </button>
                                        <h1 id="dialog-title" className="text-4xl text-blue-900 pb-2 p-5 font-semibold">
                                            Plane ({name})
                                        </h1>
                                    </div>
                                    
                                    {currentPlanUrl && (
                                        <a 
                                            href={currentPlanUrl} 
                                            target="_blank" 
                                            rel="noopener noreferrer" 
                                            className="text-blue-600 hover:text-blue-800 underline mr-4 font-medium"
                                        >
                                            Open External Link
                                        </a>
                                    )}
                                </div>
                                
                                <div className="mt-4 flex justify-center items-center min-h-[400px]">
                                    {currentPlanUrl ? (
                                        <iframe 
                                            src={currentPlanUrl} 
                                            title="Project Plan" 
                                            className="w-full h-[600px] border-none rounded-md bg-white"
                                        />
                                    ) : (
                                        isProfessional ? (
                                            <div className="w-full max-w-md mx-auto relative mt-4">
                                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                    <PaperclipIcon />
                                                </div>
                                                <input
                                                    type="url"
                                                    value={newPlanUrl}
                                                    onChange={(e) => setNewPlanUrl(e.target.value)}
                                                    onKeyDown={handleAddUrl}
                                                    placeholder="Paste image URL and press Enter"
                                                    className="w-full pl-10 pr-4 py-3 rounded-md border border-gray-300 text-sm focus:ring-2 focus:ring-[#0A1F61] focus:border-[#0A1F61] transition outline-none shadow-sm"
                                                    autoFocus
                                                />
                                            </div>
                                        ) : (
                                            <p className="text-gray-500 italic text-lg mt-4">No project plan available yet.</p>
                                        )
                                    )}
                                </div>
                            </div>

                            {isProfessional && currentPlanUrl && (
                                <div className="p-5 flex justify-end">
                                    <button
                                        type="button"
                                        onClick={handleRemoveUrl}
                                        className="hover:scale-110 transition-transform hover:bg-red-700 rounded-full"
                                    >
                                        <svg width="50" height="50" viewBox="0 0 64 64">
                                            <circle cx="32" cy="32" r="30" fill="#ff0000" />
                                            <g fill="#ffffff">
                                                <rect x="22" y="18" width="20" height="4" rx="1" />
                                                <rect x="24" y="22" width="16" height="22" rx="2" />
                                                <rect x="26" y="16" width="12" height="3" rx="1" />
                                                <circle cx="32" cy="34" r="4" fill="#ff0000" />
                                            </g>
                                        </svg>
                                    </button>
                                </div>
                            )}

                        </el-dialog-panel>
                    </div>
                </dialog>
            </el-dialog>
        </div>
    );
}
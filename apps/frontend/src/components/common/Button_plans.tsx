import { useNavigate, useParams } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import { projectService } from "@/src/services/project.service";
import UploadPlan from "./Upload";


export const ButtonPlans: React.FC = ({ name }) => {
    const { id } = useParams();

    return (
        <div className="flex justify-end items-center px-3 py-4 hover:scale-95 transition-transform duration-300">
            <button command="show-modal" commandfor="Plans" className="bg-blue-900 text-white hover:bg-blue-600 py-2 px-4 rounded w-40 h-10 flex items-center justify-center">Plans</button>
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
                                <div className="flex border-blue-900 border-b-2 items-center">
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
                                <UploadPlan />
                            </div>

                            <div className="p-5 flex justify-end">
                                <button
                                    type="button"
                                    command="submit"
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

                        </el-dialog-panel>
                    </div>
                </dialog>
            </el-dialog>
        </div>
    );
}
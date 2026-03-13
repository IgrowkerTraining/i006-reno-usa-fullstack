import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { projectService } from '../services/project.service';

//icons
import icons_trade_types from "../components/common/icons_trades_types";

//components
import { ButtonPlans } from '../components/common/Button_plans';
import { ButtonDelete } from '../components/common/Button_delete';
import { AiViewModal } from '../components/AiViewModal';

const ControlAvance: React.FC = () => {

    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const [data, setData] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [projectPhases, setProjectPhases] = useState<any[]>([]);

    const CheckIconBlue = () => (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 stroke-current" viewBox="0 0 24 24" fill="none" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
    );

    type TimelineState = 'completed' | 'current' | 'pending' | 'none';

    useEffect(() => {
        const fetchProject = async () => {
          try {
            setIsLoading(true);
            const projectData: any = await projectService.getById(id as string);
            setData(projectData);
    
            if (projectData.phases?.length) {
              const mappedPhases = projectData.phases.map((phase: any) => {
                let state: TimelineState = 'pending';
    
                if (phase.status === 'completed') state = 'completed';
                else if (phase.status === 'in_progress') state = 'current';
    
                return {
                  id: phase.id,
                  title: phase.name,
                  status: phase.status,
                  state,
                };
              });
    
              setProjectPhases(mappedPhases);
            }
    
          } catch (error) {
            console.error("Error fetching project data:", error);
          } finally {
            setIsLoading(false);
          }
        };
    
        if (id) fetchProject();
    }, [id]);

    const handlePlanUpdate = (newUrl: string) => {
        setData((prev: any) => ({ ...prev, project_plan_photo: newUrl }));
    };

    if (isLoading) {
        return (
          <div className="min-h-[calc(100vh-64px)] bg-[#F8FAFC] p-8 md:p-12 font-sans">
            <div className="max-w-[1400px] mx-auto w-full">
                <div className="mb-8 border-b-2 border-gray-200 pb-4 flex justify-between">
                <div className="h-9 bg-gray-300 rounded w-64 animate-pulse"></div>
                <div className="h-9 bg-gray-300 rounded w-24 animate-pulse"></div>
                </div>
                <div className="flex flex-col lg:flex-row justify-between gap-12 lg:gap-20 relative">
                <div className="flex flex-col gap-6 w-full lg:w-[450px]">
                    <div className="h-40 bg-gray-200 rounded-xl animate-pulse"></div>
                    <div className="h-40 bg-gray-200 rounded-xl animate-pulse"></div>
                    <div className="h-60 bg-gray-200 rounded-xl animate-pulse"></div>
                </div>
                <div className="relative pt-2 w-full lg:w-[500px]">
                    <div className="h-80 bg-gray-200 rounded-xl animate-pulse"></div>
                </div>
                </div>
            </div>
          </div>
        );
    }

    if (!data) {
        return <div className="min-h-[calc(100vh-64px)] bg-[#F8FAFC] p-12 text-center text-red-500 font-medium">Project not found</div>;
    }

    const projectManager = data.assigned_professional;
    const teamMembers = data.project_team || [];
    const trades = data.trades || [];

    return (
        <div className="min-h-[calc(100vh-64px)] bg-[#F8FAFC] p-8 md:p-12 font-sans text-slate-800">
            <div className="max-w-[1400px] mx-auto w-full">
                
                {/* HEADER */}
                <div className="mb-10 border-b-[2px] border-[#0A1F61] pb-3 flex justify-between items-end">
                    <h1 className="text-3xl font-bold text-[#0A1F61] capitalize">{data.name}</h1>
                    <div className="flex items-center gap-4 relative">
                        <AiViewModal />
                        <ButtonPlans name={data.name} projectId={data.id} planUrl={data.project_plan_photo} onPlanUpdate={handlePlanUpdate} />
                        <ButtonDelete id={data.id} />
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row justify-between gap-12 lg:gap-20 relative">
                    
                    {/* LEFT COLUMN */}
                    <div className="flex flex-col w-full lg:w-[450px]">
                        
                        {/* Assigned Professional */}
                        <h2 className="text-xl font-bold text-[#0A1F61] mb-4">Project manager</h2>
                        <div className="flex items-center bg-white rounded-xl p-5 shadow-sm mb-8 border border-gray-100 capitalize">
                            <div className="w-10 h-10 rounded-full bg-[#FFE4E6] text-[#E11D48] flex items-center justify-center font-bold mr-4 overflow-hidden">
                                {projectManager?.avatar ? (
                                    <img src={projectManager.avatar} alt={projectManager.name} className="w-full h-full object-cover" />
                                ) : (
                                    projectManager?.name?.charAt(0).toUpperCase() || 'U'
                                )}
                            </div>
                            <div>
                                <h3 className="text-[15px] font-bold text-[#0A1F61] leading-tight mb-0.5">
                                    {projectManager?.name || 'No assigned'}
                                </h3>
                                <p className="text-[13px] text-gray-400 m-0 capitalize">
                                    {projectManager?.trade || projectManager?.role || 'Professional'}
                                </p>
                            </div>
                        </div>

                        {/* Trades section */}
                        <h2 className="text-xl font-bold text-[#0A1F61] mb-4">Trades</h2>
                        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 mb-8 flex flex-wrap gap-3">
                            {trades.length === 0 ? (
                                <p className="text-gray-500 italic text-sm">There is not trades assigned to this project.</p>
                            ) : (
                                trades.map((trade: string, idx: number) => {
                                    const tradeInfo = icons_trade_types.find(
                                        (item) => item.trade_type.toLowerCase() === trade.toLowerCase()
                                    );

                                    return (
                                        <div
                                            key={idx}
                                            className={`flex items-center gap-2 px-4 py-1.5 rounded-md text-sm font-medium shadow-sm capitalize
                                        ${tradeInfo?.color_assigned ? `${tradeInfo.color_assigned} text-white` : "bg-gray-500 text-white"}`}
                                        >
                                            {tradeInfo?.icon}
                                            {trade}
                                        </div>
                                    );
                                })
                            )}
                        </div>

                        {/* Assigned team */}
                        <h2 className="text-xl font-bold text-[#0A1F61] mb-4">Assigned team</h2>
                        <div className="bg-white rounded-xl p-2 shadow-sm border border-gray-100">
                            {teamMembers.length === 0 ? (
                                <p className="text-gray-500 italic p-3 text-sm">There is not workers assigned to this project.</p>
                            ) : (
                                teamMembers.map((worker: any) => (
                                    <div className="flex items-center p-3" key={worker.id}>
                                        <div className="w-10 h-10 rounded-full bg-[#F3F4F6] text-[#475569] flex items-center justify-center font-bold mr-4 overflow-hidden">
                                            {worker.avatar ? (
                                                <img src={worker.avatar} alt={worker.name} className="w-full h-full object-cover" />
                                            ) : (
                                                worker.name?.charAt(0).toUpperCase() || 'U'
                                            )}
                                        </div>
                                        <div>
                                            <h3 className="text-[15px] font-bold text-[#0A1F61] leading-tight mb-0.5 capitalize">
                                                {worker.name}
                                            </h3>
                                            <p className="text-[13px] text-gray-400 m-0 capitalize">
                                                {worker.role === 'user' ? `user - ${worker.trade}` : worker.role}
                                            </p>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>

                    {/* RIGHT COLUMN */}
                    <div className="relative pt-1 flex flex-col h-full w-full lg:w-[500px]">
                        
                        {/* Project Stages */}
                        <h2 className="text-xl font-bold text-[#0A1F61] mb-8">Project Stages</h2>

                        <div className="mb-10 flex-1">
                            {projectPhases.length === 0 ? (
                                <p className="text-gray-500 italic">No phases registered for this project.</p>
                            ) : (
                                projectPhases.map((phase, index) => (
                                  <div key={phase.id} className="flex relative pb-8">
                    
                                    {/* Timeline Line & Circle */}
                                    <div className="flex flex-col items-center mr-6 relative">
                                      <div className={`w-8 h-8 rounded-full z-10 flex items-center justify-center text-sm font-bold ${phase.state === 'completed' ? 'border-[2px] border-[#2563EB] bg-white text-[#2563EB]' :
                                        phase.state === 'current' ? 'bg-[#2563EB] text-white' :
                                          'border-[2px] border-gray-300 bg-white text-gray-400'
                                        }`}>
                                        {phase.state === 'completed' ? <CheckIconBlue /> : index + 1}
                                      </div>
                    
                                      {index < projectPhases.length - 1 && (
                                        <div className={`absolute top-8 bottom-[-8px] w-[2px] ${phase.state === 'completed' ? 'bg-[#2563EB]' : 'bg-gray-200'
                                          }`}></div>
                                      )}
                                    </div>
                    
                                    {/* Timeline Content */}
                                    <div className="flex-1 pt-1 capitalize">
                                      <h3 className={`text-xl font-medium m-0 mb-1 ${phase.state === 'pending' ? 'text-gray-800' : 'text-gray-900'
                                        }`}>
                                        {phase.title}
                                      </h3>
                                      <p className="text-md text-gray-400 m-0">{phase.status}</p>
                                    </div>
                                  </div>
                                ))
                            )}
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default ControlAvance;
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { API_ENDPOINTS } from '../constants/routes'; // Asegúrate de que esta ruta sea correcta
import { projectService } from '../services/project.service';

// --- TYPES ---
type TimelineState = 'completed' | 'current' | 'pending';

interface ProjectPhase {
  id: number | string;
  title: string;
  status: string;
  state: TimelineState;
}

interface TeamMember {
  id: number | string;
  name: string;
  role: string;
  initial: string;
  bgColor: string;
}

// Interfaz adaptada a lo que devuelve el backend real
interface ProjectData {
  id: string;
  name: string;
  location: string;
  intervention_type: string;
  assigned_professional: any;
  project_plan_photo?: string;
  project_team: any[];
}

// --- MOCK DATA PARA LO QUE EL BACKEND AÚN NO DEVUELVE ---
const MOCK_PROFESSIONAL = {
  name: 'Full name',
  role: 'Rol/Profession',
  initial: 'U',
  bgColor: 'bg-orange-100 text-orange-500'
};

const MOCK_TEAM: TeamMember[] = [
  { id: 1, name: 'Aurelio Robles', role: 'Master Builder', initial: 'A', bgColor: 'bg-pink-100 text-pink-500' },
  { id: 2, name: 'German Perruelo', role: 'Electrician', initial: 'G', bgColor: 'bg-orange-100 text-orange-500' },
  { id: 3, name: 'Kevin Campos', role: 'Builder', initial: 'U', bgColor: 'bg-green-100 text-green-500' },
];

const MOCK_STAGES: ProjectPhase[] = [
  { id: 1, title: 'Commencement', status: 'Started', state: 'completed' },
  { id: 2, title: 'Project Planning', status: 'In Progress', state: 'current' },
  { id: 3, title: 'Project Execution', status: 'Pending Approval', state: 'pending' },
  { id: 4, title: 'Project Closure', status: 'To Do', state: 'pending' },
];

// --- ICONS ---
const MapPinIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 stroke-[#0A1F61]" viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
);
const ToolIcon = () => (
   <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 stroke-[#0A1F61]" viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.7-3.7a1 1 0 0 0 0-1.4l-1.6-1.6a1 1 0 0 0-1.4 0l-3.7 3.7z"/><path d="M11 7L2 16l3 3 9-9"/></svg>
);
const CheckIconBlue = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 stroke-current" viewBox="0 0 24 24" fill="none" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
);
const PaperclipIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-2 stroke-[#0A1F61]" viewBox="0 0 24 24" fill="none" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"/></svg>
);
const XIconWhite = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
);

// --- MAIN COMPONENT ---
const ProjectGeneralView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [data, setData] = useState<ProjectData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [projectPhases, setProjectPhases] = useState<ProjectPhase[]>(MOCK_STAGES);
  const [showPlansList, setShowPlansList] = useState(false);
  const [planUrl, setPlanUrl] = useState<string>('');
  const [newPlanUrl, setNewPlanUrl] = useState('');

  // --- PETICIÓN AL BACKEND ---
  useEffect(() => {
    const fetchProject = async () => {
      try {
        setIsLoading(true);
        const projectData: any = await projectService.getById(id as string);
        setData(projectData);
        
        if (projectData.project_plan_photo) {
          setPlanUrl(projectData.project_plan_photo);
        }

        try {
          const phasesData = await projectService.getPhases(id as string);
          if (phasesData && phasesData.length > 0) {
            const sortedPhases = phasesData.sort((a: any, b: any) => a.order - b.order);
            const mappedPhases = sortedPhases.map((phase: any) => {
              let state: TimelineState = 'pending';
              if (phase.status === 'completed') state = 'completed';
              else if (phase.status === 'in_progress') state = 'current';
              
              return {
                id: phase.id,
                title: phase.name,
                status: phase.status,
                state: state
              };
            });
            setProjectPhases(mappedPhases);
          } else {
            setProjectPhases([
              { id: 'mock1', title: 'Site Preparation', status: 'completed', state: 'completed' },
              { id: 'mock2', title: 'Foundation', status: 'in_progress', state: 'current' },
              { id: 'mock3', title: 'Structure', status: 'pending', state: 'pending' },
              { id: 'mock4', title: 'Finishes', status: 'pending', state: 'pending' },
            ]);
          }
        } catch (e) {
            setProjectPhases([
              { id: 'mock1', title: 'Site Preparation', status: 'completed', state: 'completed' },
              { id: 'mock2', title: 'Foundation', status: 'in_progress', state: 'current' },
              { id: 'mock3', title: 'Structure', status: 'pending', state: 'pending' },
              { id: 'mock4', title: 'Finishes', status: 'pending', state: 'pending' },
            ]);
        }
      } catch (error) {
        console.error("Error fetching project data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchProject();
    }
  }, [id]);

  const handleAddUrl = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && newPlanUrl.trim()) {
      e.preventDefault();
      try {
        await projectService.update(id as string, { project_plan_photo: newPlanUrl.trim() });
        setPlanUrl(newPlanUrl.trim());
        setNewPlanUrl('');
      } catch (error) {
        console.error("Error updating plan URL:", error);
      }
    }
  };

  const handleRemoveUrl = async () => {
    try {
      await projectService.update(id as string, { project_plan_photo: '' });
      setPlanUrl('');
    } catch (error) {
      console.error("Error removing plan URL:", error);
    }
  };

  const getProfessionalName = (prof: any): string => {
    if (!prof) return MOCK_PROFESSIONAL.name;
    if (typeof prof === 'string') return prof;
    if (typeof prof === 'object' && prof.name) return prof.name;
    return MOCK_PROFESSIONAL.name;
  };

  const getProfessionalInitial = (prof: any): string => {
    const name = getProfessionalName(prof);
    return name && name !== MOCK_PROFESSIONAL.name ? name.charAt(0).toUpperCase() : MOCK_PROFESSIONAL.initial;
  };

  // --- SKELETON STATE ---
  if (isLoading) {
    return (
      <div className="min-h-[calc(100vh-64px)] bg-[#F8FAFC] p-8 md:p-12 font-sans">
        <div className="mb-8 border-b-2 border-gray-200 pb-4 flex justify-between">
          <div className="h-9 bg-gray-300 rounded w-64 animate-pulse"></div>
          <div className="h-9 bg-gray-300 rounded w-24 animate-pulse"></div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-[350px_1fr] gap-12 lg:gap-20 relative">
          <div className="flex flex-col gap-6">
            <div className="h-40 bg-gray-200 rounded-xl animate-pulse"></div>
            <div className="h-40 bg-gray-200 rounded-xl animate-pulse"></div>
            <div className="h-60 bg-gray-200 rounded-xl animate-pulse"></div>
          </div>
          <div className="relative pt-2">
             <div className="h-80 bg-gray-200 rounded-xl animate-pulse"></div>
          </div>
        </div>
      </div>
    );
  }

  // --- MAIN VIEW ---
  if (!data) return <div className="p-12 text-center text-gray-500 font-medium">Project not found</div>;

  return (
    <div className="min-h-[calc(100vh-64px)] bg-[#F8FAFC] p-8 md:p-12 font-sans text-slate-800">
      
      {/* HEADER */}
      <div className="mb-10 border-b-[2px] border-[#0A1F61] pb-3 flex justify-between items-end">
        <h1 className="text-3xl font-bold text-[#0A1F61]">{data.name}</h1>
        <div className="flex flex-col items-end gap-2 relative">
          <button 
            type="button"
            onClick={() => setShowPlansList(!showPlansList)}
            className="bg-[#0A1F61] hover:bg-[#1a2f71] text-white px-8 py-2 rounded-md font-medium transition-colors shadow-sm z-10"
          >
            Plans
          </button>
          {showPlansList && (
            <div className="absolute top-full right-0 mt-2 w-72 bg-white border border-gray-100 rounded-lg shadow-xl z-20 p-4">
              {!planUrl ? (
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <PaperclipIcon />
                  </div>
                  <input 
                    type="url"
                    value={newPlanUrl}
                    onChange={(e) => setNewPlanUrl(e.target.value)}
                    onKeyDown={handleAddUrl}
                    placeholder="Paste URL and press Enter"
                    className="w-full pl-10 pr-4 py-2 rounded-md border border-gray-200 text-sm focus:ring-1 focus:ring-[#0A1F61] focus:border-[#0A1F61] transition outline-none"
                    autoFocus
                  />
                </div>
              ) : (
                <div className="flex items-center justify-between bg-gray-50 p-2 rounded border border-gray-100">
                  <a href={planUrl} target="_blank" rel="noreferrer" className="text-xs text-blue-600 truncate hover:underline flex-1 pr-2">
                    {planUrl}
                  </a>
                  <button type="button" onClick={handleRemoveUrl} className="text-gray-400 hover:text-red-500 transition">
                    <XIconWhite />
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[350px_1fr] gap-12 lg:gap-20 relative">
        
        {/* LEFT COLUMN */}
        <div className="flex flex-col">
          
          {/* Assigned Professional */}
          <h2 className="text-xl font-bold text-[#0A1F61] mb-4">Assigned Professional</h2>
          <div className="flex items-center bg-white rounded-xl p-5 shadow-sm mb-8 border border-gray-100">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold mr-4 ${MOCK_PROFESSIONAL.bgColor}`}>
              {getProfessionalInitial(data.assigned_professional)}
            </div>
            <div>
              <h3 className="text-[15px] font-bold text-[#0A1F61] leading-tight mb-0.5">{getProfessionalName(data.assigned_professional)}</h3>
              <p className="text-[13px] text-gray-400 m-0">{MOCK_PROFESSIONAL.role}</p>
            </div>
          </div>

          {/* Data (Real from Backend) */}
          <h2 className="text-xl font-bold text-[#0A1F61] mb-4">Data</h2>
          
          <div className="flex items-center bg-white rounded-xl p-5 shadow-sm mb-4 border border-gray-100">
            <div className="mr-5">
               <MapPinIcon />
            </div>
            <div>
              <h3 className="text-[15px] font-bold text-[#0A1F61] leading-tight mb-0.5">Location</h3>
              <p className="text-[13px] text-gray-400 m-0">{data.location}</p>
            </div>
          </div>

           <div className="flex items-center bg-white rounded-xl p-5 shadow-sm mb-8 border border-gray-100">
            <div className="mr-5">
               <ToolIcon />
            </div>
            <div>
              <h3 className="text-[15px] font-bold text-[#0A1F61] leading-tight mb-0.5">Type of Intervention</h3>
              <p className="text-[13px] text-gray-400 m-0">{data.intervention_type}</p>
            </div>
          </div>

          {/* Project Team */}
          <h2 className="text-xl font-bold text-[#0A1F61] mb-4">Project Team</h2>
          <div className="bg-white rounded-xl p-2 shadow-sm border border-gray-100">
            {MOCK_TEAM.map((member) => (
              <div key={member.id} className="flex items-center p-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold mr-4 ${member.bgColor}`}>
                  {member.initial}
                </div>
                <div>
                  <h3 className="text-[15px] font-bold text-[#0A1F61] leading-tight mb-0.5">{member.name}</h3>
                  <p className="text-[13px] text-gray-400 m-0">{member.role}</p>
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* RIGHT COLUMN */}
        <div className="relative pt-1 flex flex-col h-full">
          <h2 className="text-xl font-bold text-[#0A1F61] mb-8">Project Stages</h2>

          <div className="mb-10 flex-1">
            {projectPhases.map((phase, index) => (
              <div key={phase.id} className="flex relative pb-8">
                
                {/* Timeline Line & Circle */}
                <div className="flex flex-col items-center mr-6 relative">
                  <div className={`w-8 h-8 rounded-full z-10 flex items-center justify-center text-sm font-bold ${
                    phase.state === 'completed' ? 'border-[2px] border-[#2563EB] bg-white text-[#2563EB]' : 
                    phase.state === 'current' ? 'bg-[#2563EB] text-white' : 
                    'border-[2px] border-gray-300 bg-white text-gray-400'
                  }`}>
                    {phase.state === 'completed' ? <CheckIconBlue /> : index + 1}
                  </div>
                  
                  {index < projectPhases.length - 1 && (
                    <div className={`absolute top-8 bottom-[-8px] w-[2px] ${
                      phase.state === 'completed' ? 'bg-[#2563EB]' : 'bg-gray-200'
                    }`}></div>
                  )}
                </div>

                {/* Timeline Content */}
                <div className="flex-1 pt-1">
                  <h3 className={`text-[15px] font-medium m-0 mb-1 ${
                    phase.state === 'pending' ? 'text-gray-800' : 'text-gray-900'
                  }`}>
                    {phase.title}
                  </h3>
                  <p className="text-[13px] text-gray-400 m-0">{phase.status}</p>
                </div>
              </div>
            ))}
          </div>
            
          {/* Log Progress Button */}
          <div className="mt-auto pb-4">
            <button 
              onClick={() => navigate(`/proyecto/${id}/report`)} 
              className="w-full py-4 bg-[#0A1F61] hover:bg-[#1a2f71] text-white rounded-md text-[17px] font-medium transition-colors shadow-md"
            >
              Log Progress
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProjectGeneralView;
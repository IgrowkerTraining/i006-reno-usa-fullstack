import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

// --- TYPES ---
type TimelineState = 'completed' | 'current' | 'pending';

interface ProjectPhase {
  id: number;
  title: string;
  status: string;
  state: TimelineState;
}

interface ProjectData {
  id: string;
  name: string;
  professional: {
    name: string;
    specialty: string;
  };
  basicData: {
    location: string;
    details: string;
    interventionType: string;
  };
  phases: ProjectPhase[];
}

// --- MOCK DATA ---
const MOCK_PROJECT_DATA: ProjectData = {
  id: 'gamma-123',
  name: 'Proyecto Gamma',
  professional: {
    name: 'Nombre y apellido',
    specialty: 'Carrera/Especialidad',
  },
  basicData: {
    location: 'Ubicación',
    details: 'Ciudad, duración',
    interventionType: 'Tipo de intervención',
  },
  phases: [
    { id: 1, title: 'Inicio del proyecto', status: 'Iniciado', state: 'completed' },
    { id: 2, title: 'Planificación del proyecto', status: 'En progreso', state: 'current' },
    { id: 3, title: 'Ejecución del proyecto', status: 'Pendiente de aprobación', state: 'pending' },
    { id: 4, title: 'Cierre del proyecto', status: 'Pendiente', state: 'pending' },
  ],
};

// --- ICONS ---
const UserIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 stroke-current" viewBox="0 0 24 24" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
);
const MapPinIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 stroke-current" viewBox="0 0 24 24" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
);
const ToolIcon = () => (
   <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 stroke-current" viewBox="0 0 24 24" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.7-3.7a1 1 0 0 0 0-1.4l-1.6-1.6a1 1 0 0 0-1.4 0l-3.7 3.7z"/><path d="M11 7L2 16l3 3 9-9"/></svg>
);
const CheckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 stroke-white" viewBox="0 0 24 24" fill="none" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
);

// --- MAIN COMPONENT ---
const ProjectGeneralView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [data, setData] = useState<ProjectData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      console.log(`Simulando carga de datos para el ID: ${id}`);
      setData(MOCK_PROJECT_DATA);
      setIsLoading(false);
    }, 1500); 
    return () => clearTimeout(timer);
  }, [id]);

  // --- SKELETON STATE ---
  if (isLoading) {
    return (
      <div className="min-h-[calc(100vh-64px)] bg-[#F3F5F9] p-8 md:p-12 font-sans">
        <div className="mb-12 border-b-2 border-gray-200 pb-4">
          <div className="h-9 bg-gray-300 rounded w-64 animate-pulse"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[350px_1fr] gap-12 lg:gap-20 relative">
          <div className="flex flex-col">
            <div className="h-7 bg-gray-300 rounded w-48 mb-6 animate-pulse"></div>
            <div className="flex items-center bg-white rounded-xl p-5 shadow-sm mb-12 animate-pulse">
              <div className="w-10 h-10 bg-gray-200 rounded-full mr-5"></div>
              <div className="flex-1">
                <div className="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
            </div>

            <div className="h-7 bg-gray-300 rounded w-32 mb-6 animate-pulse"></div>
            <div className="flex items-center bg-white rounded-xl p-5 shadow-sm mb-4 animate-pulse">
               <div className="w-10 h-10 bg-gray-200 rounded-full mr-5"></div>
               <div className="flex-1">
                <div className="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
            </div>
            <div className="flex items-center bg-white rounded-xl p-5 shadow-sm animate-pulse">
               <div className="w-10 h-10 bg-gray-200 rounded-full mr-5"></div>
               <div className="flex-1">
                <div className="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
            </div>
          </div>

          <div className="relative pt-2">
            <div className="h-7 bg-gray-300 rounded w-48 mb-8 animate-pulse"></div>

            <div className="mb-10">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex relative pb-4 animate-pulse">
                  <div className="flex flex-col items-center mr-6 relative">
                    <div className="w-6 h-6 rounded-full bg-gray-300 z-10"></div>
                    {i < 4 && <div className="absolute top-6 bottom-[-16px] w-[2px] bg-gray-300"></div>}
                  </div>
                  <div className="flex-1 bg-gray-200 rounded-lg p-3 h-[74px]"></div>
                </div>
              ))}
            </div>

            <div className="w-full h-14 bg-gray-300 rounded-lg animate-pulse"></div>
          </div>
        </div>
      </div>
    );
  }

  // --- MAIN VIEW ---
  if (!data) return null;

  return (
    <div className="min-h-[calc(100vh-64px)] bg-[#F3F5F9] p-8 md:p-12 font-sans text-slate-800">
      <div className="mb-12 border-b-2 border-gray-200 pb-4">
        <h1 className="text-3xl font-bold text-[#0A1F61]">{data.name}</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[350px_1fr] gap-12 lg:gap-20 relative">
        <div className="flex flex-col">
          <h2 className="text-xl font-semibold text-[#0A1F61] mb-6">Profesional asignado</h2>
          <div className="flex items-center bg-white rounded-xl p-5 shadow-sm mb-12">
            <div className="mr-5 text-gray-500">
              <UserIcon />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#0A1F61] mb-0.5">{data.professional.name}</h3>
              <p className="text-sm text-gray-500 m-0">{data.professional.specialty}</p>
            </div>
          </div>

          <h2 className="text-xl font-semibold text-[#0A1F61] mb-6">Datos básicos</h2>
          <div className="flex items-center bg-white rounded-xl p-5 shadow-sm mb-4">
            <div className="mr-5 text-gray-500">
               <MapPinIcon />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#0A1F61] mb-0.5">{data.basicData.location}</h3>
              <p className="text-sm text-gray-500 m-0">{data.basicData.details}</p>
            </div>
          </div>

           <div className="flex items-center bg-white rounded-xl p-5 shadow-sm">
            <div className="mr-5 text-gray-500">
               <ToolIcon />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#0A1F61] mb-0.5">{data.basicData.interventionType}</h3>
              <p className="text-sm text-gray-500 m-0">Remodelación integral</p>
            </div>
          </div>
        </div>

        <div className="relative pt-2">
          <h2 className="text-xl font-semibold text-[#0A1F61] mb-8">Fases del proyecto</h2>

          <div className="mb-10">
            {data.phases.map((phase, index) => (
              <div key={phase.id} className="flex relative pb-4">
                <div className="flex flex-col items-center mr-6 relative">
                  <div className={`w-6 h-6 rounded-full z-10 flex items-center justify-center ${
                    phase.state === 'completed' ? 'bg-[#00C853]' : 
                    phase.state === 'current' ? 'bg-white border-2 border-gray-300' : 
                    'bg-gray-200'
                  }`}>
                    {phase.state === 'completed' && <CheckIcon />}
                  </div>
                  
                  {index < data.phases.length - 1 && (
                    <div className={`absolute top-6 bottom-[-16px] w-[2px] ${
                      phase.state === 'completed' ? 'bg-[#00C853]' : 'bg-gray-300'
                    }`}></div>
                  )}
                </div>

                <div className="flex-1 bg-[#E6EDF8] border border-[#B0C0D0] rounded-lg p-3">
                  <h3 className={`text-base font-medium m-0 mb-1 ${
                    phase.state === 'pending' ? 'text-gray-500' : 'text-gray-900'
                  }`}>
                    {phase.title}
                  </h3>
                  <p className="text-sm text-gray-500 m-0">{phase.status}</p>
                </div>
              </div>
            ))}
          </div>

          <button className="w-full py-4 bg-[#0A1F61] hover:bg-[#1a2f71] text-white rounded-lg text-lg font-semibold transition-colors">
            Registrar avance
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectGeneralView;
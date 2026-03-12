import React, { useState, useRef, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { projectService } from '../services/project.service';
import { ProjectInput } from '../types';
import { storage } from '../utils/storage'; // Importamos para obtener el userId

// --- CONSTANTS & MOCK DATA ---
const AVAILABLE_TRADES = [
  'Bricklayer', 'Plumber', 'Electrician', 'Carpenter', 'Painter',
  'Drywaller', 'Roofer', 'HVAC Technician', 'Welder', 'Mason'
];

const TYPE_OF_WORK_PRESETS = [
  'Residential Construction', 'Commercial Renovation', 'Industrial Facility',
  'Infrastructure Project', 'Restoration', 'Interior Design'
];

const CATEGORY_PRESETS = [
  'Luxury', 'Affordable Housing', 'Sustainable/Green', 'Historical',
  'Mixed-Use', 'Hospitality'
];

const STATUS_OPTIONS = [
  'To Do', 'Started', 'In Progress', 'Pending Approval', 'Completed'
];

// MOCK: IDs simulados como UUIDs para que el backend no se queje si valida el formato
const MOCK_PROFESSIONALS_LIST = [
  { id: '11111111-1111-1111-1111-111111111111', firstName: 'John', lastName: 'Doe', role: 'Architect' },
  { id: '22222222-2222-2222-2222-222222222222', firstName: 'Jane', lastName: 'Smith', role: 'Electrician' },
  { id: '33333333-3333-3333-3333-333333333333', firstName: 'Mike', lastName: 'Johnson', role: 'Plumber' },
  { id: '44444444-4444-4444-4444-444444444444', firstName: 'Aurelio', lastName: 'Robles', role: 'Master Builder' },
  { id: '55555555-5555-5555-5555-555555555555', firstName: 'German', lastName: 'Perruelo', role: 'Electrician' },
  { id: '66666666-6666-6666-6666-666666666666', firstName: 'Kevin', lastName: 'Campos', role: 'Builder' },
  { id: '77777777-7777-7777-7777-777777777777', firstName: 'Laura', lastName: 'García', role: 'Interior Designer' },
  { id: '88888888-8888-8888-8888-888888888888', firstName: 'Carlos', lastName: 'Rodríguez', role: 'Site Engineer' },
];

const OTHER_OPTION = 'Other: (please specify)';

// --- ICONS ---
const PlusIconWhite = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
);

const PaperclipIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-2 stroke-[#0A1F61]" viewBox="0 0 24 24" fill="none" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"/></svg>
);

// --- MAIN COMPONENT ---
const ProjectRegister: React.FC = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const tradeDropdownRef = useRef<HTMLDivElement>(null);
  const proDropdownRef = useRef<HTMLDivElement>(null);

  // --- STATE ---
  const [projectName, setProjectName] = useState('');
  const [projectLocation, setProjectLocation] = useState('');
  const [internalCode, setInternalCode] = useState('');
  const [status, setStatus] = useState('To Do');
  const [selectedTrades, setSelectedTrades] = useState<string[]>([]);
  const [showTradeSelector, setShowTradeSelector] = useState(false);
  const [typeOfWorkPreset, setTypeOfWorkPreset] = useState(TYPE_OF_WORK_PRESETS[0]);
  const [customTypeOfWork, setCustomTypeOfWork] = useState('');
  const [categoryPreset, setCategoryPreset] = useState(CATEGORY_PRESETS[0]);
  const [customCategory, setCustomCategory] = useState('');
  const [selectedProfessionalIds, setSelectedProfessionalIds] = useState<string[]>([]);
  const [assignedProId, setAssignedProId] = useState<string>('');
  const [proSearchQuery, setProSearchQuery] = useState('');
  const [showProSelector, setShowProSelector] = useState(false);
  const [selectedPlanFile, setSelectedPlanFile] = useState<File | null>(null);
  const [planUrl, setPlanUrl] = useState('');
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // --- LOGIC ---
  useEffect(() => {
    const currentUser = storage.getUser();
    if (!currentUser || currentUser.role !== 'professional') {
      navigate('/dashboard');
    }
  }, [navigate]);
  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (tradeDropdownRef.current && !tradeDropdownRef.current.contains(event.target as Node)) {
        setShowTradeSelector(false);
      }
      if (proDropdownRef.current && !proDropdownRef.current.contains(event.target as Node)) {
        setShowProSelector(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredAvailableTrades = useMemo(() => {
    return AVAILABLE_TRADES.filter(trade => !selectedTrades.includes(trade));
  }, [selectedTrades]);

  const filteredAvailableProfessionals = useMemo(() => {
    const query = proSearchQuery.toLowerCase();
    return MOCK_PROFESSIONALS_LIST
      .filter(pro => !selectedProfessionalIds.includes(pro.id))
      .filter(pro => {
        const fullName = `${pro.firstName} ${pro.lastName}`.toLowerCase();
        return fullName.includes(query) || pro.role.toLowerCase().includes(query);
      });
  }, [proSearchQuery, selectedProfessionalIds]);

  const displaySelectedProfessionals = useMemo(() => {
    return selectedProfessionalIds.map(id => 
      MOCK_PROFESSIONALS_LIST.find(pro => pro.id === id)
    ).filter(Boolean);
  }, [selectedProfessionalIds]);

  const selectedProfessionalsNamesText = useMemo(() => {
    if (selectedProfessionalIds.length === 0) return '';
    return selectedProfessionalIds.map(id => {
      const pro = MOCK_PROFESSIONALS_LIST.find(p => p.id === id);
      return pro ? `${pro.firstName} ${pro.lastName} - ${pro.role}` : '';
    }).join(', ');
  }, [selectedProfessionalIds]);

  // --- ACTIONS ---
  const handlePlansClick = () => {
    setShowUrlInput(true);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedPlanFile(event.target.files[0]);
    }
  };

  const addTrade = (trade: string) => {
    setSelectedTrades([...selectedTrades, trade]);
    setShowTradeSelector(false);
  };

  const removeTrade = (tradeToRemove: string) => {
    setSelectedTrades(selectedTrades.filter(trade => trade !== tradeToRemove));
  };

  const addProfessional = (id: string) => {
    setSelectedProfessionalIds([...selectedProfessionalIds, id]);
    if (selectedProfessionalIds.length === 0) setAssignedProId(id);
    setProSearchQuery('');
  };

  const removeProfessional = (idToRemove: string) => {
    const newSelected = selectedProfessionalIds.filter(id => id !== idToRemove);
    setSelectedProfessionalIds(newSelected);
    if (assignedProId === idToRemove) {
      setAssignedProId(newSelected.length > 0 ? newSelected[0] : '');
    }
  };

  // handleSubmit provisional hasta tener endpoint get users con ids reales
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    const currentUser = storage.getUser();

    if (!currentUser || !currentUser.id) {
      setError('Error: User session not found. Please log in again.');
      setIsLoading(false);
      return;
    }
    if (!projectName.trim() || !projectLocation.trim() || !internalCode.trim() || selectedTrades.length === 0) {
      setError('Please fill all required fields: Name, Location, Code, and at least 1 Trade.');
      setIsLoading(false);
      return;
    }

    const finalTypeOfWork = typeOfWorkPreset === OTHER_OPTION ? customTypeOfWork : typeOfWorkPreset;
    const finalCategory = categoryPreset === OTHER_OPTION ? customCategory : categoryPreset;
    
    const assignedProfessionalId = currentUser.id;
    const projectTeamIds = [currentUser.id];

    const projectData: ProjectInput = {
      name: projectName.trim(),
      code: internalCode.trim(),
      category: finalCategory,
      location: projectLocation.trim(),
      surface_sqft: 0,
      structure_type: 'Unknown',
      intervention_type: finalTypeOfWork,
      assigned_professional: assignedProfessionalId,
      project_team: projectTeamIds,
      trades: selectedTrades,
      userId: currentUser.id,
      project_plan_photo: planUrl.trim() || undefined,
    };

    try {
      await projectService.create(projectData);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Failed to create project. Check server logs.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  // --- RENDER ---
  return (
    <div className="min-h-screen bg-[#F8FAFC] p-8 md:p-12 font-sans text-slate-800">
      <form onSubmit={handleSubmit} className="w-full">
        
        {/* --- HEADER --- */}
        <div className="flex justify-between items-end mb-10 pb-4 border-b-[2px] border-[#0A1F61]">
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-[#0C277B]">Project Register</h1>
            <p className="text-gray-400 text-sm mt-1 leading-relaxed">{internalCode || 'New Project'}</p>
          </div>
          
          <div className="flex flex-col items-end gap-2 min-w-[300px]">
            {!showUrlInput ? (
              <button 
                type="button"
                onClick={handlePlansClick}
                className="flex items-center bg-[#0A1F61] hover:bg-[#1a2f71] text-white px-7 py-2.5 rounded-md font-medium transition shadow-sm ml-auto"
              >
                Plans <span className="ml-2 font-bold">+</span>
              </button>
            ) : (
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                   <PaperclipIcon />
                </div>
                <input 
                  type="url"
                  value={planUrl}
                  onChange={(e) => setPlanUrl(e.target.value)}
                  placeholder="https://example.com/plan.pdf"
                  className="w-[250px] pl-10 pr-4 py-2.5 rounded-md border border-gray-200 text-sm focus:ring-1 focus:ring-[#0A1F61] focus:border-[#0A1F61] transition outline-none"
                  autoFocus
                />
              </div>
            )}
            {planUrl && !showUrlInput && <p className="text-xs text-green-600 font-medium max-w-[150px] truncate ml-auto">Link added</p>}
            <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept=".pdf,.dwg,.jpg,.png" />
            {selectedPlanFile && <p className="text-xs text-green-600 font-medium max-w-[150px] truncate">{selectedPlanFile.name}</p>}
          </div>
        </div>

        {error && <p className="mb-6 bg-red-50 border border-red-200 text-red-600 p-3 rounded-lg text-sm font-medium">{error}</p>}

        {/* --- TRADES --- */}
        <div className="w-full relative mb-8">
          <label className="block text-[#0A1F61] text-lg mb-3 font-medium">Trades <span className="text-red-500">*</span></label>
          <div className="flex flex-wrap gap-x-3 gap-y-3 items-center min-h-[44px]">
            {selectedTrades.map(trade => {
              let colorClass = '';
              let iconSvg = null;
              
              if (trade === 'Plumber') {
                  colorClass = 'bg-[#FFA756] border-[#E89243]';
                  iconSvg = <svg className="w-4 h-4 fill-black" viewBox="0 0 24 24"><path d="M15 13H17V17H20V19H15V13ZM6 5H8V9H11V11H6V5Z"/></svg>;
              }
              else if (trade === 'Electrician') {
                  colorClass = 'bg-[#B156FF] border-[#9A41E8] text-white';
                  iconSvg = <svg className="w-4 h-4 fill-yellow-300" viewBox="0 0 24 24"><path d="M13 3L4 14H12L11 21L20 10H12L13 3Z"/></svg>;
              }
              else if (trade === 'Bricklayer') {
                  colorClass = 'bg-[#6B78B4] border-[#55619A] text-white';
                  iconSvg = <svg className="w-4 h-4 fill-orange-300" viewBox="0 0 24 24"><path d="M4 6H10V10H4V6ZM14 6H20V10H14V6ZM4 12H8V16H4V12ZM10 12H20V16H10V12ZM4 18H14V22H4V18ZM16 18H20V22H16V18Z"/></svg>;
              }
              else {
                  colorClass = 'bg-gray-500 border-gray-600 text-white';
              }

              return (
                <div key={trade} className={`flex items-center gap-2 ${colorClass} border px-4 py-1.5 rounded-md text-sm font-medium cursor-pointer hover:opacity-90 transition`} onClick={() => removeTrade(trade)}>
                  {iconSvg}
                  {trade}
                </div>
              );
            })}
            
            <div ref={tradeDropdownRef} className="relative">
              <button 
                type="button" 
                onClick={() => setShowTradeSelector(!showTradeSelector)}
                className="flex items-center justify-center w-8 h-8 rounded-full bg-[#0A1F61] hover:bg-[#1a2f71] text-white transition shadow-md"
              >
                <PlusIconWhite />
              </button>
              {showTradeSelector && (
                <div className="absolute top-full mt-2 left-0 w-56 bg-white border border-gray-100 rounded-lg shadow-xl z-20 py-1.5 max-h-60 overflow-y-auto">
                  {filteredAvailableTrades.length > 0 ? filteredAvailableTrades.map(trade => (
                    <button 
                      key={trade} 
                      type="button"
                      onClick={() => addTrade(trade)}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      {trade}
                    </button>
                  )) : (
                    <p className="px-4 py-2 text-sm italic text-gray-400">All trades selected</p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* --- DATA GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 items-start pt-2">
          
          {/* --- LEFT COLUMN --- */}
          <div className="flex flex-col gap-y-8">
            <div>
              <label className="block text-[#0A1F61] text-[17px] mb-2 font-medium">Name of project <span className="text-red-500">*</span></label>
              <input 
                type="text"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                placeholder="Gamma Project"
                className="w-full bg-white px-3 py-2.5 rounded border border-gray-200 text-gray-700 text-[15px] focus:ring-1 focus:ring-[#0A1F61] focus:border-[#0A1F61] transition outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-[#0A1F61] text-[17px] mb-2 font-medium">Project location <span className="text-red-500">*</span></label>
              <input 
                type="text"
                value={projectLocation}
                onChange={(e) => setProjectLocation(e.target.value)}
                placeholder="City, State"
                className="w-full bg-white px-3 py-2.5 rounded border border-gray-200 text-gray-700 text-[15px] focus:ring-1 focus:ring-[#0A1F61] focus:border-[#0A1F61] transition outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-[#0A1F61] text-[17px] mb-2 font-medium">Type of work</label>
              <select 
                value={typeOfWorkPreset}
                onChange={(e) => setTypeOfWorkPreset(e.target.value)}
                className="w-full bg-white px-3 py-2.5 rounded border border-gray-200 text-gray-700 text-[15px] focus:ring-1 focus:ring-[#0A1F61] focus:border-[#0A1F61] transition outline-none"
              >
                {TYPE_OF_WORK_PRESETS.map(preset => <option key={preset} value={preset}>{preset}</option>)}
                <option value={OTHER_OPTION}>{OTHER_OPTION}</option>
              </select>
              {typeOfWorkPreset === OTHER_OPTION && (
                <input 
                  type="text" 
                  value={customTypeOfWork}
                  onChange={(e) => setCustomTypeOfWork(e.target.value)}
                  placeholder="Please specify type of work"
                  className="w-full mt-2 px-3 py-2 rounded border border-gray-200 text-xs text-gray-700 focus:ring-[#0A1F61] transition outline-none"
                />
              )}
            </div>

            <div>
              <label className="block text-[#0A1F61] text-[17px] mb-2 font-medium">Internal code <span className="text-red-500">*</span></label>
              <input 
                type="text"
                value={internalCode}
                onChange={(e) => setInternalCode(e.target.value)}
                placeholder="CP-13252024-FX"
                className="w-full bg-white px-3 py-2.5 rounded border-2 border-purple-400 text-gray-700 text-[15px] focus:ring-1 focus:ring-purple-500 focus:border-purple-500 transition outline-none"
                required
              />
            </div>
          </div>

          {/* --- RIGHT COLUMN --- */}
          <div className="flex flex-col gap-y-8 mt-8 md:mt-0">
            <div>
              <label className="block text-[#0A1F61] text-[17px] mb-2 font-medium">Category</label>
              <select 
                value={categoryPreset}
                onChange={(e) => setCategoryPreset(e.target.value)}
                className="w-full bg-white px-3 py-2.5 rounded border border-gray-200 text-gray-700 text-[15px] focus:ring-1 focus:ring-[#0A1F61] focus:border-[#0A1F61] transition outline-none"
              >
                {CATEGORY_PRESETS.map(preset => <option key={preset} value={preset}>{preset}</option>)}
                <option value={OTHER_OPTION}>{OTHER_OPTION}</option>
              </select>
              {categoryPreset === OTHER_OPTION && (
                <input 
                  type="text" 
                  value={customCategory}
                  onChange={(e) => setCustomCategory(e.target.value)}
                  placeholder="Please specify category"
                  className="w-full mt-2 px-3 py-2 rounded border border-gray-200 text-xs text-gray-700 focus:ring-[#0A1F61] transition outline-none"
                />
              )}
            </div>

            <div>
              <label className="block text-[#0A1F61] text-[17px] mb-2 font-medium">Initial project status</label>
              <select 
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full bg-white px-3 py-2.5 rounded border border-gray-200 text-gray-700 text-[15px] focus:ring-1 focus:ring-[#0A1F61] focus:border-[#0A1F61] transition outline-none"
              >
                {STATUS_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
              </select>
            </div>

            <div ref={proDropdownRef} className="w-full relative">
              <label className="block text-[#0A1F61] text-[17px] mb-2 font-medium">
                Professionals <span className="text-red-500">*</span>
              </label>
              
              <div 
                onClick={() => setShowProSelector(!showProSelector)}
                className="w-full bg-white px-3 py-2.5 min-h-[44px] rounded border border-gray-200 text-gray-700 text-[15px] focus:ring-1 focus:ring-[#0A1F61] focus:border-[#0A1F61] flex justify-between items-center cursor-pointer transition outline-none"
              >
                <span>{selectedProfessionalIds.length === 0 ? 'Search and select professionals' : `${selectedProfessionalIds.length} professional(s) selected`}</span>
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </div>

              {showProSelector && (
                <div className="absolute top-[80px] left-0 w-full bg-white border border-gray-200 rounded shadow-lg z-20 py-1 max-h-60 overflow-hidden flex flex-col">
                  <div className="px-2 py-2 border-b border-gray-100 sticky top-0 bg-white">
                    <input 
                      type="text"
                      value={proSearchQuery}
                      onChange={(e) => setProSearchQuery(e.target.value)}
                      placeholder="Search by name or role..."
                      className="w-full px-3 py-1.5 rounded border border-gray-200 text-sm focus:ring-[#0A1F61] outline-none"
                      onClick={(e) => e.stopPropagation()} 
                    />
                  </div>
                  <div className="overflow-y-auto flex-1 py-1">
                    {filteredAvailableProfessionals.length > 0 ? filteredAvailableProfessionals.map(pro => (
                      <button 
                        key={pro.id} 
                        type="button"
                        onClick={() => addProfessional(pro.id)}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      >
                        {pro.firstName} {pro.lastName} - <span className="text-gray-500">{pro.role}</span>
                      </button>
                    )) : (
                      <p className="px-4 py-2 text-sm italic text-gray-400 text-center">No professionals found</p>
                    )}
                  </div>
                </div>
              )}

              {displaySelectedProfessionals.length > 0 && (
                <div className="mt-4 flex flex-col gap-2.5">
                  {displaySelectedProfessionals.map(pro => (
                    <div key={pro?.id} className="flex items-center justify-between bg-white rounded-lg p-3 shadow-sm border border-gray-100">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center font-bold text-sm text-[#0A1F61] border border-gray-200">
                          {pro?.firstName[0]}{pro?.lastName[0]}
                        </div>
                        <div>
                          <h4 className="text-[14px] font-bold text-[#0A1F61] mb-0.5">{pro?.firstName} {pro?.lastName}</h4>
                          <p className="text-[12px] text-gray-500 m-0 italic">{pro?.role}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <label className="flex items-center gap-1.5 text-[13px] text-gray-500 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={assignedProId === pro?.id}
                            onChange={() => setAssignedProId(pro!.id)}
                            className="w-3.5 h-3.5 accent-[#0A1F61]"
                          />
                          Project lead
                        </label>
                        <button type="button" onClick={() => removeProfessional(pro!.id)} className="text-gray-400 hover:text-red-500 transition p-1">
                          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* --- SUBMIT SECTION --- */}
        <div className="mt-12 w-full pb-10">
          <button 
            type="submit"
            disabled={isLoading}
            className={`w-full py-3.5 rounded-md text-[17px] font-medium transition ${
              isLoading 
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-[#0A1F61] hover:bg-[#1a2f71] text-white shadow-md'
            }`}
          >
            {isLoading ? 'Publishing...' : 'Publish project'}
          </button>
        </div>

      </form>
    </div>
  );
};

export default ProjectRegister;
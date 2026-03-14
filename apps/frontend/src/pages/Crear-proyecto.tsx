import React, { useState, useRef, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { projectService } from '../services/project.service';
import { ProjectInput } from '../types';
import { storage } from '../utils/storage'; // Importamos para obtener el userId
import { API_ENDPOINTS } from '../constants/routes';

//icons
import icons_trade_types from "../components/common/icons_trades_types";

//components
import { ButtonPlans } from '../components/common/Button_plans';

// --- CONSTANTS & MOCK DATA ---
const AVAILABLE_TRADES = icons_trade_types.map(t => t.trade_type);

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
  const [status, setStatus] = useState('Started');
  const [selectedTrades, setSelectedTrades] = useState<string[]>([]);
  const [showTradeSelector, setShowTradeSelector] = useState(false);
  const [typeOfWorkPreset, setTypeOfWorkPreset] = useState('Restoration');
  const [customTypeOfWork, setCustomTypeOfWork] = useState('');
  const [categoryPreset, setCategoryPreset] = useState('Luxury');
  const [customCategory, setCustomCategory] = useState('');
  const [selectedProfessionalIds, setSelectedProfessionalIds] = useState<string[]>([]);
  const [assignedProId, setAssignedProId] = useState<string>('');
  const [proSearchQuery, setProSearchQuery] = useState('');
  const [showProSelector, setShowProSelector] = useState(false);
  const [selectedPlanFile, setSelectedPlanFile] = useState<File | null>(null);
  const [planUrl, setPlanUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [dbUsers, setDbUsers] = useState<any[]>([]);

  // --- LOGIC ---
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`${API_ENDPOINTS.BASE}/api/auth/users`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
        });
        if (response.ok) {
          const data = await response.json();
          setDbUsers(data.users || []);
        }
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    };
    fetchUsers();
  }, []);

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
    return dbUsers
      .filter(user => !selectedProfessionalIds.includes(user.id))
      .filter(user => {
        const fullName = (user.name || '').toLowerCase();
        const role = (user.role || '').toLowerCase();
        return fullName.includes(query) || role.includes(query);
      });
  }, [proSearchQuery, selectedProfessionalIds, dbUsers]);

  const displaySelectedProfessionals = useMemo(() => {
    return selectedProfessionalIds.map(id => 
      dbUsers.find(user => user.id === id)
    ).filter(Boolean);
  }, [selectedProfessionalIds, dbUsers]);

  const selectedProfessionalsNamesText = useMemo(() => {
    if (selectedProfessionalIds.length === 0) return '';
    return selectedProfessionalIds.map(id => {
      const pro = dbUsers.find(user => user.id === id);
      return pro ? `${pro.name} - ${pro.role === 'user' ? `user - ${pro.trade}` : pro.role}` : '';
    }).join(', ');
  }, [selectedProfessionalIds, dbUsers]);

  // --- ACTIONS ---
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
    
    const assignedProfessionalId = assignedProId || (selectedProfessionalIds.length > 0 ? selectedProfessionalIds[0] : currentUser.id);
    const projectTeamIds = selectedProfessionalIds.length > 0 ? selectedProfessionalIds : [currentUser.id];

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
      <form onSubmit={handleSubmit} className="w-full max-w-[1400px] mx-auto">
        
        {/* --- HEADER --- */}
        <div className="flex justify-between items-end mb-10 pb-4 border-b-[2px] border-[#0A1F61]">
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-[#0C277B]">Project Register</h1>
            <p className="text-gray-400 text-sm mt-1 leading-relaxed">{internalCode || 'New Project'}</p>
          </div>
          
          <div className="flex flex-col items-end gap-2 min-w-[300px]">
            <ButtonPlans name={projectName || 'New Project'} projectId="temp" planUrl={planUrl} onPlanUpdate={setPlanUrl} />
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
              const tradeInfo = icons_trade_types.find(
                (item) => item.trade_type.toLowerCase() === trade.toLowerCase()
              );

              return (
                <div 
                    key={trade} 
                    className={`flex items-center gap-2 px-4 py-1.5 rounded-md text-sm font-medium shadow-sm capitalize cursor-pointer hover:opacity-90 transition
                    ${tradeInfo?.color_assigned ? `${tradeInfo.color_assigned} text-white` : "bg-gray-500 text-white"}`} 
                    onClick={() => removeTrade(trade)}
                >
                  {tradeInfo?.icon}
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
                <div className="absolute top-full mt-2 left-0 w-64 bg-white border border-gray-100 rounded-lg shadow-xl z-20 py-2 max-h-60 overflow-y-auto flex flex-col gap-2 p-2">
                  {filteredAvailableTrades.length > 0 ? filteredAvailableTrades.map(trade => {
                    const tradeInfo = icons_trade_types.find(
                      (item) => item.trade_type.toLowerCase() === trade.toLowerCase()
                    );
                    return (
                      <button 
                        key={trade} 
                        type="button"
                        onClick={() => addTrade(trade)}
                        className={`flex items-center gap-2 px-3 py-1.5 w-full text-left rounded-md text-sm font-medium shadow-sm capitalize hover:opacity-90 transition
                        ${tradeInfo?.color_assigned ? `${tradeInfo.color_assigned} text-white` : "bg-gray-500 text-white"}`}
                      >
                        {tradeInfo?.icon}
                        {trade}
                      </button>
                    );
                  }) : (
                    <p className="px-4 py-2 text-sm italic text-gray-400 text-center w-full">All trades selected</p>
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
                        {pro.name} - <span className="text-gray-500">{pro.role === 'user' ? `user - ${pro.trade}` : pro.role}</span>
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
                          {pro?.name?.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <h4 className="text-[14px] font-bold text-[#0A1F61] mb-0.5">{pro?.name}</h4>
                          <p className="text-[12px] text-gray-500 m-0 italic">{pro?.role === 'user' ? `user - ${pro.trade}` : pro?.role}</p>
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
import React, { useState, useEffect } from 'react';

// === DATE MOCK-UP ===
const teamMembers = [
  { id: 'usr-1', name: 'Alexandru Popescu', initials: 'AP', isOnline: true },
  { id: 'usr-2', name: 'Maria Ionescu', initials: 'MI', isOnline: false },
  { id: 'usr-3', name: 'Cristian Neagu', initials: 'CN', isOnline: true },
  { id: 'usr-4', name: 'Bogdan Morar', initials: 'BM', isOnline: true },
  { id: 'usr-5', name: 'Alina Drăgan', initials: 'AD', isOnline: false },
];

const initialProjects = [
  { 
    id: 'proj-1', 
    name: 'Platformă E-commerce', 
    description: 'Dezvoltarea unei platforme de comerț electronic cu funcții avansate de plată și livrare.', 
    owner: 'Alexandru Popescu',
    team: ['AP', 'BM', 'AD'],
    createdAt: '2024-11-10',
    deadline: '2025-03-31',
    status: 'In Progress',
    methodology: 'Scrum',
    priority: 'High',
    tags: ['frontend', 'backend', 'urgent'],
    repo: 'https://github.com/my-org/e-commerce-platform',
    lastUpdated: '2024-11-20',
    isPinned: true,
    progress: 45,
    type: 'feature development',
    notes: 'Discuție cu echipa de marketing despre funcționalitățile de e-mail marketing.',
    icon: 'https://cdn-icons-png.flaticon.com/512/2857/2857416.png'
  },
  { 
    id: 'proj-2', 
    name: 'Redesign Aplicație Mobilă', 
    description: 'Redesenarea interfeței și experienței utilizatorului pentru aplicația noastră mobilă existentă.', 
    owner: 'Maria Ionescu',
    team: ['MI'],
    createdAt: '2024-10-15',
    deadline: '2025-01-15',
    status: 'On Hold',
    methodology: 'Kanban',
    priority: 'Medium',
    tags: ['design', 'mobile', 'ui/ux'],
    repo: null,
    lastUpdated: '2024-11-18',
    isPinned: false,
    progress: 60,
    type: 'research',
    notes: 'Așteptăm feedback de la clienți pe noua interfață.',
    icon: 'https://cdn-icons-png.flaticon.com/512/1078/1078174.png'
  },
  { 
    id: 'proj-3', 
    name: 'Sistem de Analiză a Datelor', 
    description: 'Crearea unui sistem de business intelligence pentru a vizualiza și analiza performanța vânzărilor.', 
    owner: 'Cristian Neagu',
    team: ['CN', 'AP'],
    createdAt: '2024-09-01',
    deadline: '2025-05-30',
    status: 'Active',
    methodology: 'Waterfall',
    priority: 'Low',
    tags: ['data', 'analytics', 'reporting'],
    repo: 'https://github.com/my-org/data-analytics',
    lastUpdated: '2024-11-15',
    isPinned: false,
    progress: 80,
    type: 'internal',
    notes: 'Definirea KPI-urilor și integrarea cu baza de date existentă.',
    icon: 'https://cdn-icons-png.flaticon.com/512/2942/2942189.png'
  },
  { 
    id: 'proj-4', 
    name: 'Serviciu de Mentenanță', 
    description: 'Mentenanță și actualizări periodice pentru toate aplicațiile interne.', 
    owner: 'Alexandru Popescu',
    team: ['AP', 'BM', 'AD', 'CN'],
    createdAt: '2024-11-01',
    deadline: '2024-12-05',
    status: 'Active',
    methodology: 'Scrum',
    priority: 'Critical',
    tags: ['it', 'mentenanță', 'bug fix'],
    repo: null,
    lastUpdated: '2024-11-21',
    isPinned: false,
    progress: 20,
    type: 'internal',
    notes: 'Prioritate maximă pentru bug-urile de securitate.',
    icon: 'https://cdn-icons-png.flaticon.com/512/2920/2920364.png'
  },
];

// Componente helper pentru o structură mai curată
const FolderOpenIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-blue-500">
    <path d="M4 17s.5-1 2-1h12c1.5 0 2 1 2 1" />
    <path d="M12 17v2" />
    <path d="M12 19h8a2 2 0 0 1 2 2v1H2v-1a2 2 0 0 1 2-2h8Z" />
    <path d="M8 17s.5-1 2-1h4c1.5 0 2 1 2 1" />
    <path d="M12 17v2" />
    <path d="M4 17a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h3l2 3h12a2 2 0 0 1 2 2v5" />
  </svg>
);
const EditIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 20h9" />
    <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
  </svg>
);
const DuplicateIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
  </svg>
);
const TrashIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 6h18" />
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
  </svg>
);
const PlusIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19"></line>
    <line x1="5" y1="12" x2="19" y2="12"></line>
  </svg>
);
const CloseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);
const CalendarIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
    <line x1="16" y1="2" x2="16" y2="6"></line>
    <line x1="8" y1="2" x2="8" y2="6"></line>
    <line x1="3" y1="10" x2="21" y2="10"></line>
  </svg>
);
const StatusIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
  </svg>
);
const PriorityIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10 13l4-4-4-4"></path>
    <path d="M10 21l4-4-4-4"></path>
  </svg>
);
const TagsIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 3v11a2 2 0 0 0 2 2h11l6 6V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2z"></path>
  </svg>
);
const UserIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2a5 5 0 1 0 5 5 5 5 0 0 0-5-5zM12 14a7 7 0 1 0 7 7 7 7 0 0 0-7-7z"></path>
  </svg>
);
const TeamsIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
    <circle cx="8.5" cy="7" r="4"></circle>
    <path d="M20 8v6M23 11h-6"></path>
  </svg>
);
const MethodologyIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2L2 22h20L12 2z"></path>
  </svg>
);
const RepoIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 10a2 2 0 1 1-4 0 2 2 0 0 1 4 0z"></path>
    <path d="M14 10a2 2 0 1 1-4 0 2 2 0 0 1 4 0z"></path>
    <path d="M14 10a2 2 0 1 1-4 0 2 2 0 0 1 4 0z"></path>
    <path d="M2 12c0-3.31 2.69-6 6-6s6 2.69 6 6-2.69 6-6 6-6-2.69-6-6z"></path>
    <path d="M22 12c0-3.31-2.69-6-6-6s-6 2.69-6 6 2.69 6 6 6 6-2.69 6-6z"></path>
  </svg>
);
const PinnedIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2a1 1 0 0 1 1 1v11l-1-1-1 1V3a1 1 0 0 1 1-1z"></path>
    <path d="M12 22c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z"></path>
  </svg>
);
const PinIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"></polygon>
  </svg>
);

const GridIcon = ({ active }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={active ? 'text-blue-600' : 'text-zinc-500'}>
    <rect x="3" y="3" width="7" height="7" rx="1"></rect>
    <rect x="14" y="3" width="7" height="7" rx="1"></rect>
    <rect x="14" y="14" width="7" height="7" rx="1"></rect>
    <rect x="3" y="14" width="7" height="7" rx="1"></rect>
  </svg>
);
const KanbanIcon = ({ active }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={active ? 'text-blue-600' : 'text-zinc-500'}>
    <line x1="12" y1="2" x2="12" y2="22"></line>
    <line x1="2" y1="12" x2="22" y2="12"></line>
    <path d="M4 12V6a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v6"></path>
    <path d="M12 12V6a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v6"></path>
    <path d="M4 12v6a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2v-6"></path>
    <path d="M12 12v6a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2v-6"></path>
  </svg>
);

const ProjectCard = ({ project, onEdit, onDelete, onDuplicate, onTogglePin, onSelect, isSelected, showCheckbox, teamMembers }) => {
  const statusColor = {
    'In Progress': 'bg-blue-500',
    'On Hold': 'bg-yellow-500',
    'Active': 'bg-green-500',
    'Completed': 'bg-zinc-500',
    'Archived': 'bg-zinc-400',
  };

  const priorityColor = {
    'Low': 'bg-gray-300',
    'Medium': 'bg-yellow-400',
    'High': 'bg-orange-500',
    'Critical': 'bg-red-600',
  };

  const statusLabel = {
    'In Progress': 'În curs',
    'On Hold': 'În așteptare',
    'Active': 'Activ',
    'Completed': 'Finalizat',
    'Archived': 'Arhivat',
  };

  const priorityLabel = {
    'Low': 'Joasă',
    'Medium': 'Medie',
    'High': 'Înaltă',
    'Critical': 'Critică',
  };
  
  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };
  
  const progressColor = (progress) => {
    if (progress <= 25) return 'bg-red-500';
    if (progress <= 75) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const membersToDisplay = project.team.slice(0, 3);
  const moreMembersCount = project.team.length - membersToDisplay.length;


  return (
    <div className={`bg-white dark:bg-zinc-800 rounded-xl p-6 shadow-md hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300 transform hover:-translate-y-1 flex flex-col justify-between ${isSelected ? 'ring-2 ring-blue-500' : ''}`}
      draggable
      onDragStart={(e) => {
          e.dataTransfer.setData("projectId", project.id);
      }}
    >
      <div>
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-2">
            {project.icon ? (
              <img src={project.icon} alt={`${project.name} icon`} className="h-6 w-6 object-contain" />
            ) : (
              <FolderOpenIcon />
            )}
            <h3 className="text-lg font-bold truncate text-zinc-900 dark:text-zinc-100">{project.name}</h3>
          </div>
          <div className="flex items-center gap-1">
            {showCheckbox && (
              <input 
                type="checkbox"
                checked={isSelected}
                onChange={() => onSelect(project.id)}
                className="form-checkbox h-4 w-4 text-blue-600 rounded"
              />
            )}
            <button
              onClick={() => onTogglePin(project.id)}
              className={`p-2 rounded-full transition-colors ${project.isPinned ? 'text-blue-500 hover:bg-zinc-100 dark:hover:bg-zinc-700' : 'text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-700'}`}
              aria-label="Fixează proiect"
            >
              <PinIcon />
            </button>
            <button
              onClick={() => onEdit(project)}
              className="p-2 rounded-full text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors"
              aria-label="Editează Proiect"
            >
              <EditIcon />
            </button>
            <button
              onClick={() => onDuplicate(project)}
              className="p-2 rounded-full text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors"
              aria-label="Duplică Proiect"
            >
              <DuplicateIcon />
            </button>
            <button
              onClick={() => onDelete(project.id)}
              className="p-2 rounded-full text-red-500 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900 transition-colors"
              aria-label="Șterge Proiect"
            >
              <TrashIcon />
            </button>
          </div>
        </div>
        <p className="text-zinc-600 dark:text-zinc-400 text-sm mb-4">{project.description}</p>
        <div className="grid grid-cols-2 gap-y-2 text-sm text-zinc-600 dark:text-zinc-400 mb-4">
          <div className="flex items-center gap-2"><StatusIcon /><span className={`h-2 w-2 rounded-full ${statusColor[project.status]}`}></span>Status: {statusLabel[project.status]}</div>
          <div className="flex items-center gap-2"><PriorityIcon /><span className={`h-2 w-2 rounded-full ${priorityColor[project.priority]}`}></span>Prioritate: {priorityLabel[project.priority]}</div>
          <div className="flex items-center gap-2"><CalendarIcon /> Creat: {project.createdAt}</div>
          <div className="flex items-center gap-2"><CalendarIcon /> Deadline: {project.deadline}</div>
          <div className="flex items-center gap-2"><UserIcon /> Owner: {project.owner}</div>
          <div className="flex items-center gap-2"><MethodologyIcon /> Metodologie: {project.methodology}</div>
        </div>
        
        <div className="flex flex-wrap gap-2 mb-4">
            {project.tags.map(tag => (
              <span key={tag} className="flex items-center gap-1 bg-zinc-100 dark:bg-zinc-700 text-zinc-600 dark:text-zinc-300 text-xs px-2 py-1 rounded-full">
                <TagsIcon />{tag}
              </span>
            ))}
        </div>
      </div>

      <div className="flex justify-between items-center text-xs text-zinc-500 dark:text-zinc-400 border-t border-zinc-100 dark:border-zinc-700 pt-4 mt-2">
        <span>Actualizat: {project.lastUpdated}</span>
        <div className="flex items-center -space-x-2">
            {membersToDisplay.map((initials) => {
              const member = teamMembers.find(m => m.initials === initials);
              return (
                <div key={initials} className={`relative w-6 h-6 rounded-full flex items-center justify-center text-xs text-white ring-2 ring-white dark:ring-zinc-800 bg-blue-300 dark:bg-blue-600`}>
                    {initials}
                    {member && member.isOnline && (
                        <div className="absolute bottom-0 right-0 h-2 w-2 rounded-full bg-green-500 ring-1 ring-white dark:ring-zinc-800"></div>
                    )}
                </div>
              );
            })}
            {moreMembersCount > 0 && (
                <div className="w-6 h-6 rounded-full bg-zinc-200 dark:bg-zinc-700 flex items-center justify-center text-xs text-zinc-600 dark:text-zinc-300 ring-2 ring-white dark:ring-zinc-800">
                    +{moreMembersCount}
                </div>
            )}
        </div>
      </div>
    </div>
  );
};

const Dialog = ({ isOpen, onClose, title, children }) => (
  <div
    className={`fixed inset-0 z-50 overflow-y-auto transition-opacity duration-300 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
    style={{ backdropFilter: 'blur(5px)', backgroundColor: 'rgba(0,0,0,0.5)' }}
  >
    <div className="flex items-center justify-center min-h-screen p-4 sm:p-6">
      <div className="relative w-full max-w-lg mx-auto bg-white dark:bg-zinc-800 rounded-xl shadow-lg p-6 sm:p-8 transform transition-transform duration-300 scale-95 origin-center">
        <div className="flex justify-between items-center mb-4 border-b border-zinc-100 dark:border-zinc-700 pb-4">
          <h2 className="text-xl font-bold">{title}</h2>
          <button onClick={onClose} className="p-2 rounded-full text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200 transition-colors">
            <CloseIcon />
          </button>
        </div>
        {children}
      </div>
    </div>
  </div>
);

const Toast = ({ title, description, variant }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 4000); 
    return () => clearTimeout(timer);
  }, []);

  const colorClass = variant === 'destructive'
    ? 'bg-red-500 text-white'
    : 'bg-green-500 text-white';

  return isVisible ? (
    <div className={`fixed bottom-4 right-4 p-4 rounded-lg shadow-lg z-[100] transition-transform transform ${colorClass} animate-slideIn`}>
      <div className="font-bold">{title}</div>
      <div className="text-sm">{description}</div>
    </div>
  ) : null;
};

const ToastContainer = ({ toasts }) => (
  <div className="fixed bottom-4 right-4 z-[100] flex flex-col space-y-2">
    {toasts.map((toast, index) => (
      <Toast key={index} {...toast} />
    ))}
  </div>
);

const useToast = () => {
  const [toasts, setToasts] = useState([]);
  const addToast = (toast) => {
    setToasts(currentToasts => [...currentToasts, toast]);
    setTimeout(() => {
      setToasts(currentToasts => currentToasts.filter(t => t !== toast));
    }, 5000);
  };
  return { toasts, toast: addToast };
};

const KanbanColumn = ({ title, status, projects, onEdit, onDelete, onDuplicate, onTogglePin, onSelect, selectedProjects, teamMembers, onDropProject, onDragOver }) => {
  const statusColor = {
    'In Progress': 'bg-blue-200 dark:bg-blue-800 text-blue-800 dark:text-blue-200',
    'On Hold': 'bg-yellow-200 dark:bg-yellow-800 text-yellow-800 dark:text-yellow-200',
    'Active': 'bg-green-200 dark:bg-green-800 text-green-800 dark:text-green-200',
    'Completed': 'bg-zinc-200 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200',
    'Archived': 'bg-zinc-200 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200',
  };
  return (
    <div className="flex-1 min-w-[280px] rounded-xl overflow-hidden shadow-lg border border-zinc-200 dark:border-zinc-700 flex flex-col"
      onDragOver={onDragOver}
      onDrop={(e) => onDropProject(e, status)}
    >
      <div className={`p-4 font-bold text-center ${statusColor[status]}`}>
        {title} ({projects.length})
      </div>
      <div className="p-4 space-y-4 overflow-y-auto flex-grow bg-zinc-50 dark:bg-zinc-900">
        {projects.map(project => (
          <ProjectCard
            key={project.id}
            project={project}
            onEdit={onEdit}
            onDelete={onDelete}
            onDuplicate={onDuplicate}
            onTogglePin={onTogglePin}
            onSelect={onSelect}
            isSelected={selectedProjects.includes(project.id)}
            showCheckbox={selectedProjects.length > 0}
            teamMembers={teamMembers}
          />
        ))}
        {projects.length === 0 && (
          <p className="text-center text-zinc-400 italic text-sm">Niciun proiect în această coloană.</p>
        )}
      </div>
    </div>
  );
};


// ... existing code ...

export default function Projects() {
  const [projects, setProjects] = useState(initialProjects);
  const [archivedProjects, setArchivedProjects] = useState([]);
  const { toasts, toast } = useToast();
  const [viewMode, setViewMode] = useState('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [groupBy, setGroupBy] = useState('none');
  const [showArchived, setShowArchived] = useState(false);
  const [selectedProjects, setSelectedProjects] = useState([]);
  const [showBulkActions, setShowBulkActions] = useState(false);
  const [archiveFolderName, setArchiveFolderName] = useState('');
  const [isArchiveDialogOpen, setArchiveDialogOpen] = useState(false);

  const [newProject, setNewProject] = useState({
    name: "", description: "", owner: "", deadline: "", status: "Active", methodology: "Scrum", tags: "", priority: "Medium", repo: "", type: "internal", progress: 0, notes: "", icon: ""
  });
  const [isCreateDialogOpen, setCreateDialogOpen] = useState(false);

  const [editProject, setEditProject] = useState(null);
  const [isEditDialogOpen, setEditDialogOpen] = useState(false);

  const [projectToDuplicate, setProjectToDuplicate] = useState(null);
  const [duplicateName, setDuplicateName] = useState("");
  const [isDuplicateDialogOpen, setDuplicateDialogOpen] = useState(false);

  const [draggedProjectId, setDraggedProjectId] = useState(null);

  const statuses = ['Active', 'In Progress', 'On Hold', 'Completed', 'Archived'];
  const priorities = ['Low', 'Medium', 'High', 'Critical'];
  const types = ['internal', 'external', 'research', 'feature development'];

  const handleCreateProject = () => {
    if (newProject.name && newProject.owner && newProject.deadline) {
      const tagsArray = newProject.tags.split(',').map(tag => tag.trim()).filter(tag => tag !== '');
      const projectToAdd = {
        ...newProject,
        id: `proj-${Date.now()}`,
        team: ['Placeholder'],
        tags: tagsArray,
        createdAt: new Date().toISOString().slice(0, 10),
        lastUpdated: new Date().toISOString().slice(0, 10),
        isPinned: false,
      };
      setProjects([...projects, projectToAdd]);
      setNewProject({ name: "", description: "", owner: "", deadline: "", status: "Active", methodology: "Scrum", tags: "", priority: "Medium", repo: "", type: "internal", progress: 0, notes: "", icon: "" });
      setCreateDialogOpen(false);
      toast({ title: "Proiect creat!", description: "Proiectul a fost adăugat cu succes." });
    }
  };

  const handleArchiveProject = (id) => {
    const projectToArchive = projects.find(proj => proj.id === id);
    if (projectToArchive) {
      setProjects(projects.filter(proj => proj.id !== id));
      setArchivedProjects([...archivedProjects, { ...projectToArchive, isPinned: false, status: 'Archived' }]);
      toast({ title: "Proiect arhivat!", description: "Proiectul a fost mutat în arhivă.", variant: "destructive" });
    }
  };
  
  const handleUnarchiveProject = (id) => {
    const projectToUnarchive = archivedProjects.find(proj => proj.id === id);
    if(projectToUnarchive) {
      setArchivedProjects(archivedProjects.filter(proj => proj.id !== id));
      setProjects([...projects, {...projectToUnarchive, status: 'Active'}]);
      toast({ title: "Proiect dezarhivat!", description: "Proiectul a fost restaurat." });
    }
  }

  const handleEdit = (project) => {
    setEditProject({
      ...project,
      tags: project.tags.join(', ')
    });
    setEditDialogOpen(true);
  };

  const handleUpdateProject = () => {
    if (editProject && editProject.name && editProject.owner && editProject.deadline) {
      const tagsArray = editProject.tags.split(',').map(tag => tag.trim()).filter(tag => tag !== '');
      const updatedProjects = projects.map(proj =>
        proj.id === editProject.id
          ? { 
              ...proj, 
              name: editProject.name, 
              description: editProject.description, 
              owner: editProject.owner,
              deadline: editProject.deadline,
              status: editProject.status,
              methodology: editProject.methodology,
              priority: editProject.priority,
              repo: editProject.repo,
              tags: tagsArray,
              lastUpdated: new Date().toISOString().slice(0, 10),
              progress: editProject.progress,
              type: editProject.type,
              notes: editProject.notes,
              icon: editProject.icon
            }
          : proj
      );
      setProjects(updatedProjects);
      setEditDialogOpen(false);
      setEditProject(null);
      toast({ title: "Proiect actualizat!", description: "Modificările au fost salvate." });
    }
  };

  const handleDuplicate = (project) => {
    setProjectToDuplicate(project);
    setDuplicateName(`${project.name} (Copie)`);
    setDuplicateDialogOpen(true);
  };

  const handleDuplicateProject = () => {
    if (projectToDuplicate && duplicateName) {
      const newProject = {
        ...projectToDuplicate,
        id: `proj-${Date.now()}`,
        name: duplicateName,
        lastUpdated: new Date().toISOString().slice(0, 10),
      };
      setProjects([...projects, newProject]);
      setDuplicateDialogOpen(false);
      setProjectToDuplicate(null);
      toast({ title: "Proiect duplicat!", description: "O copie a fost creată." });
    }
  };

  const handleTogglePin = (id) => {
    setProjects(projects.map(proj =>
      proj.id === id ? { ...proj, isPinned: !proj.isPinned } : proj
    ));
  };
  
  const handleSelectProject = (id) => {
    setSelectedProjects(prevSelected => {
      if (prevSelected.includes(id)) {
        return prevSelected.filter(projId => projId !== id);
      } else {
        return [...prevSelected, id];
      }
    });
  };

  useEffect(() => {
    if (selectedProjects.length > 0) {
      setShowBulkActions(true);
    } else {
      setShowBulkActions(false);
    }
  }, [selectedProjects]);

  const handleBulkArchive = () => {
    setArchiveDialogOpen(true);
  };

  const handleConfirmArchive = () => {
    if (!archiveFolderName) {
      toast({ title: "Nume obligatoriu", description: "Vă rugăm introduceți un nume pentru folderul de arhivă.", variant: "destructive" });
      return;
    }
  
    const projectsToArchive = projects.filter(p => selectedProjects.includes(p.id));
    const newArchivedFolder = {
      name: archiveFolderName,
      id: `archive-folder-${Date.now()}`,
      projects: projectsToArchive.map(p => ({ ...p, isPinned: false, status: 'Archived' })),
    };
  
    setArchivedProjects([...archivedProjects, newArchivedFolder]);
    setProjects(projects.filter(p => !selectedProjects.includes(p.id)));
    setSelectedProjects([]);
    setArchiveDialogOpen(false);
    setArchiveFolderName('');
    toast({ title: "Proiecte arhivate!", description: `Proiectele au fost mutate în folderul "${archiveFolderName}".`, variant: "destructive" });
  };


  const handleBulkDelete = () => {
    if (showArchived) {
      setArchivedProjects(archivedProjects.filter(p => !selectedProjects.includes(p.id)));
      toast({ title: "Proiecte șterse definitiv!", description: "Proiectele arhivate selectate au fost șterse.", variant: "destructive" });
    } else {
      setProjects(projects.filter(p => !selectedProjects.includes(p.id)));
      toast({ title: "Proiecte șterse!", description: "Proiectele selectate au fost eliminate.", variant: "destructive" });
    }
    setSelectedProjects([]);
  };

  const handleDropProject = (e, newStatus) => {
    e.preventDefault();
    const projectId = e.dataTransfer.getData("projectId");
    if (!projectId) return;

    setProjects(projects.map(proj => {
      if (proj.id === projectId) {
        return { ...proj, status: newStatus };
      }
      return proj;
    }));
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };
  
  const currentProjects = showArchived ? archivedProjects : projects;

  const sortedProjects = [...projects].sort((a, b) => {
    if (a.isPinned && !b.isPinned) return -1;
    if (!a.isPinned && b.isPinned) return 1;
    return 0;
  });

  const filteredProjects = sortedProjects
    .filter(project => 
      project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (project.tags && project.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))) ||
      (project.owner && project.owner.toLowerCase().includes(searchTerm.toLowerCase()))
    );

  const projectsByStatus = statuses.reduce((acc, status) => {
    acc[status] = filteredProjects.filter(p => p.status === status);
    return acc;
  }, {});

  const projectsByPriority = priorities.reduce((acc, priority) => {
    acc[priority] = filteredProjects.filter(p => p.priority === priority);
    return acc;
  }, {});

  const projectsByOwner = teamMembers.reduce((acc, member) => {
    acc[member.name] = filteredProjects.filter(p => p.owner === member.name);
    return acc;
  }, {});
  
  const projectsByType = types.reduce((acc, type) => {
    acc[type] = filteredProjects.filter(p => p.type === type);
    return acc;
  }, {});

  const getFilteredAndGroupedProjects = () => {
    switch(groupBy) {
      case 'status':
        return projectsByStatus;
      case 'priority':
        return projectsByPriority;
      case 'owner':
        return projectsByOwner;
      case 'type':
        return projectsByType;
      default:
        const pinned = filteredProjects.filter(p => p.isPinned);
        const unpinned = filteredProjects.filter(p => !p.isPinned);
        return { 'Toate Proiectele': [...pinned, ...unpinned] };
    }
  };

// ... (codul de până la `return`)

// ... (codul de până la `return`)

return (
  <div className="font-sans antialiased text-zinc-900 dark:text-zinc-100 bg-gray-50 dark:bg-zinc-900 min-h-screen p-4 sm:p-8">
    <style>{`
      .animate-slideIn {
        animation: slideIn 0.5s ease-out forwards;
      }
      @keyframes slideIn {
        from { transform: translateX(100%); }
        to { transform: translateX(0); }
      }
    `}</style>
    
    <header className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
      <div className="flex flex-col sm:flex-row gap-4 items-center text-sm font-medium text-zinc-600 dark:text-zinc-400">
        <div className="flex gap-2 items-center">
          <span>Vizualizare:</span>
          <button 
              onClick={() => setViewMode('grid')} 
              className={`p-2 rounded-lg transition-colors duration-200 ${viewMode === 'grid' ? 'bg-zinc-200 dark:bg-zinc-700 text-blue-600' : 'hover:bg-zinc-100 dark:hover:bg-zinc-800'}`}>
              Grid
          </button>
          <button 
              onClick={() => setViewMode('kanban')} 
              className={`p-2 rounded-lg transition-colors duration-200 ${viewMode === 'kanban' ? 'bg-zinc-200 dark:bg-zinc-700 text-blue-600' : 'hover:bg-zinc-100 dark:hover:bg-zinc-800'}`}>
              Kanban
          </button>
        </div>
        <div className="flex gap-2 items-center">
          <span>Grupează după:</span>
          <select
              value={groupBy}
              onChange={(e) => setGroupBy(e.target.value)}
              className="p-2 border rounded-lg bg-white dark:bg-zinc-800 dark:border-zinc-700"
          >
              <option value="none">Niciuna</option>
              <option value="status">Status</option>
              <option value="priority">Prioritate</option>
              <option value="owner">Owner</option>
              <option value="type">Tip Proiect</option>
          </select>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowArchived(!showArchived)}
            className={`p-2 rounded-lg transition-colors duration-200 ${showArchived ? 'bg-red-200 dark:bg-red-800 text-red-600' : 'hover:bg-zinc-100 dark:hover:bg-zinc-800'}`}
          >
            {showArchived ? 'Vezi Proiecte Active' : 'Vezi Proiecte Arhivate'}
          </button>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          <input
              type="text"
              placeholder="Caută proiecte..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 min-w-[200px] border rounded-full p-2 bg-white dark:bg-zinc-800 dark:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
          />
          <button
            onClick={() => setCreateDialogOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-full transition-colors duration-200 shadow-md flex items-center gap-2"
          >
            <PlusIcon />
            Proiect Nou
          </button>
      </div>
    </header>
    
    {showBulkActions && (
      <div className="bg-white dark:bg-zinc-800 p-4 rounded-xl shadow-md mb-6 flex items-center gap-4">
        <span className="font-medium">{selectedProjects.length} proiecte selectate</span>
        <button onClick={showArchived ? handleBulkDelete : handleBulkArchive} className="bg-red-500 hover:bg-red-600 text-white font-medium py-1 px-3 rounded-lg text-sm">
          {showArchived ? 'Șterge definitiv' : 'Arhivează'}
        </button>
        <button onClick={() => setSelectedProjects([])} className="border border-zinc-300 dark:border-zinc-600 text-zinc-600 dark:text-zinc-300 font-medium py-1 px-3 rounded-lg text-sm">
          Anulează
        </button>
      </div>
    )}

    {/* Conținutul principal unificat */}
    {currentProjects.length === 0 ? (
      <div className="text-center text-zinc-500 dark:text-zinc-400 mt-16">
        <FolderOpenIcon />
        <p className="text-xl mt-4">Nu există proiecte încă.</p>
        <p>Începe prin a crea unul!</p>
      </div>
    ) : showArchived ? (
      // Vizualizare proiecte arhivate
      <div className="space-y-8 mt-8">
        {archivedProjects.length > 0 ? (
          archivedProjects.map(folder => (
            <div key={folder.id}>
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <FolderOpenIcon />{folder.name} ({folder.projects.length})
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {folder.projects.map(project => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    onEdit={handleEdit}
                    onDelete={handleUnarchiveProject}
                    onDuplicate={handleDuplicate}
                    onTogglePin={handleTogglePin}
                    onSelect={handleSelectProject}
                    isSelected={selectedProjects.includes(project.id)}
                    showCheckbox={true}
                    teamMembers={teamMembers}
                  />
                ))}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-zinc-500 dark:text-zinc-400 mt-16">
            <p className="text-xl mt-4">Nu există proiecte în arhivă.</p>
          </div>
        )}
      </div>
    ) : (
      // Vizualizare proiecte active
      <>
        {viewMode === 'grid' && (
          <div className="space-y-8">
            {Object.entries(getFilteredAndGroupedProjects()).map(([group, projectsInGroup]) => {
              const projects = Array.isArray(projectsInGroup) ? projectsInGroup : [];
              return (
                <div key={group}>
                  <h2 className="text-xl font-bold mb-4">{group} ({projects.length})</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projects.map(project => (
                      <ProjectCard
                        key={project.id}
                        project={project}
                        onEdit={handleEdit}
                        onDelete={handleArchiveProject}
                        onDuplicate={handleDuplicate}
                        onTogglePin={handleTogglePin}
                        onSelect={handleSelectProject}
                        isSelected={selectedProjects.includes(project.id)}
                        showCheckbox={true}
                        teamMembers={teamMembers}
                      />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
        
        {viewMode === 'kanban' && (
          <div className="flex flex-col sm:flex-row gap-6 overflow-x-auto pb-4">
            {statuses.filter(s => s !== 'Archived').map(status => {
              const projectsForColumn = filteredProjects.filter(p => p.status === status);
              return (
                <KanbanColumn
                  key={status}
                  title={status}
                  status={status}
                  projects={projectsForColumn}
                  onEdit={handleEdit}
                  onDelete={handleArchiveProject}
                  onDuplicate={handleDuplicate}
                  onTogglePin={handleTogglePin}
                  onSelect={handleSelectProject}
                  selectedProjects={selectedProjects}
                  teamMembers={teamMembers}
                  onDropProject={handleDropProject}
                  onDragOver={handleDragOver}
                />
              );
            })}
          </div>
        )}
      </>
    )}

    {/* Dialog pentru creare */}
    <Dialog isOpen={isCreateDialogOpen} onClose={() => setCreateDialogOpen(false)} title="Creează un Proiect Nou">
      <form onSubmit={(e) => { e.preventDefault(); handleCreateProject(); }}>
        <div className="flex flex-col gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="new-project-name" className="text-right">Nume Proiect</label>
            <input
              id="new-project-name"
              value={newProject.name}
              onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
              className="col-span-3 border rounded-md p-2 bg-zinc-100 dark:bg-zinc-700 dark:border-zinc-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="new-project-desc" className="text-right">Descriere</label>
            <input
              id="new-project-desc"
              value={newProject.description}
              onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
              className="col-span-3 border rounded-md p-2 bg-zinc-100 dark:bg-zinc-700 dark:border-zinc-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="new-project-owner" className="text-right">Owner</label>
            <input
              id="new-project-owner"
              value={newProject.owner}
              onChange={(e) => setNewProject({ ...newProject, owner: e.target.value })}
              className="col-span-3 border rounded-md p-2 bg-zinc-100 dark:bg-zinc-700 dark:border-zinc-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="new-project-deadline" className="text-right">Deadline</label>
            <input
              id="new-project-deadline"
              type="date"
              value={newProject.deadline}
              onChange={(e) => setNewProject({ ...newProject, deadline: e.target.value })}
              className="col-span-3 border rounded-md p-2 bg-zinc-100 dark:bg-zinc-700 dark:border-zinc-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="new-project-status" className="text-right">Status</label>
            <select
              id="new-project-status"
              value={newProject.status}
              onChange={(e) => setNewProject({ ...newProject, status: e.target.value })}
              className="col-span-3 border rounded-md p-2 bg-zinc-100 dark:bg-zinc-700 dark:border-zinc-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Active">Activ</option>
              <option value="In Progress">În curs</option>
              <option value="On Hold">În așteptare</option>
              <option value="Completed">Finalizat</option>
              <option value="Archived">Arhivat</option>
            </select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="new-project-priority" className="text-right">Prioritate</label>
            <select
              id="new-project-priority"
              value={newProject.priority}
              onChange={(e) => setNewProject({ ...newProject, priority: e.target.value })}
              className="col-span-3 border rounded-md p-2 bg-zinc-100 dark:bg-zinc-700 dark:border-zinc-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Low">Joasă</option>
              <option value="Medium">Medie</option>
              <option value="High">Înaltă</option>
              <option value="Critical">Critică</option>
            </select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="new-project-methodology" className="text-right">Metodologie</label>
            <select
              id="new-project-methodology"
              value={newProject.methodology}
              onChange={(e) => setNewProject({ ...newProject, methodology: e.target.value })}
              className="col-span-3 border rounded-md p-2 bg-zinc-100 dark:bg-zinc-700 dark:border-zinc-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Scrum">Scrum</option>
              <option value="Kanban">Kanban</option>
              <option value="Waterfall">Waterfall</option>
            </select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="new-project-type" className="text-right">Tip Proiect</label>
            <select
              id="new-project-type"
              value={newProject.type}
              onChange={(e) => setNewProject({ ...newProject, type: e.target.value })}
              className="col-span-3 border rounded-md p-2 bg-zinc-100 dark:bg-zinc-700 dark:border-zinc-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="internal">Intern</option>
              <option value="external">Extern</option>
              <option value="research">Cercetare</option>
              <option value="feature development">Dezvoltare funcționalități</option>
            </select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="new-project-progress" className="text-right">Progres (%)</label>
            <input
              id="new-project-progress"
              type="number"
              min="0"
              max="100"
              value={newProject.progress}
              onChange={(e) => setNewProject({ ...newProject, progress: parseInt(e.target.value, 10) })}
              className="col-span-3 border rounded-md p-2 bg-zinc-100 dark:bg-zinc-700 dark:border-zinc-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="new-project-tags" className="text-right">Tag-uri</label>
            <input
              id="new-project-tags"
              placeholder="Ex: frontend, backend"
              value={newProject.tags}
              onChange={(e) => setNewProject({ ...newProject, tags: e.target.value })}
              className="col-span-3 border rounded-md p-2 bg-zinc-100 dark:bg-zinc-700 dark:border-zinc-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="new-project-repo" className="text-right">Repo URL</label>
            <input
              id="new-project-repo"
              type="url"
              value={newProject.repo}
              onChange={(e) => setNewProject({ ...newProject, repo: e.target.value })}
              className="col-span-3 border rounded-md p-2 bg-zinc-100 dark:bg-zinc-700 dark:border-zinc-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="new-project-icon" className="text-right">Icon URL</label>
            <input
              id="new-project-icon"
              type="url"
              value={newProject.icon}
              onChange={(e) => setNewProject({ ...newProject, icon: e.target.value })}
              className="col-span-3 border rounded-md p-2 bg-zinc-100 dark:bg-zinc-700 dark:border-zinc-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        <div className="flex justify-end pt-4 border-t border-zinc-200 dark:border-zinc-700">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 disabled:bg-blue-400 disabled:cursor-not-allowed"
          >
            Creează Proiect
          </button>
        </div>
      </form>
    </Dialog>

    {/* Dialog pentru editare */}
    <Dialog isOpen={isEditDialogOpen} onClose={() => setEditDialogOpen(false)} title={`Editează Proiect: ${editProject?.name}`}>
      {editProject && (
        <form onSubmit={(e) => { e.preventDefault(); handleUpdateProject(); }}>
          <div className="flex flex-col gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="edit-project-name" className="text-right">Nume</label>
              <input
                id="edit-project-name"
                value={editProject.name}
                onChange={(e) => setEditProject({ ...editProject, name: e.target.value })}
                className="col-span-3 border rounded-md p-2 bg-zinc-100 dark:bg-zinc-700 dark:border-zinc-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="edit-project-desc" className="text-right">Descriere</label>
              <input
                id="edit-project-desc"
                value={editProject.description}
                onChange={(e) => setEditProject({ ...editProject, description: e.target.value })}
                className="col-span-3 border rounded-md p-2 bg-zinc-100 dark:bg-zinc-700 dark:border-zinc-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="edit-project-owner" className="text-right">Owner</label>
              <input
                id="edit-project-owner"
                value={editProject.owner}
                onChange={(e) => setEditProject({ ...editProject, owner: e.target.value })}
                className="col-span-3 border rounded-md p-2 bg-zinc-100 dark:bg-zinc-700 dark:border-zinc-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="edit-project-deadline" className="text-right">Deadline</label>
              <input
                id="edit-project-deadline"
                type="date"
                value={editProject.deadline}
                onChange={(e) => setEditProject({ ...editProject, deadline: e.target.value })}
                className="col-span-3 border rounded-md p-2 bg-zinc-100 dark:bg-zinc-700 dark:border-zinc-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="edit-project-status" className="text-right">Status</label>
              <select
                id="edit-project-status"
                value={editProject.status}
                onChange={(e) => setEditProject({ ...editProject, status: e.target.value })}
                className="col-span-3 border rounded-md p-2 bg-zinc-100 dark:bg-zinc-700 dark:border-zinc-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Active">Activ</option>
                <option value="In Progress">În curs</option>
                <option value="On Hold">În așteptare</option>
                <option value="Completed">Finalizat</option>
                <option value="Archived">Arhivat</option>
              </select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="edit-project-priority" className="text-right">Prioritate</label>
              <select
                id="edit-project-priority"
                value={editProject.priority}
                onChange={(e) => setEditProject({ ...editProject, priority: e.target.value })}
                className="col-span-3 border rounded-md p-2 bg-zinc-100 dark:bg-zinc-700 dark:border-zinc-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Low">Joasă</option>
                <option value="Medium">Medie</option>
                <option value="High">Înaltă</option>
                <option value="Critical">Critică</option>
              </select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="edit-project-methodology" className="text-right">Metodologie</label>
              <select
                id="edit-project-methodology"
                value={editProject.methodology}
                onChange={(e) => setEditProject({ ...editProject, methodology: e.target.value })}
                className="col-span-3 border rounded-md p-2 bg-zinc-100 dark:bg-zinc-700 dark:border-zinc-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Scrum">Scrum</option>
                <option value="Kanban">Kanban</option>
                <option value="Waterfall">Waterfall</option>
              </select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="edit-project-type" className="text-right">Tip Proiect</label>
              <select
                id="edit-project-type"
                value={editProject.type}
                onChange={(e) => setEditProject({ ...editProject, type: e.target.value })}
                className="col-span-3 border rounded-md p-2 bg-zinc-100 dark:bg-zinc-700 dark:border-zinc-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="internal">Intern</option>
                <option value="external">Extern</option>
                <option value="research">Cercetare</option>
                <option value="feature development">Dezvoltare funcționalități</option>
              </select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="edit-project-progress" className="text-right">Progres (%)</label>
              <input
                id="edit-project-progress"
                type="number"
                min="0"
                max="100"
                value={editProject.progress}
                onChange={(e) => setEditProject({ ...editProject, progress: parseInt(e.target.value, 10) })}
                className="col-span-3 border rounded-md p-2 bg-zinc-100 dark:bg-zinc-700 dark:border-zinc-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="edit-project-tags" className="text-right">Tag-uri</label>
              <input
                id="edit-project-tags"
                placeholder="Ex: frontend, backend"
                value={editProject.tags}
                onChange={(e) => setEditProject({ ...editProject, tags: e.target.value })}
                className="col-span-3 border rounded-md p-2 bg-zinc-100 dark:bg-zinc-700 dark:border-zinc-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="edit-project-repo" className="text-right">Repo URL</label>
              <input
                id="edit-project-repo"
                type="url"
                value={editProject.repo || ''}
                onChange={(e) => setEditProject({ ...editProject, repo: e.target.value })}
                className="col-span-3 border rounded-md p-2 bg-zinc-100 dark:bg-zinc-700 dark:border-zinc-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="edit-project-icon" className="text-right">Icon URL</label>
              <input
                id="edit-project-icon"
                type="url"
                value={editProject.icon || ''}
                onChange={(e) => setEditProject({ ...editProject, icon: e.target.value })}
                className="col-span-3 border rounded-md p-2 bg-zinc-100 dark:bg-zinc-700 dark:border-zinc-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <div className="flex justify-end pt-4 border-t border-zinc-200 dark:border-zinc-700">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 disabled:bg-blue-400 disabled:cursor-not-allowed"
            >
              Salvează
            </button>
          </div>
        </form>
      )}
    </Dialog>

    {/* Dialog pentru duplicare */}
    <Dialog isOpen={isDuplicateDialogOpen} onClose={() => setDuplicateDialogOpen(false)} title={`Duplică Proiect: ${projectToDuplicate?.name}`}>
      <form onSubmit={(e) => { e.preventDefault(); handleDuplicateProject(); }}>
        <div className="flex flex-col gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="duplicate-project-name" className="text-right">Nume Nou</label>
            <input
              id="duplicate-project-name"
              value={duplicateName}
              onChange={(e) => setDuplicateName(e.target.value)}
              className="col-span-3 border rounded-md p-2 bg-zinc-100 dark:bg-zinc-700 dark:border-zinc-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        </div>
        <div className="flex justify-end pt-4 border-t border-zinc-200 dark:border-zinc-700">
          <button
            type="submit"
            disabled={!duplicateName}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 disabled:bg-blue-400 disabled:cursor-not-allowed"
          >
            Duplică Proiect
          </button>
        </div>
      </form>
    </Dialog>

      {/* Dialog pentru arhivare în folder */}
      <Dialog isOpen={isArchiveDialogOpen} onClose={() => setArchiveDialogOpen(false)} title="Arhivează Proiecte">
        <form onSubmit={(e) => { e.preventDefault(); handleConfirmArchive(); }}>
          <div className="flex flex-col gap-4 py-4">
            <p>
              Vei arhiva {selectedProjects.length} proiecte. Te rugăm să le dai un nume de folder.
            </p>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="archive-folder-name" className="text-right">Nume folder</label>
              <input
                id="archive-folder-name"
                value={archiveFolderName}
                onChange={(e) => setArchiveFolderName(e.target.value)}
                className="col-span-3 border rounded-md p-2 bg-zinc-100 dark:bg-zinc-700 dark:border-zinc-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>
          <div className="flex justify-end pt-4 border-t border-zinc-200 dark:border-zinc-700">
            <button
              type="submit"
              disabled={!archiveFolderName}
              className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 disabled:bg-red-400 disabled:cursor-not-allowed"
            >
              Confirmă Arhivare
            </button>
          </div>
        </form>
      </Dialog>
      
      {/* Vizualizare proiecte arhivate */}
      {showArchived && (
        <div className="space-y-8 mt-8">
          {archivedProjects.length > 0 ? (
            archivedProjects.map(folder => (
              <div key={folder.id}>
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <FolderOpenIcon />{folder.name} ({folder.projects.length})
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {folder.projects.map(project => (
                    <ProjectCard
                      key={project.id}
                      project={project}
                      onEdit={handleEdit}
                      onDelete={handleUnarchiveProject} // Acțiune de dezarhivare pentru proiectele arhivate
                      onDuplicate={handleDuplicate}
                      onTogglePin={handleTogglePin}
                      onSelect={handleSelectProject}
                      isSelected={selectedProjects.includes(project.id)}
                      showCheckbox={true}
                      teamMembers={teamMembers}
                    />
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center text-zinc-500 dark:text-zinc-400 mt-16">
              <p className="text-xl mt-4">Nu există proiecte în arhivă.</p>
            </div>
          )}
        </div>
      )}

      {/* Randerul principal al proiectelor (activ) */}
      {!showArchived && (
        <>
          {viewMode === 'grid' && (
            <div className="space-y-8">
              {Object.entries(getFilteredAndGroupedProjects()).map(([group, projectsInGroup]) => {
  // Type assertion pentru a spune TypeScript că projectsInGroup este un array de proiecte
  const projects = projectsInGroup as any[];
  
  return (
    <div key={group}>
      <h2 className="text-xl font-bold mb-4">{group} ({projects.length})</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.isArray(projects) && projects.map(project => (
          <ProjectCard
            key={project.id}
            project={project}
            onEdit={handleEdit}
            onDelete={handleArchiveProject}
            onDuplicate={handleDuplicate}
            onTogglePin={handleTogglePin}
            onSelect={handleSelectProject}
            isSelected={selectedProjects.includes(project.id)}
            showCheckbox={true}
            teamMembers={teamMembers}
          />
        ))}
      </div>
    </div>
  );
})}
            </div>
          )}
          {viewMode === 'kanban' && (
            <div className="flex flex-col sm:flex-row gap-6 overflow-x-auto pb-4">
              {statuses.filter(s => s !== 'Archived').map(status => {
                const projectsForColumn = filteredProjects.filter(p => p.status === status);
                return (
                  <KanbanColumn
                    key={status}
                    title={status}
                    status={status}
                    projects={projectsForColumn}
                    onEdit={handleEdit}
                    onDelete={handleArchiveProject}
                    onDuplicate={handleDuplicate}
                    onTogglePin={handleTogglePin}
                    onSelect={handleSelectProject}
                    selectedProjects={selectedProjects}
                    teamMembers={teamMembers}
                    onDropProject={handleDropProject}
                    onDragOver={handleDragOver}
                  />
                );
              })}
            </div>
          )}
        </>
      )}
      
      <ToastContainer toasts={toasts} />
    </div>
  );
}
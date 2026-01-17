import { ExternalLink, Code2, FolderGit2 } from "lucide-react";
import { useState, useEffect } from "react";
import api from "../services/api";

const Projects = () => {
  const [projects, setProjects] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await api.get('/getAllProfiles');
        // Safely accessing projects from the first profile returned
        const projectData = res?.data?.profile[0]?.projects || [];
        setProjects(projectData);
      } catch (err) {
        console.error("Error fetching projects:", err);
        setProjects([]);
      }
    };
    fetchProjects();
  }, []);

  if (!projects) {
    return (
      <div className="flex flex-col justify-center items-center min-h-[300px] gap-4">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
        <p className="text-slate-500 font-mono text-sm animate-pulse">Scanning Repositories...</p>
      </div>
    );
  }

  return (
    <div className="py-12 px-4 max-w-6xl mx-auto relative">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-10 border-l-4 border-blue-600 pl-4">
        <div>
          <h2 className="text-3xl font-black text-white tracking-tight">Project Modules</h2>
          <p className="text-slate-500 text-sm mt-1 font-mono uppercase tracking-widest">Active Deployments</p>
        </div>
        <div className="flex flex-col items-end">
          <span className="px-3 py-1 bg-slate-800 border border-slate-700 text-blue-400 text-[10px] font-black rounded-md uppercase tracking-tighter">
            {projects.length} Nodes Loaded
          </span>
        </div>
      </div>

      {projects.length === 0 ? (
        <div className="text-center py-20 bg-slate-900/50 rounded-3xl border-2 border-dashed border-slate-800">
          <FolderGit2 className="mx-auto text-slate-700 mb-4" size={48} />
          <p className="text-slate-500 text-lg font-medium italic">No projects detected in the current stream.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((p, i) => (
            <div 
              key={i} 
              className="group relative bg-slate-900/40 backdrop-blur-sm rounded-2xl border border-slate-800 p-8 hover:border-blue-500/50 hover:bg-slate-900/60 transition-all duration-300 shadow-xl"
            >
              {/* Corner Accent */}
              <div className="absolute top-0 right-0 p-2 opacity-20 group-hover:opacity-100 transition-opacity">
                <Code2 size={20} className="text-blue-500" />
              </div>

              <div className="mb-4">
                <h4 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">
                  {p.title}
                </h4>
              </div>
              
              <p className="text-slate-400 leading-relaxed mb-8 text-sm line-clamp-3 min-h-[60px]">
                {p.description}
              </p>

              <div className="pt-4 border-t border-slate-800/50">
                <a 
                  href={p.links} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.15em] text-blue-500 hover:text-white transition-all group/link"
                >
                  Execute Launch
                  <ExternalLink size={14} className="group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform" />
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Projects;
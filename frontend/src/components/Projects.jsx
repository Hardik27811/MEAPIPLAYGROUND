import { ExternalLink } from "lucide-react"; // Optional: adding an icon for the link
import { useState , useEffect } from "react";
import api  from "../services/api";
const Projects = () => {

    const [projects, setProjects] = useState(null);
    
      useEffect(() => {
         const fetch = async ()=>{
            const res = await api.get('/getAllProfiles');
            // console.log(res.data.profile[0].projects);
            
            setProjects(res?.data?.profile[0]?.projects)
            
         }
         fetch();
      }, []);
    
      if (!projects) {
        return (
          <div className="flex justify-center items-center min-h-[200px]">
            <p className="text-gray-500 animate-pulse font-medium">Loading projects...</p>
          </div>
        );
      }
    
  return (
    <div className="py-12 px-4 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold text-gray-900">Featured Projects</h2>
        <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-bold rounded-full uppercase">
          {projects.length} Total
        </span>
      </div>

      {projects.length === 0 ? (
        <div className="text-center py-20 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
          <p className="text-gray-500 text-lg italic">No projects found in this collection.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((p, i) => (
            <div 
              key={i} 
              className="group bg-white rounded-xl border border-gray-200 p-6 shadow-sm "
            >
              <div className="mb-4">
                <h4 className="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors">
                  {p.title}
                </h4>
              </div>
              
              <p className="text-gray-600 leading-relaxed mb-6 line-clamp-3">
                {p.description}
              </p>

              <a 
                href={p.links} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-800 transition-colors"
              >
                View Project
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Projects;
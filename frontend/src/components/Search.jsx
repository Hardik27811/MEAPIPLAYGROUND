import { useState } from "react";
import { getProjectsBySkill } from "../services/api";
import { Search as SearchIcon, Terminal } from "lucide-react";

const Search = ({ setProjects }) => {
  const [skill, setSkill] = useState("");

  const handleSearch = async (targetSkill = skill) => {
    const query = targetSkill.trim();
    if (!query) return;
    
    try {
      const data = await getProjectsBySkill(query);
      setProjects(data);
    } catch (err) {
      console.error("Search failed:", err);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };


  const handleTagClick = (tag) => {
    setSkill(tag);
    handleSearch(tag); 
  };

  return (
    <div className="max-w-2xl mx-auto my-8 px-4 relative z-10">
      <div className="relative flex flex-col md:flex-row gap-3">
        <div className="relative flex-grow">
   
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500">
            <SearchIcon size={18} />
          </div>
          
          <input
            type="text"
            placeholder="Query skill database (React, Node, Python...)"
            value={skill}
            onChange={(e) => setSkill(e.target.value)}
            onKeyDown={handleKeyDown}
            className="block w-full pl-12 pr-4 py-3.5 bg-slate-900/50 border border-slate-700 rounded-2xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all shadow-2xl backdrop-blur-sm"
          />
        </div>

        <button
          onClick={() => handleSearch()}
          className="inline-flex justify-center items-center px-8 py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-2xl transition-all shadow-lg shadow-blue-900/20 active:scale-95 gap-2"
        >
          <Terminal size={18} />
          Execute
        </button>
      </div>
      
  
      <div className="mt-4 flex items-center gap-3 overflow-x-auto pb-2 scrollbar-hide">
        <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest whitespace-nowrap">
          Quick Filters:
        </span>
        {['React', 'Node', 'Python', 'Tailwind', 'MongoDB'].map((tag) => (
          <button
            key={tag}
            onClick={() => handleTagClick(tag)}
            className="text-[11px] font-bold px-3 py-1 bg-slate-800/50 hover:bg-blue-600/20 text-slate-400 hover:text-blue-400 border border-slate-700 hover:border-blue-500/50 rounded-lg transition-all whitespace-nowrap"
          >
            {tag}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Search;
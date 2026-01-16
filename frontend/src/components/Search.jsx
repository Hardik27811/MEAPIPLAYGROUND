import { useState } from "react";
import { getProjectsBySkill } from "../services/api";
import { Search as SearchIcon } from "lucide-react"; // Optional icon

const Search = ({ setProjects }) => {
  const [skill, setSkill] = useState("");

  const handleSearch = async () => {
    // Basic validation to prevent empty searches
    if (!skill.trim()) return;
    
    const data = await getProjectsBySkill(skill);
    setProjects(data);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="max-w-2xl mx-auto my-8 px-4">
      <div className="relative flex flex-col md:flex-row gap-3">
        <div className="relative flex-grow">
          {/* Search Icon */}
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          
          <input
            type="text"
            placeholder="Search by skill (e.g. React, Node, Tailwind...)"
            value={skill}
            onChange={(e) => setSkill(e.target.value)}
            onKeyDown={handleKeyDown}
            className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-all shadow-sm"
          />
        </div>

        <button
          onClick={handleSearch}
          className="inline-flex justify-center items-center px-6 py-3 border border-transparent text-sm font-semibold rounded-xl text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors shadow-md active:scale-95"
        >
          Search
        </button>
      </div>
      
      {/* Quick Suggestion Tags */}
      <div className="mt-3 flex gap-2 overflow-x-auto pb-2">
        {['React', 'Node', 'Python'].map((tag) => (
          <button
            key={tag}
            onClick={() => setSkill(tag)}
            className="text-xs font-medium px-2 py-1 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-md transition-colors"
          >
            {tag}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Search;
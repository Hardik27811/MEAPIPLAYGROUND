import { useState } from "react";
import Profile from "../components/Profile";
import Projects from "../components/Projects";
import Search from "../components/Search";
import { useNavigate } from "react-router-dom";

function Landing() {
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50/50">
      {/* Navigation Bar */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-blue-200 shadow-lg">
              <span className="text-white font-bold text-sm">M</span>
            </div>
            <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600">
              Me-API Playground
            </h1>
          </div>
          
          <button 
            className="inline-flex items-center px-5 py-2 bg-gray-900 text-white text-sm font-semibold rounded-full hover:bg-gray-800 transition-all hover:shadow-lg active:scale-95" 
            onClick={() => navigate('/myProfile')}
          >
            My Profile
          </button>
        </div>
      </nav>

    
      <main className="max-w-6xl mx-auto px-4 py-10 space-y-16">
        

        <section className="relative">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight">Explore Projects</h2>
            <p className="mt-2 text-gray-500">Search for specific expertise to see relevant work examples.</p>
          </div>
          <Search setProjects={setProjects} />
        </section>


        <section className="animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-px flex-grow bg-gray-200"></div>
            <span className="text-gray-400 text-sm font-medium uppercase tracking-widest">About Me</span>
            <div className="h-px flex-grow bg-gray-200"></div>
          </div>
          <Profile />
        </section>


        <section className="pb-20">
          <Projects projects={projects} />
        </section>
      </main>

  
      <footer className="border-t border-gray-200 bg-white py-8">
        <div className="text-center text-gray-400 text-sm">
          &copy; {new Date().getFullYear()} Me-API Playground. Built with React & Tailwind.
        </div>
      </footer>
    </div>
  );
}

export default Landing;
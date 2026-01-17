import { useState } from "react";
import Profile from "../components/Profile";
import Projects from "../components/Projects";
import Search from "../components/Search";
import { useNavigate } from "react-router-dom";
import { Layout, User, Code2, Rocket } from "lucide-react";

function Landing() {
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-200 selection:bg-blue-500/30">

      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-[20%] w-[40%] h-[40%] bg-blue-600/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-[20%] w-[40%] h-[40%] bg-indigo-600/5 rounded-full blur-[120px]" />
      </div>


      <nav className="sticky top-0 z-50 bg-[#0f172a]/80 backdrop-blur-xl border-b border-slate-800">
        <div className="max-w-6xl mx-auto px-4 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-500 rounded-xl flex items-center justify-center shadow-lg shadow-blue-900/20 transform -rotate-3">
              <Code2 className="text-white" size={24} />
            </div>
            <h1 className="text-xl font-black tracking-tight text-white uppercase">
              Me-API <span className="text-blue-500">Playground</span>
            </h1>
          </div>
          
          <button 
            className="group flex items-center gap-2 px-6 py-2.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white text-sm font-bold rounded-xl transition-all active:scale-95" 
            onClick={() => navigate('/myProfile')}
          >
            <User size={18} className="text-blue-400" />
            My Profile
          </button>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-4 py-12 space-y-24 relative">
        
 
        <section className="relative pt-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-widest mb-4">
              <Rocket size={14} />
              v1.0.4 Terminal
            </div>
            <h2 className="text-5xl font-black text-white tracking-tighter mb-4">
              Explore <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">Repositories</span>
            </h2>
            <p className="max-w-xl mx-auto text-slate-400 font-medium">
              Query the database by technology stack to view specific project deployments and documentation.
            </p>
          </div>
          <Search setProjects={setProjects} />
        </section>


        <section className="animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <div className="flex items-center gap-6 mb-10">
            <h3 className="text-xs font-black text-slate-500 uppercase tracking-[0.3em] whitespace-nowrap">Identity Node</h3>
            <div className="h-px w-full bg-gradient-to-r from-slate-800 to-transparent"></div>
          </div>
         
          <Profile />
        </section>


        <section className="pb-24">
          <div className="flex items-center gap-6 mb-10">
            <h3 className="text-xs font-black text-slate-500 uppercase tracking-[0.3em] whitespace-nowrap">Output Stream</h3>
            <div className="h-px w-full bg-gradient-to-r from-slate-800 to-transparent"></div>
          </div>
          <Projects projects={projects} />
        </section>
      </main>


      <footer className="border-t border-slate-800 bg-[#0b1222] py-12">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2 text-slate-500">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-xs font-mono tracking-widest uppercase">System Status: Operational</span>
          </div>
          <div className="text-slate-500 text-xs font-mono">
            &copy; {new Date().getFullYear()} ME-API_PLAYGROUND.SYS
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Landing;
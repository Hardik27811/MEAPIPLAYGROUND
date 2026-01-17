import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';
import { Logout } from "../services/api";
import { Mail, GraduationCap, Layout, LogOut, ArrowLeft, Terminal, ShieldCheck } from 'lucide-react';
import { useAuth } from "../context/AuthContext";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get('/myProfile');
        setProfile(res.data.profile || null);
      } catch (err) {
        console.log("No profile found, using auth data");
        setProfile(null);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);


  const displayUser = {
    name: profile?.User?.name || user?.name,
    email: profile?.User?.email || user?.email,
  };

  const handleLogout = async () => {
    try {
      await Logout();
      navigate('/login');
    } catch (err) {
      console.error("Logout failed", err);
    }
  };


  if (loading && !user) {
    return (
      <div className="min-h-screen bg-[#0f172a] flex flex-col justify-center items-center gap-4">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        <p className="text-slate-500 font-mono text-xs uppercase tracking-widest">Decrypting Profile...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f172a] py-12 px-4 relative overflow-hidden selection:bg-blue-500/30">
      {/* Background Glows */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-600/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-600/5 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-xl mx-auto relative">
        {/* Back Button */}
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-8 group"
        >
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-xs font-black uppercase tracking-[0.2em]">
            Back to Dashboard
          </span>
        </button>

        <div className="bg-slate-900/50 backdrop-blur-xl rounded-3xl border border-slate-800 shadow-2xl overflow-hidden">

          {/* 🔹 Header */}
          <div className="p-8 border-b border-slate-800 flex flex-col items-center text-center">
            <div className="relative mb-6">
              <div className="w-28 h-28 bg-gradient-to-tr from-blue-600 to-indigo-500 p-1 rounded-3xl rotate-3 shadow-xl shadow-blue-900/20">
                <div className="w-full h-full bg-slate-900 rounded-[22px] flex items-center justify-center text-4xl font-black text-white -rotate-3">
                  {displayUser?.name?.charAt(0)?.toUpperCase()}
                </div>
              </div>
              <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-green-500 border-4 border-slate-900 rounded-full flex items-center justify-center">
                <ShieldCheck size={14} className="text-white" />
              </div>
            </div>

            <h2 className="text-3xl font-black text-white tracking-tight mb-2 uppercase">
              {displayUser?.name || "Access Denied"}
            </h2>

            <div className="inline-flex items-center gap-2 text-slate-400 bg-slate-800/50 px-4 py-1.5 rounded-full text-xs font-bold border border-slate-700/50">
              <Mail size={14} className="text-blue-400" />
              {displayUser?.email || "unknown@system.local"}
            </div>
          </div>

       
          <div className="p-8 space-y-10">


            {profile?.education && (
              <div className="group">
                <div className="flex items-center gap-3 mb-4">
                  <GraduationCap size={18} className="text-blue-500" />
                  <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">
                    Academic Registry
                  </span>
                </div>
                <p className="text-slate-200 text-lg font-bold pl-7 border-l-2 border-slate-800 group-hover:border-blue-500 transition-colors">
                  {profile.education}
                </p>
              </div>
            )}

            {/* Skills */}
            {Array.isArray(profile?.skills) && profile.skills.length > 0 && (
              <div>
                <div className="flex items-center gap-3 mb-5">
                  <Layout size={18} className="text-indigo-400" />
                  <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">
                    Technical Modules
                  </span>
                </div>
                <div className="flex flex-wrap gap-2 pl-7">
                  {profile.skills.map((skill, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-blue-500/10 border border-blue-500/20 text-blue-400 rounded-md text-[11px] font-black uppercase tracking-wider hover:bg-blue-500/20 transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

   
            {!profile?.education && !profile?.skills && (
              <div className="p-4 bg-yellow-500/5 border border-yellow-500/20 rounded-2xl text-center">
                <p className="text-yellow-500/80 text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2">
                   Initializing identity profile required 
                </p>
              </div>
            )}
          </div>

          
          <div className="p-8 bg-slate-950/30 flex flex-col md:flex-row gap-4">
            <button
              onClick={() => navigate('/')}
              className="flex-1 py-4 bg-slate-800 hover:bg-slate-700 text-white rounded-2xl font-black text-xs uppercase tracking-widest transition-all active:scale-95 flex items-center justify-center gap-2 border border-slate-700"
            >
              <Terminal size={18} className="text-blue-400" />
              Console
            </button>

            <button
              onClick={handleLogout}
              className="flex-1 py-4 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white border border-red-500/20 rounded-2xl font-black text-xs uppercase tracking-widest transition-all active:scale-95 flex items-center justify-center gap-2"
            >
              <LogOut size={18} />
              Kill Session
            </button>
          </div>
        </div>

        <div className="mt-8 flex justify-center items-center gap-4 text-slate-600">
           <div className="h-px w-8 bg-slate-800"></div>
           <p className="text-[10px] uppercase font-mono tracking-[0.3em]">
             System.Secure_Connection::v1.0.4
           </p>
           <div className="h-px w-8 bg-slate-800"></div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
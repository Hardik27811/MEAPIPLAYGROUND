import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';
import { Logout } from "../services/api";
import { User, Mail, GraduationCap, Layout, LogOut, ArrowLeft } from 'lucide-react';

const Profile = () => {
    const [profile, setProfile] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await api.get('/myProfile');
                setProfile(res.data.profile);
            } catch (err) {
                console.log(err);
            }
        };
        fetchProfile();
    }, []);

    const handleLogout = async () => {
        try {
            await Logout();
            navigate('/login');
        } catch (err) {
            console.error("Logout failed", err);
        }
    }

    if (!profile) return (
        <div className="min-h-screen bg-[#0f172a] flex justify-center items-center">
            <div className="flex flex-col items-center gap-4">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                <p className="text-slate-400 font-mono text-sm animate-pulse">Syncing Profile...</p>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-[#0f172a] py-12 px-4 relative overflow-hidden">
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
                    <span className="text-sm font-bold uppercase tracking-widest">Back to Dashboard</span>
                </button>

                <div className="bg-slate-900/50 backdrop-blur-xl rounded-3xl border border-slate-800 shadow-2xl overflow-hidden">
                    {/* Profile Header section */}
                    <div className="p-8 border-b border-slate-800 flex flex-col items-center text-center">
                        <div className="relative mb-6">
                            <div className="w-28 h-28 bg-gradient-to-tr from-blue-600 to-indigo-500 p-1 rounded-3xl rotate-3 shadow-xl shadow-blue-900/20">
                                <div className="w-full h-full bg-slate-900 rounded-[22px] flex items-center justify-center text-4xl font-black text-white -rotate-3">
                                    {profile.User.name.charAt(0).toUpperCase()}
                                </div>
                            </div>
                            <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 border-4 border-slate-900 rounded-full shadow-lg shadow-green-900/20"></div>
                        </div>

                        <h2 className="text-3xl font-bold text-white mb-1">{profile.User.name}</h2>
                        <div className="flex items-center gap-2 text-slate-400 bg-slate-800/50 px-3 py-1 rounded-full text-xs font-medium">
                            <Mail size={14} />
                            {profile.User.email}
                        </div>
                    </div>

                    {/* Profile Details section */}
                    <div className="p-8 space-y-8">
                        {/* Education */}
                        <div className="group">
                            <div className="flex items-center gap-3 mb-3">
                                <GraduationCap size={18} className="text-blue-400" />
                                <span className="text-xs font-bold text-slate-500 uppercase tracking-[0.2em]">Academic Background</span>
                            </div>
                            <p className="text-slate-200 text-lg font-medium pl-7">
                                {profile?.education || "Not specified"}
                            </p>
                        </div>

                        {/* Skills - If you have them in your profile object */}
                        {profile?.skills && (
                            <div>
                                <div className="flex items-center gap-3 mb-4">
                                    <Layout size={18} className="text-indigo-400" />
                                    <span className="text-xs font-bold text-slate-500 uppercase tracking-[0.2em]">Core Competencies</span>
                                </div>
                                <div className="flex flex-wrap gap-2 pl-7">
                                    {profile.skills.map((skill, i) => (
                                        <span key={i} className="px-3 py-1 bg-blue-500/10 border border-blue-500/20 text-blue-400 rounded-lg text-xs font-bold uppercase tracking-wider">
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Actions section */}
                    <div className="p-8 bg-slate-950/30 flex flex-col md:flex-row gap-4">
                        <button 
                            onClick={() => navigate('/')}
                            className="flex-1 py-4 bg-slate-800 hover:bg-slate-700 text-white rounded-2xl font-bold text-sm transition-all active:scale-95 flex items-center justify-center gap-2"
                        >
                            <Layout size={18} />
                            Go to Console
                        </button>
                        
                        <button 
                            onClick={handleLogout}
                            className="flex-1 py-4 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white border border-red-500/20 rounded-2xl font-bold text-sm transition-all active:scale-95 flex items-center justify-center gap-2"
                        >
                            <LogOut size={18} />
                            Terminate Session
                        </button>
                    </div>
                </div>

                <p className="text-center text-slate-600 text-[10px] mt-8 uppercase tracking-[0.2em]">
                    User ID: {profile._id} • Secure Connection Active
                </p>
            </div>
        </div>
    );
}

export default Profile;
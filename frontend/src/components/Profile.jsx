import { useEffect, useState } from "react";
import { getProfile } from "../services/api";
import { User, Mail, GraduationCap, Briefcase, Globe, Code2 } from "lucide-react";

const Profile = () => {
    const [profiles, setProfiles] = useState(null);

    useEffect(() => {
        getProfile().then(setProfiles);
    }, []);

    if (!profiles) {
        return (
            <div className="flex flex-col justify-center items-center min-h-[400px] space-y-4">
                <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
                <p className="text-slate-500 font-mono text-sm animate-pulse">Fetching Identity Nodes...</p>
            </div>
        );
    }

    if (profiles.length === 0) {
        return (
            <div className="text-center py-20 bg-slate-900/50 rounded-3xl border border-slate-800 border-dashed">
                <p className="text-slate-500 italic">No profiles detected in the database.</p>
            </div>
        );
    }

    return (
        <div className="space-y-12">
            {profiles.map((profile) => (
                <div 
                    key={profile._id} 
                    className="max-w-2xl mx-auto bg-slate-900/50 backdrop-blur-xl rounded-3xl border border-slate-800 shadow-2xl overflow-hidden hover:border-slate-700 transition-colors group"
                >
                    <div className="p-8">
                   
                        <div className="flex items-start justify-between mb-8">
                            <div className="flex items-center gap-5">
                                <div className="w-16 h-16 bg-gradient-to-tr from-blue-600 to-indigo-500 rounded-2xl flex items-center justify-center text-2xl font-black text-white shadow-lg shadow-blue-900/20 transform group-hover:rotate-3 transition-transform">
                                    {profile?.User?.name?.charAt(0).toUpperCase()}
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-white group-hover:text-blue-400 transition-colors">
                                        {profile?.User?.name}
                                    </h2>
                                    <div className="flex items-center gap-2 text-slate-400 text-sm mt-1">
                                        <Mail size={14} />
                                        {profile?.User?.email}
                                    </div>
                                </div>
                            </div>
                            <div className="px-3 py-1 bg-green-500/10 border border-green-500/20 rounded-full">
                                <span className="text-[10px] font-bold text-green-500 uppercase tracking-widest">Active Node</span>
                            </div>
                        </div>

                  
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                   
                            <div className="space-y-6">
                                <div>
                                    <div className="flex items-center gap-2 mb-2 text-slate-500">
                                        <GraduationCap size={16} />
                                        <span className="text-[10px] font-black uppercase tracking-widest">Education</span>
                                    </div>
                                    <p className="text-slate-200 font-medium text-sm leading-relaxed">
                                        {profile?.education || "Not specified"}
                                    </p>
                                </div>

                                <div>
                                    <div className="flex items-center gap-2 mb-2 text-slate-500">
                                        <Briefcase size={16} />
                                        <span className="text-[10px] font-black uppercase tracking-widest">Experience</span>
                                    </div>
                                    <div className="space-y-2">
                                        {profile?.works?.map((work, i) => (
                                            <p key={i} className="text-slate-300 text-sm border-l-2 border-slate-800 pl-3">
                                                {work}
                                            </p>
                                        ))}
                                    </div>
                                </div>
                            </div>

                        
                            <div>
                                <div className="flex items-center gap-2 mb-3 text-slate-500">
                                    <Globe size={16} />
                                    <span className="text-[10px] font-black uppercase tracking-widest">Social Network</span>
                                </div>
                                <div className="flex flex-wrap gap-3">
                                    {profile.links && Object.keys(profile.links).map(key => (
                                        <a 
                                            key={key}
                                            href={profile.links[key]} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="px-3 py-1.5 bg-slate-800/50 hover:bg-blue-600/20 border border-slate-700 hover:border-blue-500/50 rounded-lg text-xs font-bold text-slate-400 hover:text-blue-400 transition-all flex items-center gap-2"
                                        >
                                            <span className="capitalize">{key}</span>
                                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                            </svg>
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>

               
                        <div className="pt-6 border-t border-slate-800">
                            <div className="flex items-center gap-2 mb-4 text-slate-500">
                                <Code2 size={16} />
                                <span className="text-[10px] font-black uppercase tracking-widest">Tech Stack</span>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {profile?.skills?.map((skill, i) => (
                                    <span
                                        key={i}
                                        className="px-3 py-1 bg-blue-500/10 text-blue-400 text-[11px] font-bold rounded-md border border-blue-500/20 uppercase tracking-wider"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Profile;
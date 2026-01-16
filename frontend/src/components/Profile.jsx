import { useEffect, useState } from "react";
import { getProfile } from "../services/api";

const Profile = () => {
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        getProfile().then(setProfile);
    }, []);

    if (!profile) {
        return (
            <div className="flex justify-center items-center min-h-[200px]">
                <p className="text-gray-500 animate-pulse font-medium">Loading profile...</p>
            </div>
        );
    }
    // console.log(profile);
    console.log();
    

    if (profile.length == 0) {
        return <h1>Loading...</h1>
    }
    
    return (

        <div>
            {profile.length > 0 && profile.map((profile) => {
                return (

                    <div key={profile._id} className="max-w-md mx-auto mt-10 bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                        <div className="p-8">
                            <h2 className="text-3xl font-extrabold text-gray-900 mb-1">Profile</h2>
                            <div className="h-1 w-12 bg-blue-500 rounded-full mb-6"></div>

                            <div className="mb-6">
                                <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">Name</span>
                                <p className="text-gray-700 text-lg mt-1 font-medium">{profile?.User?.name}</p>

                            </div>

                             <div className="mb-6">
                                <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">Email</span>
                                <p className="text-gray-700 text-lg mt-1 font-medium">{profile?.User?.email}</p>

                            </div>

                            <div className="mb-6">
                                <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">Education</span>
                                <p className="text-gray-700 text-lg mt-1 font-medium">{profile?.education}</p>
                            </div>

                            <div className="mb-6">
                                <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">Experience</span>
                                {profile?.works.map((work,i)=>{
                                    return(
                                    <p  key={i} className="text-gray-700 text-lg mt-1 font-medium">{work}</p>
                                    )
                                })}
                            </div>

                            <div className="mb-6">
                                <span className="text-xs font-semibold uppercase tracking-wider text-gray-400"> Social Links</span>
                                <ul>
                                    {Object.keys(profile.links).map(key =>(
                                        <li key={key}>
                                            <a 
                                                href={profile.links[key]} 
                                                target="_blank" 
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-800 transition-colors"
                                            >
                                                {key}
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                                </svg>
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            

                            <div>
                                <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Skills</h4>
                                <div className="flex flex-wrap gap-2">
                                    {profile?.skills && profile?.skills.map((skill, i) => (
                                        <span
                                            key={i}
                                            className="px-3 py-1 bg-blue-50 text-blue-600 text-sm font-medium rounded-full border border-blue-100 transition-hover hover:bg-blue-100"
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>
                                    

                            


                        </div>

                         
                    </div>

                )
            })}
        </div>
    );
};

export default Profile;
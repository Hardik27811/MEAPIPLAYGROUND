import axios from 'axios';

const api = axios.create({
    baseURL: 'https://meapiplayground-sfc7.onrender.com',
    withCredentials: true, 
});



export const getProfile = async () => {
    const res = await api.get('/getAllProfiles');
    return res.data.profile;
};

export const getProjectsBySkill = async (skill) => {
    const res = await api.get(`/projects/skill/${skill}`);
    return res.data;
};

export const searchProfile = async (query) => {
    const res = await api.get(`/search?q=${query}`);
    return res.data;
};

export const Logout = async ()=>{
    const res = await api.post('/auth/logout');
    return res.data;
}



export default api;
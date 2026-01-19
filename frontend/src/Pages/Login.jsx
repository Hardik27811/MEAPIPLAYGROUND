import React, { useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Lock, Mail, Terminal } from 'lucide-react'; 

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { checkAuth } = useAuth();

 const { setUser, setIsAuthenticated } = useAuth();


  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post('/auth/login', {
        email,
        password,
      });

      setUser(res.data.user);
      await checkAuth();
      navigate("/");
      

      
    } catch (error) {
      alert(error.response?.data?.message || 'Login failed');
    }
  };



  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f172a] px-4 selection:bg-blue-500/30">

      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-600/10 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-md w-full relative">

        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-tr from-blue-600 to-indigo-500 rounded-2xl shadow-xl shadow-blue-900/20 mb-4 transform -rotate-3">
             <span className="text-white font-mono text-2xl font-bold">ME</span>
          </div>
          <h2 className="text-3xl font-extrabold text-white tracking-tight">Console Access</h2>
          <p className="text-slate-400 mt-2 font-medium italic">Authenticate to manage your portfolio</p>
        </div>


        <div className="bg-slate-900/50 backdrop-blur-xl p-8 rounded-3xl border border-slate-800 shadow-2xl">
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">Identity</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500 group-focus-within:text-blue-500 transition-colors">
                  <Mail size={18} />
                </div>
                <input
                  type="email"
                  placeholder="developer@me-api.com"
                  className="w-full bg-slate-950/50 text-white pl-11 pr-4 py-3.5 rounded-xl border border-slate-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all placeholder:text-slate-600"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">Access Key</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500 group-focus-within:text-blue-500 transition-colors">
                  <Lock size={18} />
                </div>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full bg-slate-950/50 text-white pl-11 pr-4 py-3.5 rounded-xl border border-slate-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all placeholder:text-slate-600"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-blue-600/20 transition-all active:scale-[0.97] flex items-center justify-center gap-2 group"
            >
              <span>Initialize Session</span>
              <Terminal size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-slate-800 text-center">
            <p className="text-sm text-slate-400">
              New Developer?{' '}
              <button
                onClick={() => navigate('/register')}
                className="text-blue-400 font-bold hover:text-blue-300 transition-colors"
              >
                Create Account
              </button>
            </p>
          </div>
        </div>


        <p className="text-center text-slate-600 text-[10px] mt-8 uppercase tracking-[0.2em]">
          Secure API Playground v1.0.4
        </p>
      </div>
    </div>
  );
};

export default Login;
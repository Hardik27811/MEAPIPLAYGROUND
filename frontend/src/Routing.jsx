import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Landing from "./Pages/Landing";
import ProtectedRoutes from './components/ProtectedRoutes'
import MyProfile from './Pages/MyProfile'

const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={ <ProtectedRoutes > 
                                  <Landing/> 
                                  </ProtectedRoutes>}/>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/myprofile" element={<ProtectedRoutes>
                                        <MyProfile/>
                                        </ProtectedRoutes>}/>
    </Routes>
  );
};

export default Routing;

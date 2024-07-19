import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Layout from "./pages/Layout";
import Login from "./pages/login/Login";
import Profil from "./pages/profile/Profil";
import Home from "./pages/home/Home";

const App = () => <BrowserRouter>
  <Routes>
    <Route path="/" element={<Layout/>}>
      <Route index element={<Home/>}/>
      <Route path="login" element={<Login/>}/>
      <Route path="profile" element={<Profil/>}/>
      <Route path="*" element={<div>404</div>}/>
    </Route>
  </Routes>
</BrowserRouter>

export default App;

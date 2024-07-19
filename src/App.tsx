import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Layout from "./pages/Layout";
import SignIn from "./pages/signin/SignIn";
import User from "./pages/user/User";
import Home from "./pages/home/Home";

const App = () => <BrowserRouter>
  <Routes>
    <Route path="/" element={<Layout/>}>
      <Route index element={<Home/>}/>
      <Route path="sign-in" element={<SignIn/>}/>
      <Route path="user" element={<User/>}/>
      <Route path="*" element={<div>404</div>}/>
    </Route>
  </Routes>
</BrowserRouter>

export default App;

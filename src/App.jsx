import React from "react";
import { Routes, Route } from "react-router";
import Registration from "./pages/Registration";
import Login from "./pages/Login";
import Teacher from "./pages/Teacher";
import Student from "./pages/Student";
import PDF from "./pages/PDF";
import 'animate.css';
import Leave from "./pages/Leave";



const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Registration />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/login" element={<Login />} />
        <Route path="/teacher" element={<Teacher />} />
        <Route path="/student" element={<Student />} />
        <Route path="/pdf" element={<PDF />} />
        <Route path="/leave" element={<Leave />} />
      </Routes>
    </>
  );
};

export default App;



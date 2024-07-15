import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Navbar from "./components/Navbar";
import Form from "./pages/Form";
import Studenttable from "./pages/Studenttable";
import Coursesform from "./pages/Coursesform";
import Courses from "./components/Courses";


function App() {
  return (
    <Router>
      <div>
        <Navbar />

        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path ="/form" element ={<Form />} />
          <Route path = "/table" element ={<Studenttable/>} />
          <Route path = "/courses.form" element ={<Coursesform/>} />
          <Route path="/course" element={<Courses />} /> 
          
        </Routes>
        
      </div>
    </Router>
  );
}

export default App;

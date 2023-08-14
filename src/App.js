import React, { useEffect, useState } from "react";
import Login from "./Login/Login";
import ShowSubjects from "./Subjects/ShowSubjects";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import SubjectEdit from "./Subjects/SubjectEdit";
import ShowOneSubject from "./Subjects/ShowOneSubject";
import NewSubject from "./Subjects/NewSubject";
import HomePage from "./home/HomePage";
import ShowPressors from "./Professors/ShowProfessors";
import ProfessorEdit from "./Professors/ProfessorEdit";
import ShowOneProfessor from "./Professors/ShowOneProfessor";
import NewProfessor from "./Professors/NewProfessor";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("user");
    setIsLoggedIn(user);
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
    navigate("/home");
  };

  return (
    <>
      <Routes>
        <Route path="/login" element={isLoggedIn ? <Navigate to="/home" /> : <Login onLogin={handleLogin} />} />
        <Route path="/home" element={isLoggedIn ? <HomePage /> : <Navigate to="/login" />} />
        <Route path="/ShowSubjects" element={<ShowSubjects />} />
        <Route path="/ShowSubjects/edit_subject/:id" element={<SubjectEdit />} />
        <Route path="/ShowSubjects/show_one_subject/:id" element={<ShowOneSubject />} />
        <Route path="/ShowSubjects/new_subject" element={<NewSubject />} />
        <Route path="/ShowProfessors" element={<ShowPressors />}></Route>
        <Route path="/ShowProfessors/update_professors/:id" element={<ProfessorEdit />} />
        <Route path="/ShowProfessors/infoProfessor/:id" element={<ShowOneProfessor />} />
        <Route path="/ShowProfessors/new_professor" element={<NewProfessor />}></Route>
      </Routes>
    </>
  );
}

export default App;

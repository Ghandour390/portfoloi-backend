import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from "./compennets/admin/login"
import NavBar from "./compennets/admin/navBar"
// import Profile from "./compennets/admin/profile"
// import Register from "./compennets/admin/register"
import HomePage from '../pages/home'
import SkillsPage from '../pages/skills'
import ProjectPage from '../pages/project'
import FormationPage from '../pages/formation'
import ExperiencePage from '../pages/experience'
import ContactPage from '../pages/contact'

function App() {
  return (
    <BrowserRouter>
  <div className="App bg-gradient-to-b from-[#191a1d] to-[#23232b] min-h-screen text-white pt-20">
        <NavBar />
        <Routes>
          {/* <Route path="/" element={<Navigate to="/login" replace />} /> */}
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<HomePage />} />
          {/* <Route path="/about" element={<AboutPage />} /> */}
          <Route path="/project" element={<ProjectPage />} />
          <Route path="/formation" element={<FormationPage />} />
          <Route path="/skills" element={<SkillsPage />} />
          <Route path="/experience" element={<ExperiencePage />} />
          <Route path="/contact" element={<ContactPage />} />
          {/* <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} /> */}
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App

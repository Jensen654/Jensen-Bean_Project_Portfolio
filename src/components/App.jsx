import { useState, useEffect } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
import "../blocks/App.css";
import Header from "./Header.jsx";
import { Route, Routes } from "react-router-dom";
import Home from "./Home.jsx";
import Projects from "./Projects.jsx";
import ContactMe from "./ContactMe.jsx";
import PageDataContext from "../contexts/PageDataContext.js";
import ProjectDataContext from "../contexts/ProjectDataContext.js";
import UserDataContext from "../contexts/UserDataContext.js";
import Footer from "./Footer.jsx";
import WebApplications from "./WebApplications";
import OtherProjects from "./OtherProjects";
import {
  getProjects,
  confirmUser,
  signUpUser,
  loginUser,
} from "../utils/api.js";
import SignUpModal from "./SignUpModal.jsx";
import LoginModal from "./LoginModal.jsx";
import Menu from "./Menu.jsx";

function App() {
  const [activeRoute, setActiveRoute] = useState("");
  const [activeSubRoute, setActiveSubRoute] = useState("");
  const [buttonPressed, setButtonPressed] = useState({});
  const [projects, setProjects] = useState([]);
  const [activeModal, setActiveModal] = useState("");
  const [currentUser, setCurrentUser] = useState({ name: "" });
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    confirmUser(token);
  }, []);

  const fetchProjects = async () => {
    try {
      const projects = await getProjects();
      setProjects(projects);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleCloseModal = () => {
    setActiveModal("");
  };

  const handleSignUp = (event, name, email, password) => {
    event.preventDefault();
    setCurrentUser({ name: name });
    signUpUser({ name, email, password })
      .then((token) => {
        localStorage.setItem("jwt", token);
        handleCloseModal();
        console.log(token);
      })
      .catch((err) => {
        localStorage.removeItem("jwt");
        console.error(err);
        setCurrentUser({ name: "" });
      });
  };

  const handleLogin = (event, email, password) => {
    event.preventDefault();
    loginUser(email, password)
      .then((token) => {
        localStorage.setItem("jwt", token);
        handleCloseModal();
      })
      .catch((err) => {
        localStorage.removeItem("jwt");
        console.error(err);
        setCurrentUser({ name: "" });
      });
  };

  return (
    <UserDataContext.Provider value={{ currentUser }}>
      <ProjectDataContext.Provider value={{ projects }}>
        <PageDataContext.Provider
          value={{
            activeRoute,
            setActiveRoute,
            activeSubRoute,
            setActiveSubRoute,
            buttonPressed,
            setButtonPressed,
            activeModal,
            setActiveModal,
            setMenuOpen,
            menuOpen,
          }}
        >
          <div className="page">
            <Header />
            <Menu />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="projects" element={<Projects />}>
                <Route path="web-applications" element={<WebApplications />} />
                <Route path="other-projects" element={<OtherProjects />} />
              </Route>
              <Route path="contactMe" element={<ContactMe />} />
            </Routes>
          </div>
          <Footer />
          {/* {activeModal === "signUp" && ( */}
          <SignUpModal
            handleCloseModal={handleCloseModal}
            handleSubmit={handleSignUp}
          />
          {/* )} */}
          {/* {activeModal === "logIn" && ( */}
          <LoginModal
            handleCloseModal={handleCloseModal}
            handleSubmit={handleLogin}
          />
          {/* )} */}
        </PageDataContext.Provider>
      </ProjectDataContext.Provider>
    </UserDataContext.Provider>
  );
}

export default App;

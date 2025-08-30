import { useState } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
import "../blocks/App.css";
import Header from "./Header.jsx";
import { Route, Routes } from "react-router-dom";
import Home from "./Home.jsx";
import Projects from "./Projects.jsx";
import ContactMe from "./ContactMe.jsx";
import PageDataContext from "../contexts/PageDataContext.js";
import Footer from "./Footer.jsx";
import WebApplications from "./WebApplications";
import OtherProjects from "./OtherProjects";

function App() {
  const [activeRoute, setActiveRoute] = useState("");
  const [activeSubRoute, setActiveSubRoute] = useState("");
  const [buttonPressed, setButtonPressed] = useState({});

  return (
    <PageDataContext.Provider
      value={{
        activeRoute,
        setActiveRoute,
        activeSubRoute,
        setActiveSubRoute,
        buttonPressed,
        setButtonPressed,
      }}
    >
      <div className="page">
        <Header />
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
    </PageDataContext.Provider>
  );
}

export default App;

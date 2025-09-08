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
  getUploadUrl,
  uploadPhoto,
  updateUserInfo,
} from "../utils/api.js";
import SignUpModal from "./SignUpModal.jsx";
import LoginModal from "./LoginModal.jsx";
import EditProfileModal from "./EditProfileModal.jsx";
import AddProjectModal from "./AddProjectModal.jsx";
import Menu from "./Menu.jsx";
import { acceptedImageTypes } from "../utils/constants.js";

function App() {
  const [activeRoute, setActiveRoute] = useState("");
  const [activeSubRoute, setActiveSubRoute] = useState("");
  const [buttonPressed, setButtonPressed] = useState({});
  const [projects, setProjects] = useState([]);
  const [activeModal, setActiveModal] = useState("");
  const [currentUser, setCurrentUser] = useState({
    name: "",
    avatar: "",
    profession: "",
    about: "",
    resume: "",
  });
  const [menuOpen, setMenuOpen] = useState(false);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [newAvatarUrl, setNewAvatarUrl] = useState("");

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      confirmUser(jwt)
        .then((user) => {
          setIsUserLoggedIn(true);
          setCurrentUser({
            name: user.name,
            avatar: user.avatar,
            profession: user.profession,
            about: user.about,
            resume: user.resumeUrl,
          });
        })
        .catch((err) => {
          console.error("Error checking token:", err);
          // localStorage.removeItem("jwt");
        });
    }
  }, []);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const projects = await getProjects();
      setProjects(projects);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCloseModal = () => {
    setActiveModal("");
  };

  const handleSignUp = ({ name, email, password }) => {
    setCurrentUser({
      name: user.name,
      avatar: user.avatar,
      profession: user.profession,
      about: user.about,
      resume: user.resumeUrl,
    });
    signUpUser({ name, email, password })
      .then(({ token }) => {
        localStorage.setItem("jwt", token);
        handleCloseModal();
        setIsUserLoggedIn(true);
        // console.log(token);
      })
      .catch((err) => {
        console.error(err);
        setCurrentUser({
          name: "",
          avatar: "",
          profession: "",
          about: "",
          resume: "",
        });
      });
  };

  const handleLogin = ({ email, password }) => {
    loginUser({ email, password })
      .then((token) => {
        setIsUserLoggedIn(true);
        localStorage.setItem("jwt", token.token);
        handleCloseModal();
      })
      .catch(console.error);
  };

  const handleLogOut = () => {
    localStorage.removeItem("jwt");
    setIsUserLoggedIn(false);
    setCurrentUser({
      name: "",
      avatar: "",
      profession: "",
      about: "",
      resume: "",
    });
    setMenuOpen(false);
  };

  const handleUpload = async (file) => {
    if (file.size > 3 * 1024 * 1024) {
      // 3MB limit
      alert("Either your file is too big or not the right type!");
      return;
    }

    const { uploadUrl, key } = await getUploadUrl();

    setNewAvatarUrl(
      `https://myimagedatabasejensenbean.s3.us-east-2.amazonaws.com/${key}`
    );

    return await uploadPhoto(file, uploadUrl).catch((err) => {
      console.error("Error uploading file:", err);
      setNewAvatarUrl("");
    });
  };

  const handleUpdateUserInfo = ({
    name,
    avatar,
    email,
    profession,
    resume,
    about,
  }) => {
    const token = localStorage.getItem("jwt");
    updateUserInfo({ name, avatar, email, profession, resume, about }, token)
      .then((updatedUser) => {
        setCurrentUser({
          name: updatedUser.newDoc.name,
          avatar: updatedUser.newDoc.avatar,
          profession: updatedUser.newDoc.profession,
          about: updatedUser.newDoc.about,
          resume: updatedUser.newDoc.resumeUrl,
        });
        handleCloseModal();
      })
      .catch(console.error);
  };

  return (
    <UserDataContext.Provider
      value={{ currentUser, isUserLoggedIn, newAvatarUrl }}
    >
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
            <Menu handleLogOut={handleLogOut} />
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
          <SignUpModal
            handleCloseModal={handleCloseModal}
            handleSubmit={handleSignUp}
          />
          <LoginModal
            handleCloseModal={handleCloseModal}
            handleSubmit={handleLogin}
          />
          <EditProfileModal
            handleUpload={handleUpload}
            handleSubmit={handleUpdateUserInfo}
            handleCloseModal={handleCloseModal}
          />
          <AddProjectModal handleCloseModal={handleCloseModal} />
        </PageDataContext.Provider>
      </ProjectDataContext.Provider>
    </UserDataContext.Provider>
  );
}

export default App;

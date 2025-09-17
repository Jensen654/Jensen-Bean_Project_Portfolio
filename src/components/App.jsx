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
import TechProjects from "./TechProjects.jsx";
import OtherProjects from "./OtherProjects";
import {
  getProjects,
  confirmUser,
  signUpUser,
  loginUser,
  getUploadUrl,
  uploadPhoto,
  updateUserInfo,
  getDeleteUrl,
  deletePhoto,
  addProject,
  deleteProject,
  deleteUserProfile,
} from "../utils/api.js";
import SignUpModal from "./SignUpModal.jsx";
import LoginModal from "./LoginModal.jsx";
import EditProfileModal from "./EditProfileModal.jsx";
import AddProjectModal from "./AddProjectModal.jsx";
import AreYouSureModal from "./AreYouSureModal.jsx";
import Menu from "./Menu.jsx";
import { acceptedImageTypes } from "../utils/constants.js";
import PerformanceProjects from "./PerformanceProjects.jsx";
import { DefaultProjects } from "../utils/constants.js";

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
    id: "",
  });
  const [menuOpen, setMenuOpen] = useState(false);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [selectedProject, setSelectedProject] = useState("");

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
        });
    }
  }, []);

  useEffect(() => {
    if (currentUser.name.length > 0) fetchProjects(localStorage.getItem("jwt"));
  }, [currentUser]);

  const fetchProjects = async (userId) => {
    try {
      const projects = await getProjects(userId);

      setProjects(projects);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const subRoutes = projects.map((project) => project.type);
    const defaultSubRoutes = DefaultProjects.map((project) => project.type);

    if (subRoutes.length > 0) {
      setActiveSubRoute(`${subRoutes[0]}-projects`);
    } else {
      setActiveSubRoute(`${defaultSubRoutes[0]}-projects`);
    }
  }, [projects]);

  const handleCloseModal = () => {
    setActiveModal("");
  };

  const handleSignUp = ({ name, email, password }) => {
    signUpUser({ name, email, password })
      .then(({ userData, token }) => {
        console.log(userData);
        localStorage.setItem("jwt", token);
        handleCloseModal();
        setIsUserLoggedIn(true);
        setCurrentUser({
          name: userData.name,
          avatar: userData.avatar,
          profession: userData.profession,
          about: userData.about,
          resume: userData.resumeUrl,
        });
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleLogin = ({ email, password }) => {
    loginUser({ email, password })
      .then(({ token, user }) => {
        setIsUserLoggedIn(true);
        localStorage.setItem("jwt", token);
        handleCloseModal();

        setCurrentUser({
          name: user.name,
          avatar: user.avatar,
          profession: user.profession,
          about: user.about,
          resume: user.resumeUrl,
        });
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
    setProjects([]);
    setMenuOpen(false);
  };

  const handleUploadAvatar = async (file) => {
    if (currentUser.avatar.length > 0 || currentUser.avatar.length === 0) {
      handleDeletePhoto();
    }
    if (file?.size > 3 * 1024 * 1024) {
      alert("Either your file is too big or not the right type!");
      return;
    }

    const { uploadUrl, key } = await getUploadUrl();
    const newAvatarUrl = `https://myimagedatabasejensenbean.s3.us-east-2.amazonaws.com/${key}`;

    await uploadPhoto(file, uploadUrl).catch((err) => {
      console.error("Error uploading file:", err);
    });

    return newAvatarUrl;
  };

  const handleUploadProjectImage = async (file) => {
    if (file?.size > 3 * 1024 * 1024) {
      alert("Either your file is too big or not the right type!");
      return;
    }

    const { uploadUrl, key } = await getUploadUrl();
    const newProjectImageUrl = `https://myimagedatabasejensenbean.s3.us-east-2.amazonaws.com/${key}`;

    await uploadPhoto(file, uploadUrl).catch((err) => {
      console.error("Error uploading file:", err);
    });

    return newProjectImageUrl;
  };

  const handleDeletePhoto = async () => {
    const { deleteUrl } = await getDeleteUrl(
      encodeURIComponent(currentUser.avatar)
    );

    await deletePhoto(deleteUrl).catch((err) => {
      console.error("Error deleting file:", err);
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

  const handleProjectSubmit = async ({
    type,
    title,
    description,
    url,
    videoUrl,
    image,
  }) => {
    const token = localStorage.getItem("jwt");
    await addProject(
      { type, title, description, url, videoUrl, image },
      token
    ).then(({ project }) => {
      handleCloseModal();

      setProjects((prev) => [...prev, project]);
    });
  };

  const handleDeleteProject = async ({ projectId, pictureUrl }) => {
    if (pictureUrl) {
      const { deleteUrl } = await getDeleteUrl(pictureUrl);
      await deletePhoto(deleteUrl)
        .then((res) => {
          if (res.ok) {
            deleteProject({ token: localStorage.getItem("jwt"), projectId })
              .then(() => {
                setProjects(projects.filter((p) => p._id !== projectId));
                handleCloseModal();
              })
              .catch(() => console.error);
          }
        })
        .catch(() => console.error);
    } else {
      await deleteProject({ token: localStorage.getItem("jwt"), projectId })
        .then(() => {
          setProjects(projects.filter((p) => p._id !== projectId));
          handleCloseModal();
        })
        .catch(() => console.error);
    }
  };

  const handleDeleteProfile = async (userId) => {
    await deleteUserProfile({ userId, token: localStorage.getItem("jwt") });
  };

  return (
    <UserDataContext.Provider value={{ currentUser, isUserLoggedIn }}>
      <ProjectDataContext.Provider
        value={{
          projects,
          selectedProject,
          setSelectedProject,
          handleDeleteProject,
        }}
      >
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
            handleCloseModal,
          }}
        >
          <div className="page">
            <Header />
            <Menu handleLogOut={handleLogOut} />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="projects" element={<Projects />}>
                <Route path="tech-projects" element={<TechProjects />} />
                <Route
                  path="performance-projects"
                  element={<PerformanceProjects />}
                />
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
            handleUploadAvatar={handleUploadAvatar}
            handleSubmit={handleUpdateUserInfo}
            handleCloseModal={handleCloseModal}
          />
          <AddProjectModal
            handleCloseModal={handleCloseModal}
            handleSubmit={handleProjectSubmit}
            handleUploadProjectImage={handleUploadProjectImage}
          />
          <AreYouSureModal
            isOpen={activeModal === "are-you-sure"}
            handleCloseModal={handleCloseModal}
          />
        </PageDataContext.Provider>
      </ProjectDataContext.Provider>
    </UserDataContext.Provider>
  );
}

export default App;

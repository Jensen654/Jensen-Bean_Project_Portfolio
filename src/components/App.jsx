import { useState, useEffect, use } from "react";
import "../blocks/App.css";
import Header from "./Header.jsx";
import {
  Navigate,
  useNavigate,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import Home from "./Home.jsx";
import Projects from "./Projects.jsx";
import ContactMe from "./ContactMe.jsx";
import PageDataContext from "../contexts/PageDataContext.js";
import ProjectDataContext from "../contexts/ProjectDataContext.js";
import UserDataContext from "../contexts/UserDataContext.js";
import PublicDataContext from "../contexts/PublicDataContext.js";
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
  getPublicUser,
  getPublicProjects,
  updateProject,
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
import EditProjectModal from "./EditProjectModal.jsx";
import ErrorNotFound from "./ErrorNotFound.jsx";

function App() {
  const [activeRoute, setActiveRoute] = useState("");
  const [activeSubRoute, setActiveSubRoute] = useState("");
  const [buttonPressed, setButtonPressed] = useState({});
  const [projects, setProjects] = useState([]);
  const [activeModal, setActiveModal] = useState("");
  const [currentUser, setCurrentUser] = useState({
    name: "",
    userName: "",
    avatar: "",
    profession: "",
    about: "",
    resume: "",
    id: "",
  });
  const [publicUser, setPublicUser] = useState({
    name: "",
    userName: "",
    avatar: "",
    profession: "",
    about: "",
    resume: "",
    id: "",
  });
  const [menuOpen, setMenuOpen] = useState(false);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [selectedProject, setSelectedProject] = useState({});
  const [showContactMeInfo, setShowContactMeInfo] = useState(
    publicUser.showContactMe
  );
  const [isOwner, setIsOwner] = useState(false);
  const [publicUserName, setPublicUserName] = useState("");
  const [errorNotFound, setErrorNotFound] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingImage, setLoadingImage] = useState(false);
  const [additionalAreYouSureText, setAdditionalAreYouSureText] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname.includes("contactMe")) {
      navigate(location.pathname.replace("contactMe", ""));
    }
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      confirmUser(jwt)
        .then((user) => {
          setIsUserLoggedIn(true);

          setCurrentUser({
            name: user.name,
            userName: user.userName,
            avatar: user.avatar,
            profession: user.profession,
            about: user.about,
            resume: user.resumeUrl,
            email: user.email,
            phoneNumber: user.phoneNumber,
            showContactMe: user.showContactMe,
          });
        })
        .catch((err) => {
          console.error("Error checking token:", err);
        });
    }
  }, []);

  useEffect(() => {
    if (publicUserName?.length > 0 && publicUserName !== "undefined") {
      getPublicUser({ userName: publicUserName })
        .then((user) => {
          setErrorNotFound(false);
          setPublicUser({
            name: user.name,
            userName: user.userName,
            avatar: user.avatar,
            profession: user.profession,
            about: user.about,
            resume: user.resumeUrl,
            email: user.email,
            phoneNumber: user.phoneNumber,
            showContactMe: user.showContactMe,
          });
        })
        .catch((err) => {
          // if (err.message === "User not found") {
          setErrorNotFound(true);
          // }
        });
    }
  }, [publicUserName]);

  useEffect(() => {
    if (publicUserName?.length > 0 && publicUserName !== "undefined")
      fetchProjects();
    setShowContactMeInfo(publicUser.showContactMe);
    setIsOwner(publicUserName == currentUser.userName);
  }, [currentUser, publicUser]);

  useEffect(() => {
    if (
      window.location.pathname === "/" ||
      window.location.pathname === `/${publicUserName}/`
    ) {
      setActiveRoute("home");
    } else if (window.location.pathname.includes("/projects")) {
      setActiveRoute("projects");
    } else if (window.location.pathname === "/contactMe") {
      setActiveRoute("contactMe");
    }
  });

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

  const fetchProjects = async () => {
    try {
      const projects = await getPublicProjects({ userName: publicUserName });

      setProjects(projects);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSignUp = ({ name, userName, email, password }) => {
    setLoading(true);
    signUpUser({ name, userName, email, password })
      .then(({ userData, token }) => {
        console.log(userData);
        localStorage.setItem("jwt", token);
        handleCloseModal();
        setIsUserLoggedIn(true);
        setCurrentUser({
          name: userData.name,
          userName: userData.userName,
          avatar: userData.avatar,
          profession: userData.profession,
          about: userData.about,
          resume: userData.resumeUrl,
          email: userData.email,
          phoneNumber: userData.phoneNumber,
          showContactMe: userData.showContactMe,
        });
        setPublicUser({
          name: userData.name,
          userName: userData.userName,
          avatar: userData.avatar,
          profession: userData.profession,
          about: userData.about,
          resume: userData.resumeUrl,
          email: userData.email,
          phoneNumber: userData.phoneNumber,
          showContactMe: userData.showContactMe,
        });
        // let newPath;
        // if (location.pathname.includes("undefined")) {
        //   newPath = location.pathname.replace("undefined", userData.userName);
        // } else {
        //   newPath = location.pathname.concat(userData.userName);
        // }
        navigate(userData.userName);
      })
      .catch((err) => {
        console.error(err);
        alert(err.message);
      })
      .finally(() => setLoading(false));
  };

  const handleLogin = ({ email, password }) => {
    setLoading(true);
    loginUser({ email, password })
      .then(({ token, user }) => {
        setIsUserLoggedIn(true);
        localStorage.setItem("jwt", token);
        handleCloseModal();

        setCurrentUser({
          name: user.name,
          userName: user.userName,
          avatar: user.avatar,
          profession: user.profession,
          about: user.about,
          resume: user.resumeUrl,
          email: user.email,
          phoneNumber: user.phoneNumber,
          showContactMe: user.showContactMe,
        });
        setPublicUser({
          name: user.name,
          userName: user.userName,
          avatar: user.avatar,
          profession: user.profession,
          about: user.about,
          resume: user.resumeUrl,
          email: user.email,
          phoneNumber: user.phoneNumber,
          showContactMe: user.showContactMe,
        });

        let newPath;
        if (location.pathname.includes("undefined")) {
          newPath = location.pathname.replace("undefined", user.userName);
        } else if (location.pathname.length < 2) {
          newPath = location.pathname.concat(user.userName);
        } else if (location.pathname.includes(user.userName)) {
          newPath = location.pathname.replace(user.userName, user.userName);
        }
        navigate(newPath);
      })
      .catch((err) => {
        alert(err.message);
      })
      .finally(() => setLoading(false));
  };

  const handleLogOut = () => {
    localStorage.removeItem("jwt");
    setIsUserLoggedIn(false);
    setCurrentUser({
      name: "",
      userName: "",
      avatar: "",
      profession: "",
      about: "",
      resume: "",
      email: "",
      phoneNumber: "",
    });
    setProjects([]);
    setMenuOpen(false);
  };

  const handleUploadAvatar = async (file) => {
    setLoadingImage(true);
    if (currentUser?.avatar?.length > 0 || currentUser?.avatar?.length === 0) {
      handleDeletePhoto();
    }
    if (file?.size > 3 * 1024 * 1024) {
      alert("Either your file is too big or not the right type!");
      return;
    }

    const { uploadUrl, key } = await getUploadUrl();
    const newAvatarUrl = `https://myimagedatabasejensenbean.s3.us-east-2.amazonaws.com/${key}`;

    await uploadPhoto(file, uploadUrl)
      .catch((err) => {
        console.error("Error uploading file:", err);
      })
      .finally(() => setLoadingImage(false));

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
      console.error("Error deleting file: ", err);
    });
  };

  const handleDeleteProjectPhoto = async (projectImage) => {
    const { deleteUrl } = await getDeleteUrl(encodeURIComponent(projectImage));

    await deletePhoto(deleteUrl).catch((err) => {
      console.error("Error deleting file: ", err);
    });
  };

  const handleUpdateUserInfo = ({
    name,
    avatar,
    email,
    profession,
    phoneNumber,
    showContactMe,
    resume,
    about,
  }) => {
    setLoading(true);
    const token = localStorage.getItem("jwt");
    updateUserInfo(
      {
        name,
        avatar,
        phoneNumber,
        showContactMe,
        email,
        profession,
        resume,
        about,
      },
      token
    )
      .then(({ newDoc }) => {
        setCurrentUser({
          name: newDoc.name,
          avatar: newDoc.avatar,
          profession: newDoc.profession,
          about: newDoc.about,
          resume: newDoc.resumeUrl,
          phoneNumber: newDoc.phoneNumber,
          showContactMe: newDoc.showContactMe,
          email: newDoc.email,
          userName: newDoc.userName,
        });
        setPublicUser({
          name: newDoc.name,
          avatar: newDoc.avatar,
          profession: newDoc.profession,
          about: newDoc.about,
          resume: newDoc.resumeUrl,
          phoneNumber: newDoc.phoneNumber,
          showContactMe: newDoc.showContactMe,
          email: newDoc.email,
          userName: newDoc.userName,
        });
        handleCloseModal();
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  const handleProjectSubmit = async ({
    type,
    title,
    description,
    url,
    videoUrl,
    image,
  }) => {
    setLoading(true);
    const token = localStorage.getItem("jwt");
    await addProject({ type, title, description, url, videoUrl, image }, token)
      .then(({ project }) => {
        handleCloseModal();

        setProjects((prev) => [...prev, project]);
      })
      .catch((err) => alert(err.message))
      .finally(() => setLoading(false));
  };

  const handleDeleteProject = async ({ projectId, pictureUrl }) => {
    console.log(pictureUrl);

    if (pictureUrl) {
      const { deleteUrl } = await getDeleteUrl(encodeURIComponent(pictureUrl));
      await deletePhoto(deleteUrl)
        .then(() => {
          deleteProject({ token: localStorage.getItem("jwt"), projectId })
            .then(() => {
              setProjects(projects.filter((p) => p._id !== projectId));
              handleCloseModal();
            })
            .catch(() => console.error);
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
    const { deleteUrl } = await getDeleteUrl(
      encodeURIComponent(currentUser.avatar)
    );
    if (currentUser.avatar.length > 0) {
      await deletePhoto(deleteUrl)
        .then(() => {
          deleteUserProfile({
            userId,
            token: localStorage.getItem("jwt"),
          })
            .then(({ deletedUser }) => {
              handleCloseModal();
              alert(`Successfully deleted user: ${deletedUser}`);
              setCurrentUser({});
            })
            .catch(() => console.error);
        })
        .catch(() => console.error("Error Deleting Image"));
    } else {
      await deleteUserProfile({
        userId,
        token: localStorage.getItem("jwt"),
      })
        .then(({ deletedUser }) => {
          handleCloseModal();
          alert(`Successfully deleted user: ${deletedUser}`);
          setCurrentUser({});
        })
        .catch(() => console.error);
    }
    setMenuOpen(false);
  };

  const handleUpdateProject = async ({
    _id,
    type,
    title,
    description,
    url,
    videoUrl,
    image,
  }) => {
    const filteredProjects = projects.filter((p) => p._id !== _id);
    await updateProject(
      {
        _id,
        type,
        title,
        description,
        url,
        videoUrl,
        image,
      },
      localStorage.getItem("jwt")
    )
      .then((project) => {
        setProjects([...filteredProjects, project]);
        handleCloseModal();
      })
      .catch((err) => console.error(err));
  };

  return (
    <UserDataContext.Provider
      value={{ currentUser, isUserLoggedIn, showContactMeInfo, isOwner }}
    >
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
            loading,
            loadingImage,
            setAdditionalAreYouSureText,
          }}
        >
          <PublicDataContext.Provider
            value={{ publicUserName, setPublicUserName, isOwner, publicUser }}
          >
            <div className="page">
              {errorNotFound && <ErrorNotFound />}
              <Header />
              <Menu
                handleLogOut={handleLogOut}
                handleDeleteProfile={handleDeleteProfile}
              />
              <Routes>
                <Route path="/:userName" element={<Home />} />
                <Route path=":userName/projects" element={<Projects />}>
                  <Route path="tech-projects" element={<TechProjects />} />
                  <Route
                    path="performance-projects"
                    element={<PerformanceProjects />}
                  />
                  <Route path="other-projects" element={<OtherProjects />} />
                </Route>
                {showContactMeInfo && (
                  <Route path=":userName/contactMe" element={<ContactMe />} />
                )}
                <Route path="/" element={<Home />} />
              </Routes>
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
              <EditProjectModal
                handleCloseModal={handleCloseModal}
                handleUpdateProject={handleUpdateProject}
                handleUploadProjectImage={handleUploadProjectImage}
                handleDeletePhoto={handleDeleteProjectPhoto}
              />
              {/* <AreYouSureModal isOpen={activeModal === "are-you-sure"} /> */}
            </div>
          </PublicDataContext.Provider>
        </PageDataContext.Provider>
      </ProjectDataContext.Provider>
    </UserDataContext.Provider>
  );
}

export default App;

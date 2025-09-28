import "../blocks/Home.css";
import UserDataContext from "../contexts/UserDataContext";
import PageDataContext from "../contexts/PageDataContext";
import PublicDataContext from "../contexts/PublicDataContext";
import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";

const Home = () => {
  const { isUserLoggedIn } = useContext(UserDataContext);
  const { setActiveModal, loadingImage } = useContext(PageDataContext);
  const { setPublicUserName, publicUser, isOwner } =
    useContext(PublicDataContext);
  const { userName } = useParams();

  useEffect(() => {
    setPublicUserName(userName);
  }, [userName]);

  const handleEditProfileClick = () => {
    setActiveModal("editProfile");
  };

  return (
    <div className="home">
      {isUserLoggedIn && isOwner ? (
        <button
          className="home__edit-profile-button"
          onClick={handleEditProfileClick}
        >
          Edit Profile Info
        </button>
      ) : (
        <></>
      )}
      <section className="home__intro">
        <div className="home__intro-container">
          <h2 className="home__intro-hello home__intro-text">Hello.</h2>
          <h3 className="home__intro-name home__intro-text">
            I'm {publicUser.name.length > 0 ? publicUser.name : "Your Mom"},
          </h3>
          <h3 className="home__intro-title home__intro-text">
            {publicUser.profession || "A Silly Billy"}.
          </h3>
          {publicUser.resume && (
            <a
              href="https://docs.google.com/document/d/1ttmiTIirAoEtwlR0YB-zaiEdHdZxEVyyzoMn3SOeIjg/edit?usp=sharing"
              target="#"
              className="home__intro-button"
            >
              My Resume
            </a>
          )}
        </div>
        <img
          className={`home__intro-image ${
            loadingImage ? "loading-spinner" : ""
          }`}
          src={
            publicUser.avatar ||
            "https://img.freepik.com/premium-vector/vector-flat-illustration-grayscale-avatar-user-profile-person-icon-profile-picture-business-profile-woman-suitable-social-media-profiles-icons-screensavers-as-templatex9_719432-1351.jpg?semt=ais_hybrid&w=740&q=80"
          }
          alt={publicUser.name}
        />
      </section>
      <section className="home__about">
        <h1 className="home__about-title">About Me</h1>
        <div className="home__about-text">
          {(publicUser.about.length > 0
            ? publicUser.about
            : "This here could be about your beautiful face (˘ε˘˶ )"
          )
            .split(/\r?\n/)
            .map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
        </div>
      </section>
    </div>
  );
};

export default Home;

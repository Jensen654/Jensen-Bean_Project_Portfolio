import "../blocks/Home.css";
import UserDataContext from "../contexts/UserDataContext";
import PageDataContext from "../contexts/PageDataContext";
import { useContext } from "react";

const Home = () => {
  const { currentUser, isUserLoggedIn } = useContext(UserDataContext);
  const { setActiveModal } = useContext(PageDataContext);

  const handleEditProfileClick = () => {
    setActiveModal("editProfile");
  };

  return (
    <div className="home">
      {isUserLoggedIn && (
        <button
          className="home__edit-profile-button"
          onClick={handleEditProfileClick}
        >
          Edit Profile Info
        </button>
      )}
      <section className="home__intro">
        <div className="home__intro-container">
          <h2 className="home__intro-hello home__intro-text">Hello.</h2>
          <h3 className="home__intro-name home__intro-text">
            I'm {currentUser.name.length > 0 ? currentUser.name : "Your Mom"},
          </h3>
          <h3 className="home__intro-title home__intro-text">
            {currentUser.profession || "A Silly Billy"}.
          </h3>
          {currentUser.resume && (
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
          className="home__intro-image"
          // src="src/assets/JensenHeadshot.JPG"
          src={
            currentUser.avatar ||
            "https://img.freepik.com/premium-vector/vector-flat-illustration-grayscale-avatar-user-profile-person-icon-profile-picture-business-profile-woman-suitable-social-media-profiles-icons-screensavers-as-templatex9_719432-1351.jpg?semt=ais_hybrid&w=740&q=80"
          }
          alt={currentUser.name}
        />
      </section>
      <section className="home__about">
        <h1 className="home__about-title">About Me</h1>
        {/* <p className="home__about-text">
          Jensen's journey into tech began with his love of music. Jensen has
          been a musician since the age of 5 when his mother started teaching
          him to play piano. As he aged, he began learning new instruments, and
          eventually settled on the trumpet. He played the trumpet for years,
          learning to love the precision, collaboration, creativity, and
          dedication that came along with performing as part of a group. After
          Jensen began his higher education persuits, he was initially inspired
          to dip his toe into programming by a friend. Once he began, he
          realized that everything he loved about music was also true of
          programming. Since then Jensen has loved his time learning languages
          and frameworks, and working on projects. His most proud
          accomplishments so far are a full-stack web application that gives
          real-time weather information and displays a user's chosen clothing
          choice based on the weather, and an ebook reader MacroDroid
          application. Using his training of JavaScript, React, Node.js, and
          more, Jensen has loved creating websites, and seeing finished products
          come together!
        </p> */}
        {/* <p>
          My journey into tech began with a lifelong love of music. I’ve been a
          musician since I was five, when my mom first taught me to play piano.
          I eventually found my voice through the trumpet. Performing in
          ensembles taught me a love of precision, collaboration, creativity,
          and dedication - qualities that now shape how I approach software
          development. <br />
          <br />I was initially inspired to dip my toe into programming because
          of a friend. What surprised me most was how familiar it felt. The same
          things I grew to love in music: structure, rhythm, and the joy of
          building something meaningful with others, were present within
          programming. That realization sparked a passion that’s only grown
          stronger. Since then, I’ve immersed myself in learning languages and
          frameworks like JavaScript, React, and Node.js. I’ve built projects
          I’m proud of, including a full-stack web app that delivers real-time
          weather info and suggests clothing based on conditions, and a
          MacroDroid-powered ebook reader. I love seeing ideas come to
          life—especially when they solve real problems or make people's lives
          easier. Now I'm on the search for a job where I can blend my
          creativity with problem solving!
        </p> */}
        <p>
          {currentUser.about.length > 0
            ? currentUser.about
            : "This user prefers to keep an air of mystery about them."}
        </p>
      </section>
    </div>
  );
};

export default Home;

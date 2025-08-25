import "../blocks/Home.css";

const Home = () => {
  return (
    <div className="home">
      <section className="home__intro">
        <div className="home__intro-container">
          <h2 className="home__intro-hello home__intro-text">Hello.</h2>
          <h3 className="home__intro-name home__intro-text">I'm Jensen,</h3>
          <h3 className="home__intro-title home__intro-text">
            Software Developer
          </h3>
          <a
            href="https://docs.google.com/document/d/1ttmiTIirAoEtwlR0YB-zaiEdHdZxEVyyzoMn3SOeIjg/edit?usp=sharing"
            target="#"
            className="home__intro-button"
          >
            My Resume
          </a>
        </div>
        <img
          className="home__intro-image"
          src="src/assets/JensenHeadshot.JPG"
          alt="Jensen"
        />
      </section>
      <section className="home__about">
        <h1 className="home__about-title">About Me</h1>
        <p className="home__about-text">
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
        </p>
      </section>
    </div>
  );
};

export default Home;

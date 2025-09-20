import "../blocks/ContactMe.css";
import { useContext, useEffect } from "react";
import UserDataContext from "../contexts/UserDataContext";
import PageDataContext from "../contexts/PageDataContext";
import PublicDataContext from "../contexts/PublicDataContext";
import { useParams } from "react-router-dom";

const ContactMe = () => {
  const { currentUser, isUserLoggedIn } = useContext(UserDataContext);
  const { setActiveModal } = useContext(PageDataContext);
  const { isOwner, setPublicUserName, publicUser } =
    useContext(PublicDataContext);
  const { userName } = useParams();

  useEffect(() => {
    setPublicUserName(userName);
  }, [userName]);

  const handleEditProfileClick = () => {
    setActiveModal("editProfile");
  };

  return (
    <div className="contact-me">
      {isUserLoggedIn && isOwner ? (
        <button
          className="home__edit-profile-button"
          onClick={handleEditProfileClick}
        >
          Edit Profile Info
        </button>
      ) : (
        ""
      )}
      <h1 className="contact-me__title">Contact Me</h1>
      <p className="contact-me__description">
        If you have any questions or would like to get in touch, please reach
        out!
      </p>
      {/* <form className="contact-me__form">
        <label className="contact-me__label" htmlFor="name">
          Name:
          <input type="text" id="name" name="name" required />
        </label>
        <label className="contact-me__label" htmlFor="email">
          Email:
          <input type="email" id="email" name="email" required />
        </label>

        <label className="contact-me__label" htmlFor="message">
          Message:
          <textarea id="message" name="message" required></textarea>
        </label>

        <button type="submit">Send</button>
      </form> */}
      <section className="contact-me__section">
        <div className="contact-me__section-items">
          <h3 className="contact-me__section-item">Name: </h3>
          <h3 className="contact-me__section-item">{publicUser.name}</h3>
        </div>
        <div className="contact-me__section-items">
          <h3 className="contact-me__section-item">Email:</h3>
          <h3 className="contact-me__section-item">{publicUser.email}</h3>
        </div>
        <div className="contact-me__section-items">
          <h3 className="contact-me__section-item">Phone:</h3>
          <h3 className="contact-me__section-item">{publicUser.phoneNumber}</h3>
        </div>
      </section>
    </div>
  );
};

export default ContactMe;

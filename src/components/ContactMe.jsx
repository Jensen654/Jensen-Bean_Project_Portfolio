import "../blocks/ContactMe.css";

const ContactMe = () => {
  return (
    <div className="contact-me">
      <h1 className="contact-me__title">Contact Me</h1>
      <p className="contact-me__description">
        If you have any questions or would like to get in touch, please reach
        out!
      </p>
      <form className="contact-me__form">
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
      </form>
    </div>
  );
};

export default ContactMe;

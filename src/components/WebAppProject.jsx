import "../blocks/WebAppProject.css";
import PageDataContext from "../contexts/PageDataContext";
import { useContext } from "react";
import PROJECTS from "../utils/constants";

const WebAppProject = ({
  project,
  projectTitle,
  projectDescription,
  projectUrl,
}) => {
  const { buttonPressed, setButtonPressed } = useContext(PageDataContext);

  // const dropDownPressed = () => {
  //   setButtonPressed((prevState) =>
  //     prevState.map((button) =>
  //       button.id === projectId
  //         ? { ...button, isPressed: !button.isPressed }
  //         : button
  //     )
  //   );
  // };

  const handleDropDownClick = () => {
    PROJECTS[project.title].dropDownPressed =
      !PROJECTS[project.title].dropDownPressed;
  };

  return (
    <section className="web-app-project">
      <div className="web-app-project__intro">
        <h2 className="web-app-project__title">{projectTitle}</h2>
        <button
          onClick={handleDropDownClick}
          className={`web-app-project__button ${
            project.dropDownPressed ? "web-app-project__button_pressed" : ""
          }`}
        >
          <svg
            className="web-app-project__arrow"
            width="40"
            height="40"
            viewBox="-19.04 0 75.804 75.804"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g transform="translate(-831.568 -384.448)">
              <path
                d="M833.068,460.252a1.5,1.5,0,0,1-1.061-2.561l33.557-33.56a2.53,2.53,0,0,0,0-3.564l-33.557-33.558a1.5,1.5,0,0,1,2.122-2.121l33.556,33.558a5.53,5.53,0,0,1,0,7.807l-33.557,33.56A1.5,1.5,0,0,1,833.068,460.252Z"
                fill="currentColor"
              />
            </g>
          </svg>
        </button>
      </div>
      <div className="web-app-project__details">
        <p className="web-app-project__description">{projectDescription}</p>
        <iframe
          className="web-app-project__iframe"
          src={projectUrl}
          height="600"
          width="70%"
        ></iframe>
      </div>
    </section>
  );
};

export default WebAppProject;

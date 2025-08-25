import PROJECTS from "../utils/constants";
import WebAppProject from "./WebAppProject";

const WebApplications = () => {
  return (
    <div className="web-applications">
      <h1>Web Applications</h1>
      <p>Here you can find a selection of my web applications.</p>
      {PROJECTS.map((project) => (
        <WebAppProject
          key={project.id}
          project={project}
          projectTitle={project.title}
          projectDescription={project.description}
          projectUrl={project.url}
        />
      ))}
    </div>
  );
};

export default WebApplications;

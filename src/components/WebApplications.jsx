import PROJECTS from "../utils/constants";
import ProjectDisplay from "./ProjectDisplay";

const WebApplications = () => {
  return (
    <div className="web-applications">
      <h1>Web Applications</h1>
      <p>Here you can find a selection of my web applications.</p>
      {PROJECTS.filter((project) => project.type === "web").map((project) => (
        <ProjectDisplay
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

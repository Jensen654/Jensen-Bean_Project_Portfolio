import PROJECTS from "../utils/constants";
import ProjectDisplay from "./ProjectDisplay";

const OtherProjects = () => {
  return (
    <div className="other-projects">
      <h1>Other Projects</h1>
      <p>Here you can find a selection of my other projects.</p>
      {PROJECTS.filter((project) => project.type === "other").map((project) => (
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

export default OtherProjects;

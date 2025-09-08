import ProjectDisplay from "./ProjectDisplay";
import { useContext } from "react";
import ProjectDataContext from "../contexts/ProjectDataContext";

const OtherProjects = () => {
  const { projects } = useContext(ProjectDataContext);

  return (
    <div className="other-projects">
      <h1>Other Projects</h1>
      <p>Here you can find a selection of my other projects.</p>
      {projects
        .filter((project) => project.type === "other")
        .map((project) => (
          <ProjectDisplay
            key={project._id}
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

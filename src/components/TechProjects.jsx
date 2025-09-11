import ProjectDisplay from "./ProjectDisplay";
import { useContext } from "react";
import ProjectDataContext from "../contexts/ProjectDataContext";

const TechProjects = () => {
  const { projects } = useContext(ProjectDataContext);

  return (
    <div className="tech-projects">
      <h1>Tech Projects</h1>
      <p>Here you can find a selection of my web applications.</p>
      {projects
        .filter((project) => project.type === "tech")
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

export default TechProjects;

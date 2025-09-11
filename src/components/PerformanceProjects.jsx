import ProjectDisplay from "./ProjectDisplay";
import { useContext } from "react";
import ProjectDataContext from "../contexts/ProjectDataContext";

const PerformanceProjects = () => {
  const { projects } = useContext(ProjectDataContext);

  return (
    <div className="performance-projects">
      <h1>Performance Projects</h1>
      <p>Here you can find a selection of my Performing Arts Projects.</p>
      {projects
        .filter((project) => project.type === "performance")
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

export default PerformanceProjects;

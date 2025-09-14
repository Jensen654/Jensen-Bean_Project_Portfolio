import ProjectDisplay from "./ProjectDisplay";
import { useContext } from "react";
import ProjectDataContext from "../contexts/ProjectDataContext";
import { DefaultProjects } from "../utils/constants";

const PerformanceProjects = () => {
  const { projects } = useContext(ProjectDataContext);

  return (
    <div className="performance-projects">
      <h1>Performance Projects</h1>
      <p>Here you can find a selection of my Performing Arts Projects.</p>
      {projects.length > 0
        ? projects
            .filter((project) => project.type === "performance")
            .map((project) => {
              return (
                <ProjectDisplay
                  key={project._id}
                  project={project}
                  projectTitle={project.title}
                  projectDescription={project.description}
                  projectUrl={project.url}
                />
              );
            })
        : DefaultProjects.filter(
            (project) => project.type === "performance"
          ).map((project) => {
            return (
              <ProjectDisplay
                key={project._id}
                project={project}
                projectTitle={project.title}
                projectDescription={project.description}
              />
            );
          })}
    </div>
  );
};

export default PerformanceProjects;

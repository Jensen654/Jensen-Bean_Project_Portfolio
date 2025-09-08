import ProjectDisplay from "./ProjectDisplay";
import { useContext } from "react";
import ProjectDataContext from "../contexts/ProjectDataContext";

const WebApplications = () => {
  const { projects } = useContext(ProjectDataContext);

  return (
    <div className="web-applications">
      <h1>Web Applications</h1>
      <p>Here you can find a selection of my web applications.</p>
      {projects
        .filter((project) => project.type === "web")
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

export default WebApplications;

import React, { createContext, useContext, useEffect, useState } from "react";
import { projectService } from "../services/project.service";

const ProjectsContext = createContext(null);

export const ProjectsProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("title");
  const [loadingProjects, setLoadingProjects] = useState(true);

  const refreshProjects = async (showLoader = false) => {
    try {
      if (showLoader) setLoadingProjects(true);

      const data = await projectService.getAll();
      setProjects(data);
    } catch (error) {
      console.log(error);
    } finally {
      if (showLoader) setLoadingProjects(false);
    }
  };

  useEffect(() => {
    refreshProjects(true);

    const interval = setInterval(() => {
      refreshProjects(false);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    localStorage.setItem("projects", JSON.stringify(projects));
  }, [projects]);

  const filteredProjects = projects.filter((project) =>
    project.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <ProjectsContext.Provider
      value={{
        projects,
        setProjects,
        filteredProjects,
        search,
        setSearch,
        filter,
        setFilter,
        loadingProjects,
        refreshProjects,
      }}
    >
      {children}
    </ProjectsContext.Provider>
  );
};

export const useProjects = () => {
  const context = useContext(ProjectsContext);
  if (!context) throw new Error("useProjects must be used within a ProjectsProvider");
  return context;
};
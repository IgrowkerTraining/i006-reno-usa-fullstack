import React, { createContext, useContext, useState, useEffect } from "react";

const ProjectsContext = createContext(null);

export const ProjectsProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("title");

  //Loads project list from localStorage
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("projects") || "[]");
    setProjects(stored);
  }, []);

  const filteredProjects = projects.filter((project) =>
    project.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <ProjectsContext.Provider
      value={{ projects, setProjects, filteredProjects, search, setSearch, filter, setFilter }}
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
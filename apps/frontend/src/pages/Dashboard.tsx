import React, { useState, useEffect } from "react";
import { User } from "../types";
import { Button } from "../components/common/Button";
import { getAIGreeting } from "../services/service";
import { api } from "../services/api";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
const Dashboard: React.FC = () => {

  // Prototipo de proyectos activos
  const projects = [
    { id: 1, name: "Project Alpha", status: "In Progress" },
    { id: 2, name: "Project Beta", status: "Completed" },
    { id: 3, name: "Project Gamma", status: "In Progress" },
    { id: 4, name: "Project Delta", status: "In Progress" },
    { id: 5, name: "Project Epsilon", status: "Completed" },
  ];


  const navigate = useNavigate();

  // const [greeting, setGreeting] = useState("");
  // const [isBackendOnline, setIsBackendOnline] = useState(false);

  // useEffect(() => {
  //   const initDashboard = async () => {
  //     const [msg, online] = await Promise.all([
  //       getAIGreeting(user?.name || ""),
  //       api.checkHealth(),
  //     ]);
  //     setGreeting(msg);
  //     setIsBackendOnline(online);
  //   };
  //   initDashboard();
  // }, [user?.name]);

  return (

    <div>
      {projects.length === 0 ? (
        <div className="text-center">
          <p className="text-xl font-extrabold mt-10">There are no active projects</p>
          <div className="p-2 text-center rounded-md bg-blue-900 mt-4">
            <button type="submit" className="text-white text-xl font-mono" onClick={() => navigate("/Vista-proyecto")}>
              New Project
            </button>
          </div>
        </div>
      ) : (
        <div className="container text-black mx-auto mt-10 p-4">
          <h1 className="text-xl font-extrabold font-serif text-blue-950">
            ALLOCATED PROJECTS
          </h1>

          <div className="my-4 space-y-4">
            {projects.map((project) => (
              <div
                key={project.id}
                className="flex p-4 gap-5 items-center rounded-lg bg-sky-100"
              >
                <div className="flex-auto">
                  <h2 className="text-xl font-semibold border-b border-gray-500">
                    {project.name}
                  </h2>

                  <div className="flex gap-2 my-1">
                    <p>{project.status}</p>

                    <section className="flex gap-2 text-center">
                      <p className="size-6 rounded-full bg-gray-400"></p>
                      <p className="size-6 rounded-full bg-gray-400"></p>
                      <p className="size-6 rounded-full bg-gray-400"></p>
                    </section>
                  </div>
                </div>

                <button
                  type="button"
                  className="rounded w-35 p-2 bg-blue-900 text-white"
                  onClick={() => navigate(`/proyecto/${project.id}`)}
                >
                  Edit Project
                </button>
              </div>
            ))}
          </div>
          <div className="p-2 text-center rounded-md bg-blue-900 mt-4">
            <button type="submit" className="text-white text-xl font-mono" onClick={() => navigate("/Vista-proyecto")}>
              New Project
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
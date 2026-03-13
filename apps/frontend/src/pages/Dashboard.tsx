import React, { useEffect, useState } from "react";
import { Project } from "../types";
import { getAIGreeting } from "../services/service";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import error_icons from "../components/common/error_icons";
import { useProjects } from "../context/ProjectsContext";

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const { filteredProjects, projects, loadingProjects } = useProjects();
  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    const fetchGreeting = async () => {
      try {
        const msg = await getAIGreeting(user.name);
        setGreeting(msg);
      } catch (error) {
        console.log(error);
      }
    };

    fetchGreeting();
  }, [user, navigate]);

  if (loadingProjects) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-white gap-4">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-green-600"></div>
        <p className="text-gray-700 font-bold text-lg">Loading projects...</p>
      </div>
    );
  }

  return (
    <div className="bg-[#F8FAFC] h-screen p-8">
      {projects.length === 0 ? (
        <div className="text-center text-black bg-white">
          <p className="text-xl font-extrabold pt-10">There are no active projects</p>
          <div className="p-2 mx-4 text-center rounded-md bg-blue-900 mt-10">
            <button
              type="submit"
              className="text-white text-xl font-mono hover:bg-blue-600 hover:scale-95 transition-transform"
              onClick={() => navigate("/register-project")}
            >
              New Project
            </button>
          </div>
        </div>
      ) : (
        <div className="text-black mx-auto pt-10 p-4">
          <h1 className="text-2xl font-extrabold text-[#0C277B] p-2">
            ALLOCATED PROJECTS
          </h1>

          {filteredProjects.length === 0 ? (
            <p className="text-center text-gray-500 mt-6">No projects match your search.</p>
          ) : (
            <div className="mt-4 space-y-4">
              {filteredProjects.map((project: Project) => (
                <div
                  key={project.id}
                  className="flex p-4 gap-5 items-center rounded-lg bg-[#DAEAFF]"
                >
                  <div className="flex-auto">
                    <h2 className="text-xl font-semibold border-b border-gray-500 capitalize">
                      {project.name}
                    </h2>

                    <div className="flex gap-2 my-1 items-center">
                      <p>{project.status}</p>

                      {project.activeIncidences?.map((err) => {
                        const errorInfo = error_icons.find(
                          (item) => item.error_code === err
                        );

                        if (!errorInfo) return null;

                        return (
                          <div
                            key={err}
                            className="flex items-center justify-center px-2 py-2 rounded-lg text-white font-medium"
                            title={errorInfo.error_title}
                          >
                            {errorInfo.icon}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <button
                    type="button"
                    className="rounded w-35 p-2 bg-[#0C277B] text-white hover:bg-blue-600 hover:scale-95 transition-transform"
                    onClick={() => navigate(`/proyecto/${project.id}`)}
                  >
                    Edit Project
                  </button>
                </div>
              ))}
            </div>
          )}

          <div className="p-2 text-center rounded-md bg-[#0C277B] mt-10 hover:bg-[#1a2f71] hover:scale-95 transition-transform">
            <button
              type="submit"
              className="text-white text-xl font-mono rounded-md"
              onClick={() => navigate("/register-project")}
            >
              New Project
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
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

  const userRole = user.role // <---To differentiate between user & professional

  const { filteredProjects, projects, setProjects } = useProjects();
  const [loading, setLoading] = useState(true);
  const [greeting, setGreeting] = useState("");
  const [selectedErrorInfo, setSelectedErrorInfo] = useState<any | null>(null);

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    localStorage.setItem("projects", JSON.stringify(projects));

    const fetchProjects = async () => {
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
    <div className="bg-[#F8FAFC] h-screen p-2">
      {projects.length === 0 ? (
        <div className="text-center text-black">
          <p className="text-xl font-extrabold pt-10">There are no active projects.</p>
            {userRole === "professional" && (
            <div className="p-2 mx-4 text-center rounded-md bg-blue-900 mt-10 hover:scale-95 transition-transform">
              <button
              type="submit"
              className="text-white text-xl font-mono rounded-md"
              onClick={() => navigate('/register-project')}
            >
                New Project
              </button>
            </div>
            )}
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

                      {project.activeIncidences?.map((err, index) => {
                        console.log("Incidencia detectada:", err)
                        const errorInfo = error_icons.find(
                          iconObj => iconObj.type === err
                        );

                        if (!errorInfo) return null;

                        return (
                          <div
                            key={`{project.id},{index}`}
                            onClick={() => setSelectedErrorInfo(errorInfo)}
                            title={errorInfo.error_title}
                            className={`cursor-pointer flex items-center justify-center px-2 py-2 rounded-lg text-white font-medium
                            ${errorInfo?.color_assigned}`}
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
                    onClick={() => userRole === "user"? navigate(`/proyecto/${project.id}`) : navigate(`/control-project/${project.id}`)}
                  >
                    Edit Project
                  </button>
                </div>
              ))}
            </div>

            { userRole === "professional" && (
            <div className="p-2 text-center rounded-md bg-[#0C277B] mt-10 hover:bg-[#1a2f71] hover:scale-95 transition-transform">
              <button type="submit" className="text-white text-xl font-mono rounded-md" onClick={() => navigate('/register-project')}>
                New Project
              </button>
            </div>
            )}
          </div>
        )}
      </div>

      {/* Modal error details */}
      {selectedErrorInfo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full overflow-hidden transform transition-all">

            {/* Heading with color error */}
            <div className={`p-4 flex items-center gap-3 text-white ${selectedErrorInfo.type === 'CORRECTION' ? 'bg-blue-600' :
              selectedErrorInfo.type === 'SAFETY' ? 'bg-red-500' : 'bg-yellow-500'
              }`}>
              <div className="bg-white p-1 rounded-full text-black">
                {selectedErrorInfo.icon}
              </div>
              <h3 className="font-bold text-lg leading-tight">
                {selectedErrorInfo.error_code}: {selectedErrorInfo.error_title}
              </h3>
            </div>

            {/* Content */}
            <div className="p-6">
              <p className="text-gray-600 text-base leading-relaxed">
                {selectedErrorInfo.description}
              </p>

              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => setSelectedErrorInfo(null)} // <--- Close modal
                  className="px-6 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium"
                >
                  ok
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Dashboard;
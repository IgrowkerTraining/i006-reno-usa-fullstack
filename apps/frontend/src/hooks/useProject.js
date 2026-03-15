import { useCallback, useEffect, useState } from "react";
import { projectService } from "../services/project.service";

export const useProject = (id) => {
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProject = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await projectService.getById(id);

      // If your service returns the JSON directly
      // (not a Response object like fetch), use it directly:
      setProject(response);

      // If it returns a fetch Response object, uncomment below:
      // if (!response.ok) throw new Error("Failed to fetch project");
      // const data = await response.json();
      // setProject(data);

    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchProject();
  }, [fetchProject]);

  return {
    project,
    loading,
    error,
    refetch: fetchProject,
  };
};
import { useProjects } from '@/src/context/ProjectsContext';
import { projectService } from '@/src/services/project.service';
import React, { } from 'react';
import { useNavigate } from 'react-router-dom';


export const ButtonDelete: React.FC<{ id: string }> = ({ id }) => {

    const { setProjects } = useProjects();
    const navigate = useNavigate();	

    const deleteProject = async (id: string) => {
        const confirmDelete = window.confirm(`Are you sure delete the project?`);

        if (confirmDelete) {
            try {
                //Llamada al servicio (API)
                await projectService.remove(id);

                //Actualización optimista del estado global
                setProjects((prevProjects: any[]) =>
                    prevProjects.filter((project: { id: string; }) => project.id !== id)
                );

                alert("project delete successful");
                navigate('/dashboard');
            } catch (error) {
                console.error("Error deleting project:", error);
                alert("The project could not be deleted. Please try again..");
            }
        }
    }

    return (
        <>
            <div className="flex justify-end items-center pr-3 py-4 hover:scale-95 transition-transform duration-300">
                <button type="button" id="Delete" className="bg-red-700 text-white hover:bg-red-600 py-2 px-4 rounded w-40 h-10 flex items-center justify-center" onClick={() => deleteProject(id)}>Delete</button>
            </div>
        </>
    )
}
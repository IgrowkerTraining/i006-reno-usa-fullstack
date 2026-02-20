import React, { useState, useEffect } from "react";
import { User } from "../types";
import { Button } from "../components/common/Button";
import { Input } from "../components/common/Input";
import { getAIGreeting } from "../services/service";
import { api } from "../services/api";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const Dashboard: React.FC = () => {

  const navigate = useNavigate();

  

  // este es el useEffect que controla que la persona este logueada.
  // useEffect(() => {
  //   if (localStorage.getItem("token") == null) {
  //     navigate("/")
  //   } else {
  //     fetchProyectos();
  //   }
  // }, [localStorage.getItem("token")])

  return (
    <div>
      <div class="container mx-auto mt-10 p-4">
        <h1 class="text-xl font-extrabold font-serif text-blue-950">PROYECTOS ACTIVOS</h1>
        <div class="my-4">
          <div class=" flex p-4 gap-5 items-center rounded-lg bg-sky-400">
            <div class=" w-100 flex-auto">
              <h2 class=" text-xl text-black font-semibold border-b-2 border-gray-600 mask-linear-90 mask-linear-from-50% mask-linear-to-90%">Proyecto Alfa</h2>
              <div class="flex gap-2 my-1" id="project-status">
                <p class="text-black">Estado del proyecto</p>
                <section class="flex gap-2 text-center" id="status-indicators">
                  <p class="size-6 rounded-full bg-gray-400"></p>
                  <p class="size-6 rounded-full bg-gray-400"></p>
                  <p class="size-6 rounded-full bg-gray-400"></p>
                </section>
              </div>

              {/* button edit project */}
            </div>
            <button type="button" id="edit-project" class="rounded-xs w-25 flex-initial p-2 bg-blue-900 text-white" onClick={() => navigate("/edit-project")}>Editar Proyecto</button>
          </div>
        </div>

        {/* Button new project */}
        
        <div class="p-2 items-center text-center rounded-md bg-blue-900 mt-4">
          <button type="submit" id="new-project" class="text-white text-xl font-mono" onClick={() => navigate("/Proyecto")}>Nuevo Proyecto</button>
        </div>
      </div>

    </div>
  );
};

export default Dashboard;

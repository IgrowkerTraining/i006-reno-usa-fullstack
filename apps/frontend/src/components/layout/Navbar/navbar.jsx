import { useState, useEffect } from "react";

//css
import "./navbar.css";

//assets
import RenoLogo from "../../../assets/RenoLogo.png";
import { Link, useLocation } from "react-router-dom";
import { useAvatar } from "@/src/pages/Access/AvatarPlaceHolder";
import { useAuth } from "@/src/context/AuthContext";
import { SearchBar } from "./searchBar";
import error_icons from "../../common/error_icons";
import { useProjects } from "@/src/context/ProjectsContext";

export const Navbar = () => {
    const location = useLocation();
    const { logout } = useAuth();
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const { projects } = useProjects();

    const fallbackAvatar = useAvatar(user?.name || user?.username || "User");
    const my_photo = user?.avatar || fallbackAvatar;
    const my_profile_name = user?.name || user?.username || "User";

    const hideOnNavigation =
        location.pathname === "/register" ||
        location.pathname === "/login" ||
        location.pathname === "/forgot-password" ||
        location.pathname.startsWith("/reset-password/");

    const projectsWithIncidences = projects?.filter(
        (project) => project?.activeIncidences && project.activeIncidences.length > 0
    ) || [];

    const errors = error_icons.filter((e) =>
        projectsWithIncidences.some((project) =>
            project?.activeIncidences?.some((n) => n === e.error_code)
        )
    );

    const unreadCount = projects.reduce((total, project) => {
        return total + (project?.activeIncidences?.length || 0);
    }, 0);

    const handleLogout = () => {
        logout();
    };

    return (
        <nav className="relative navbar_bg">
            <div className="mx-auto px-5">
                <div className="relative flex h-16 items-center justify-between">

                    {/* Logo */}
                    <Link to="/dashboard">
                        <div className="flex flex-1 items-stretch justify-start">
                            <div className="flex shrink-0 items-center">
                                <img alt="Reno" src={RenoLogo} className="h-8 w-auto" />
                            </div>
                            <p className="reno_logo_name font-bold ml-2 mt-1">RENO</p>
                        </div>
                    </Link>

                    {/* Right side */}
                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">

                        {/* Search */}
                        <SearchBar hideOnNavigation={hideOnNavigation} />

                        {/* FAQ button */}
                        <Link to="/#">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 22 22"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="size-6 mx-5 text-base text-white"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z"
                                />
                            </svg>
                        </Link>

                        {/* Notificaciones */}
                        <div className={hideOnNavigation ? "hidden" : "relative group mt-1"}>
                            <button
                                type="button"
                                className="relative rounded-full p-1 focus:outline-2 focus:outline-offset-2 focus:outline-indigo-500"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className="size-6 mr-5 text-slate-50"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"
                                    />
                                </svg>

                                {unreadCount > 0 && (
                                    <span className="absolute -top-1 -right-1 inline-flex items-center justify-center px-3 ml-7 py-1 text-xs leading-none text-white bg-red-500 rounded-full">
                                        {unreadCount}
                                    </span>
                                )}
                            </button>

                            <div className="absolute right-0 z-10 mt-1 w-96 max-h-96 overflow-y-auto custom-scroll rounded-md notification_bg py-1 shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150">
                                {projectsWithIncidences.length === 0 ? (
                                    <p className="text-sm text-gray-500 p-2 text-center">
                                        No tienes notificaciones
                                    </p>
                                ) : (
                                    projectsWithIncidences.map((project) => (
                                        <div key={project.id} className="border-b border-blue-100 pb-3">
                                            <h2 className="text-blue-900 font-bold py-2 ps-10 border-b">
                                                {project.name}
                                            </h2>

                                            {project.activeIncidences.map((notification) => {
                                                const errorInfo = error_icons.find(
                                                    (e) => e.type === notification
                                                );

                                                if (!errorInfo) return null;

                                                return (
                                                    <div
                                                        key={`${project.id}-${notification}`}
                                                        className="text-slate-700 px-8 py-2 hover:bg-blue-100"
                                                    >
                                                        <div className="flex mt-2">
                                                            {errorInfo.icon}
                                                            <h4 className="ms-3 text-sm font-bold my-2">
                                                                {errorInfo.error_title}
                                                            </h4>
                                                        </div>

                                                        <p className="text-sm">
                                                            {errorInfo.description}
                                                        </p>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>

                        <div className={hideOnNavigation ? "hidden" : "relative ml-4 group"}>
                            <button className="relative flex rounded-full focus:outline-2 focus:outline-offset-2 focus:outline-indigo-500">
                                <img
                                    alt="mi perfil"
                                    src={my_photo}
                                    className="h-8 w-8 rounded-full bg-gray-800"
                                />
                                <p className="ml-4 text-sm text-white mt-3 capitalize">
                                    {my_profile_name}
                                </p>
                            </button>

                            <div className="absolute right-0 z-10 mt-2 w-48 rounded-md bg-white py-1 shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150">
                                <button
                                    className="w-full px-4 py-2 text-sm font-bold text-red-700 hover:bg-gray-100 text-start"
                                    onClick={handleLogout}
                                >
                                    Log out
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};
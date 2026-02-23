import { useState } from "react";

//css
import "./navbar.css";

//assets
import RenoLogo from "../../../assets/RenoLogo.png";
import { useLocation } from "react-router-dom";

export const Navbar = () => {

    const my_photo = "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80";
    const my_profile_name = "Serati Ma";

    const location = useLocation();

    const hideOnNavigation =
		location.pathname === "/register" ||
		location.pathname === "/login" ||
		location.pathname === "/forgot-password" ||
		location.pathname.startsWith("/reset-password/");

    const [my_notifications, setNotifications] = useState([
        { id: 1, message: "Tienes una nueva tarea asignada", read: false },
        { id: 2, message: "Tu proyecto ha sido aprobado", read: false },
        { id: 3, message: "Recibiste un nuevo comentario", read: false },
    ]);

    const unreadCount = my_notifications?.filter(n => !n.read).length || 0;

    const markAsRead = (id) => {
        setNotifications(prev =>
            prev.map(n => n.id === id ? { ...n, read: true } : n)
        );
        // Aquí puedes agregar la llamada a tu API si quieres marcarlo en backend
    };

    return (
        <nav className="relative navbar_bg">
            <div className="mx-auto px-5">
                <div className="relative flex h-16 items-center justify-between">
                    {/* Logo */}
                    <div className="flex flex-1 items-stretch justify-start">
                        <div className="flex shrink-0 items-center">
                            <img alt="Reno" src={RenoLogo} className="h-8 w-auto" />
                        </div>
                        <p className="reno_logo_name font-bold ml-2 mt-1">RENO</p>
                    </div>

                    {/* Sección de la derecha */}
                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">

                        {/* Botón búsqueda */}
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none" viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="size-6 text-white">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                        </svg>

                        {/* Botón FAQ */}
                        <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        fill="none" viewBox="0 0 22 22"
                        strokeWidth={1.5} stroke="currentColor" 
                        className="size-6 mx-5 text-base text-white">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z" />
                        </svg>

                        {/* Botón notificaciones */}
                        <div className={hideOnNavigation ? "hidden" : "relative group mt-1"}>
                            <button
                                type="button"
                                className="relative rounded-full p-1 text-gray-400 focus:outline-2 focus:outline-offset-2 focus:outline-indigo-500"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className="size-6 mr-5 text-white">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
                                </svg>

                                {/* Badge de notificaciones */}
                                {unreadCount > 0 && (
                                    <span className="absolute -top-1 -right-1 inline-flex items-center justify-center px-3 ml-7 py-1 text-xs leading-none text-white bg-red-500 rounded-full">
                                        {unreadCount}
                                    </span>
                                )}
                            </button>

                            <div className="absolute right-0 z-10 mt-1 w-80 rounded-md bg-white py-1 shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150">
                                {!my_notifications || my_notifications.length === 0 ? (
                                    <p className="text-sm text-gray-500 p-2 justify-self-center">
                                        No tienes notificaciones
                                    </p>
                                ) : (
                                    my_notifications?.map(notification => (
                                        <p
                                            key={notification.id}
                                            className={`${notification.read ? "font-normal" : "font-bold"} px-4 py-2 text-sm text-gray-700 hover:bg-gray-100`}
                                            onClick={() => markAsRead(notification.id)}>
                                            {notification.message}
                                        </p>
                                    ))
                                )}
                            </div>
                        </div>

                        {/*Dropdown perfil */}
                        <div className={hideOnNavigation ? "hidden" : "relative ml-4 group"}>
                            <button className="relative flex rounded-full focus:outline-2 focus:outline-offset-2 focus:outline-indigo-500">
                                <img
                                    alt="mi perfil"
                                    src={my_photo}
                                    className="h-8 w-8 rounded-full bg-gray-800"
                                />
                                <p className="ml-2 text-sm text-white mt-3">{my_profile_name}</p>
                            </button>

                            <div className="absolute right-0 z-10 mt-2 w-48 rounded-md bg-white py-1 shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150">
                                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                    Mi perfil
                                </a>
                                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                    Configuración
                                </a>
                                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                    Salir
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </nav>
    );
};
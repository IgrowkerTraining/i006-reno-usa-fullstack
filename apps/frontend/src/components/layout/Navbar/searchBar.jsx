import { useProjects } from "@/src/context/ProjectsContext";
import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";

//We can add more filters here, for now default is title
const FILTER_OPTIONS = [{ label: "Title", key: "title" }];

export const SearchBar = ({ hideOnNavigation }) => {

    const location = useLocation();
    const containerRef = useRef(null);

    const { search, setSearch, filter } = useProjects();
    const [showSearchBar, setShowSearchBar] = useState(false);

    const isDashboard = location.pathname === "/dashboard";

    const clearInput = () => setSearch("");

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                setShowSearchBar(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    if (hideOnNavigation || !isDashboard) return null;

    return (
        <div ref={containerRef} className="mt-2">
            {showSearchBar ? (
                <div className="relative w-96 max-w-md mx-auto">
                    <div className="relative flex items-center">
                        {/* Search Icon */}
                        <div className="absolute left-3 top-1/2 -translate-y-1/2">
                            {isDashboard && (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="w-6 h-6 text-slate-400"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                                    />
                                </svg>
                            )}
                        </div>

                        {/* Input */}
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder={`Search by ${FILTER_OPTIONS.find(f => f.key === filter)?.label}`}
                            className="flex-grow p-2 pl-10 rounded-full border border-gray-300 text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />

                        {/* Clear */}
                        {search && (
                            <button
                                onClick={clearInput}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
                            >
                                ✕
                            </button>
                        )}
                    </div>
                </div>
            ) : (
                <button
                    onClick={() => setShowSearchBar(true)}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className={`${hideOnNavigation ? "hidden" : "w-6 h-6 text-slate-50"}`}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                        />
                    </svg>
                </button>
            )}
        </div>
    );
};
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from 'react';


export const ButtonPlans: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="flex justify-end items-center pr-3 py-4 hover:scale-95 transition-transform duration-300">
            <button type="button" id="Plans" className="bg-blue-900 text-white hover:bg-blue-600 py-2 px-4 rounded w-40 h-10 flex items-center justify-center" onClick={() => navigate("#")}>View plans</button>
        </div>
    );
}
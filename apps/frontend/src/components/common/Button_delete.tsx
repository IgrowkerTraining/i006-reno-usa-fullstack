import React, { } from 'react';


export const ButtonDelete: React.FC = () => {

    return (
        <>
            <div className="flex justify-end items-center pr-3 py-4 hover:scale-95 transition-transform duration-300">
                <button type="button" id="Delete" className="bg-red-700 text-white hover:bg-red-600 py-2 px-4 rounded w-40 h-10 flex items-center justify-center">Delete</button>
            </div>
        </>
    )
}
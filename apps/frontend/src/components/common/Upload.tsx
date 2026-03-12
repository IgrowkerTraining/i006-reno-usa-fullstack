import { useState } from "react";

export default function UploadPlan() {
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState([]);

    const handleFile = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);

        if (selectedFile) {
            const url = URL.createObjectURL(selectedFile);
            setPreview(url);
        }
    };

    return (
        <div className="flex flex-col">
            <div className="flex justify-end">
                {/* BOTON */}
                <label className=" size-12 rounded-full cursor-pointer bg-blue-900 text-white mt-5 flex items-center justify-center hover:bg-blue-600 hover:scale-110 transition-transform">

                    {/* SVG */}

                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="30"
                        height="30"
                        viewBox="0 0 24 24"
                        fill="none"
                    >
                        <line x1="12" y1="5" x2="12" y2="19" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
                        <line x1="5" y1="12" x2="19" y2="12" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
                    </svg>
                    <input
                        type="file"
                        className="hidden"
                        onChange={handleFile}
                    />
                </label>
            </div>

            {/* PREVIEW */}
            {preview && (
                <div className="mt-6 flex justify-center items-center">
                    <iframe
                        src={preview}
                        width="550px"
                        height="500px"
                    />
                </div>
            )}
        </div>
    );
}
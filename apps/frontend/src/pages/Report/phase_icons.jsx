

export const PhaseIcons = ({ status, number }) => {
    const size = 50;

    return (
        <>
            {status === "completed" ? (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 50 50" // same as number icon
                    width={size}
                    height={size}
                    stroke="#08c3f2"
                    strokeWidth={2}
                    className="mt-2"
                >
                    <circle cx="25" cy="25" r="24" stroke="#08c3f2" strokeWidth="2" />
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17 25 21 30 33 19"
                        stroke="#08c3f2"
                        strokeWidth={2}
                    />
                </svg>
            ) : (
                <svg
                    width={size}
                    height={size}
                    viewBox="0 0 50 50"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="mt-2"
                >
                    <circle
                        cx="25"
                        cy="25"
                        r="24"
                        fill="#1890FF"
                        stroke="#1890FF"
                        strokeWidth="1.5"
                    />
                    <text
                        x="50%"
                        y="50%"
                        textAnchor="middle"
                        dominantBaseline="central"
                        fontSize="20"
                        fontWeight="bold"
                        fill="#ffffff"
                    >
                        {number}
                    </text>
                </svg>
            )}
        </>
    );
};
export const DonutChart = ({ progress }) => {
    const radius = 150;
    const stroke = 65;
    const normalizedRadius = radius - stroke / 2;
    const circumference = normalizedRadius * 2 * Math.PI;
    const strokeDashoffset = circumference - (progress / 100) * circumference;

    return (
        <svg height={radius * 4} width={radius * 4}>
            {/* Gradient definition */}
            <defs>
                <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#3B64CE" />
                    <stop offset="100%" stopColor="#1E3268" />
                </linearGradient>
            </defs>

            {/* Background circle */}
            <circle
                stroke="#B6D2FF"
                fill="transparent"
                strokeWidth={stroke}
                r={normalizedRadius}
                cx={radius}
                cy={radius}
            />

            {/* Progress circle */}
            <circle
                stroke="url(#progressGradient)"
                fill="transparent"
                strokeWidth={stroke}
                strokeDasharray={`${circumference} ${circumference}`}
                style={{ strokeDashoffset, transition: "stroke-dashoffset 0.5s ease" }}
                r={normalizedRadius}
                cx={radius}
                cy={radius}
                strokeLinecap="round"
            />

            {/* Inner mini SVG */}
            <svg x={radius - (-95)} y={radius - 70} width="65" height="55" viewBox="0 0 200 150">
                <rect x="10" y="5" width="170" height="130" rx="15" fill="#76A4FF" />
                <path d="M 145 120 L 100 160 L 80 110 Z" fill="#76A4FF" />
                {/* Progress text */}
                <text
                    x="50%"
                    y="50%"
                    dominantBaseline="middle"
                    textAnchor="middle"
                    fontSize="50"
                    fontWeight={600}
                    fill="#f5f5f5"
                >
                    {progress}%
                </text>
            </svg>
        </svg>
    );
};
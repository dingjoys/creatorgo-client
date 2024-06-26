import './index.scss';

export function LoadingCircle({
    height = 100,
    color = '#fff',
    r = 5,
    time = 2,
}: {
    height: number;
    color?: string;
    r?: number;
    time?: number;
}) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox={`0 0 ${height} ${height}`}
            width={height}
            height={height}
        >
            <circle
                style={{
                    strokeLinecap: 'round',
                }}
                cx={height / 2}
                cy={height / 2}
                r={(height - r) / 2}
                stroke={'#000'}
                fill="transparent"
                stroke-width={r}
            />
            <circle
                style={{
                    strokeLinecap: 'round',
                    animation: `loading-dash ${time}s linear infinite`,
                }}
                cx={height / 2}
                cy={height / 2}
                r={(height - r) / 2}
                stroke={color}
                fill="transparent"
                stroke-width={r}
            />
        </svg>
    );
}

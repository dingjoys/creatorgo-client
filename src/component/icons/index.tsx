export const RoundedTick = (props: { className?; width?: number }) => {
    const { width, className } = props;
    return (
        <span
            className={'rounded-tip ' + className}
            style={width ? { width: width + 'px', height: width + 'px' } : null}
        >
            <span
                className="icon-tick_purple"
                style={width ? { fontSize: width / 2 + 'px' } : null}
            />
        </span>
    );
};

export const RoundedExclaimation = (props) => {
    const { width } = props;
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={width || '36'}
            height={width || '36'}
            viewBox="0 0 36 36"
            fill="none"
            {...props}
        >
            <g clipPath="url(#clip0_2356_31342)">
                <path
                    d="M18 33C9.7155 33 3 26.2845 3 18C3 9.7155 9.7155 3 18 3C26.2845 3 33 9.7155 33 18C33 26.2845 26.2845 33 18 33ZM16.5 22.5V25.5H19.5V22.5H16.5ZM16.5 10.5V19.5H19.5V10.5H16.5Z"
                    fill="#7D809A"
                />
            </g>
            <defs>
                <clipPath id="clip0_2356_31342">
                    <rect width="36" height="36" fill="white" />
                </clipPath>
            </defs>
        </svg>
    );
};

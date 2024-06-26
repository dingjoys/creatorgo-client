import { CSSProperties, useState } from 'react';
import ReactLoading from 'react-loading';
import './MainButton.scss';
import useIsMobile from '@/core/useMobile';

const MainButton = (props: {
    disabled?;
    className?;
    loading?;
    children;
    onClick;
    style?: CSSProperties;
    title?;
    id?;
    size?: 'small';
    styleType?: 'primary' | 'black' | 'primary-circle' | 'black-line' | 'white';
}) => {
    const [loading, setLoading] = useState(false);
    const { isMobile } = useIsMobile();
    return (
        <button
            id={props.id}
            title={props.title}
            className={`main-button ${props?.styleType ?? 'primary'}${
                props.disabled ? ' disabled' : ''
            }${props.loading || loading ? ' loading' : ''}${props.size ? ' ' + props.size : ''}${
                props.className ? ' ' + props.className : ''
            } ${isMobile ? 'main-btn-is-mobile' : ''}`}
            style={props.style}
            onClick={async (e) => {
                e.stopPropagation();
                if (!props.disabled && !(props.loading || loading)) {
                    setLoading(true);
                    try {
                        await props.onClick(e);
                    } finally {
                        setLoading(false);
                    }
                }
            }}
        >
            <div className={'container'}>
                {props.loading || loading ? (
                    <ReactLoading
                        height={'20px'}
                        width={'20px'}
                        className="loadingicon"
                        color="#dddddd"
                    />
                ) : (
                    ''
                )}
                <div className="content">{props.children}</div>
            </div>
        </button>
    );
};

export default MainButton;

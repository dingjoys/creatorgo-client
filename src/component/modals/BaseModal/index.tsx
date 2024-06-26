import Modal from 'react-modal';
import React, { ReactNode, useState, useContext } from 'react';
import './index.scss';

interface IBaseModalConfig {
    isShow: boolean;
    title: string | ReactNode;
    body: string | ReactNode;
    className?: string;
}

interface IBaseModal {
    update: (e: IBaseModalConfig) => void;
    config: IBaseModalConfig;
}

const BaseModalContext = React.createContext<IBaseModal>(null);
const defaultConfig: IBaseModalConfig = { isShow: false, title: '', body: '' };

export const useBaseModal = () => {
    const { update, config } = useContext(BaseModalContext);

    const display = (config: { title: string | ReactNode; body: string | ReactNode; className?: string }) => {
        update({ ...config, isShow: true });
        document.body.style.overflow = 'hidden';
    };

    const hide = () => {
        update({ ...defaultConfig, isShow: false });
        document.body.style.overflow = 'auto';
    };

    return { ...config, hide, display };
};

const defaultConfirmModalStyle = {
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
    },
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        minWidth: '480px',
        transform: 'translate(-50%, -50%)',
        borderRadius: '16px',
        padding: 0,
        overflow: 'hidden',
        backgroundColor: 'rgba(0,0,0,0.6)',
        border: '0',
        backdropFilter: 'blur(12px)',
    },
};

export function BaseModalProvider({ children }) {
    const [config, setConfig] = useState<IBaseModalConfig>(defaultConfig);
    const { isShow, title, body, className } = config;

    function hide() {
        setConfig({ ...config, isShow: false });
        document.body.style.overflow = 'auto';
    }

    return (
        <BaseModalContext.Provider
            value={{
                update: setConfig,
                config,
            }}
        >
            {children}
            <Modal appElement={document.getElementById('root')} onRequestClose={hide} isOpen={isShow} style={Object.assign({}, defaultConfirmModalStyle, {})}>
                <div className={className ? `base-modal-container ${className}` : 'base-modal-container'}>
                    <div className="head">
                        <div className="text">{title}</div>
                        <img src="https://oss.metopia.xyz/imgs/close.svg" className="Button" alt="X" onClick={hide} />
                    </div>
                    <div className="body">{body}</div>
                </div>
            </Modal>
        </BaseModalContext.Provider>
    );
}

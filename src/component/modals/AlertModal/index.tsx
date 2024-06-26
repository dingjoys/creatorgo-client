import { useEffect } from 'react';
import Modal from 'react-modal';
import MainButton from '../../button/MainButton';
import './index.scss';
import useAlertModal, { toast } from './useAlertModal';

const defaultAlertModalStyle = {
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
    },
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        width: '480px',
        transform: 'translate(-50%, -50%)',
        borderRadius: '16px',
        padding: 0,
        border: '0',
        overflow: 'hidden',
        backgroundColor: '#171821',
        backdropFilter: 'blur(12px)',
    },
};
// border: '2px red solid',

const AlertModal = (props) => {
    const { isShow, title, body, warning, hide, cb } = useAlertModal();

    useEffect(() => {
        if (isShow) document.body.style.overflow = 'hidden';
        else document.body.style.overflow = 'auto';
    }, [isShow]);

    return (
        <Modal
            appElement={document.getElementById('root')}
            isOpen={isShow}
            style={Object.assign({}, defaultAlertModalStyle, props.style || {})}
        >
            <div className={'alert-modal-container' + (warning ? ' warning' : '')}>
                <div className={'title'}>
                    <span className="icon-alert" />
                    <div className="text">{title}</div>
                </div>
                <div className="body">{body}</div>
                <div className="button-container">
                    <MainButton
                        onClick={() => {
                            hide();
                            typeof cb == 'function' && cb();
                        }}
                    >
                        Got it
                    </MainButton>
                </div>
            </div>
        </Modal>
    );
};

export default AlertModal;
export { useAlertModal, toast };

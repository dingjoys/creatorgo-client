import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast as toast1 } from 'react-toastify';
import { RootState } from '@/global/redux';
import { displayAlertModal, hideAlertModal } from '@/global/redux/modalControllerSlice';
import { RoundedExclaimation, RoundedTick } from '@/component/icons';
import { ReactComponent as IconCheckedGreen } from '@/component/icons/svg/checked-green.svg';
const useAlertModal = () => {
    const dispatch = useDispatch();
    const { isShow, title, body, warning, cb } = useSelector(
        (state: RootState) => state.modalController.alertModal,
    );

    const display = useCallback(
        (title?: string, body?: string, warning?: boolean, cb?: () => void) => {
            dispatch(displayAlertModal({ title: title || 'Alert', body, warning, cb }));
        },
        [dispatch],
    );
    const hide = useCallback(() => {
        dispatch(hideAlertModal());
    }, [dispatch]);
    return { display, hide, isShow, title, body, warning, cb };
};

export default useAlertModal;

export const toast = (title, content?) =>
    toast1.success(
        <>
            <div className="toast-title">{title}</div>
            {content ? <div className="toast-content">{content}</div> : null}
        </>,
        {
            pauseOnHover: true,
            className: 'r-toast',
            bodyClassName: 'r-toast-body',
            icon: <IconCheckedGreen />,
        },
    );

export const toastError = (title, content?) =>
    toast1.error(
        <>
            <div className="toast-title">{title}</div>
            {content ? <div className="toast-content">{content}</div> : null}
        </>,
        {
            className: 'r-toast',
            bodyClassName: 'r-toast-body',
            icon: <RoundedExclaimation className="icon excl" width={36} />,
        },
    );

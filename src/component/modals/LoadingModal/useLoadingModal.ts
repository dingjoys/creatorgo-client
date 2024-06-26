import { useCallback, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/global/redux';
import { displayLoadingModal, hideLoadingModal } from '@/global/redux/modalControllerSlice';

const useLoadingModal = () => {
    const dispatch = useDispatch();

    const { isShow, tip } = useSelector((state: RootState) => state.modalController.loadingModal);
    const loadingIndicesRef = useRef([]);
    // const hide = useCallback(
    //     (index?: number) => {
    //         let newLoadingIndices = loadingIndicesRef.current.filter((i) => i != (index || 0));
    //         loadingIndicesRef.current = newLoadingIndices;
    //         if (!newLoadingIndices?.length) {
    //             dispatch(hideLoadingModal());
    //         }
    //     },
    //     [dispatch, loadingIndicesRef],
    // );

    // const display = useCallback(
    //     (tip?: string, index?) => {
    //         let newLoadingIndices = [...loadingIndicesRef.current, index || 0];
    //         loadingIndicesRef.current = newLoadingIndices;
    //         dispatch(displayLoadingModal(tip));
    //     },
    //     [dispatch, loadingIndicesRef],
    // );

    const hide = (index?: number) => {
        let newLoadingIndices = [];
        if (index == -1) {
            loadingIndicesRef.current = [];
        } else {
            newLoadingIndices = loadingIndicesRef.current.filter((i) => i != (index || 0));
            loadingIndicesRef.current = newLoadingIndices;
        }
        if (!newLoadingIndices?.length) {
            dispatch(hideLoadingModal());
        }
    };

    const display = (tip?: string, index?) => {
        let newLoadingIndices = [...loadingIndicesRef.current, index || 0];
        loadingIndicesRef.current = newLoadingIndices;
        dispatch(displayLoadingModal(tip));
    };

    return { display, hide, isShow, tip };
};

export default useLoadingModal;

import { useCallback, useEffect, useState, useMemo } from 'react';
import './index.scss';
import Modal from 'react-modal';
import { useAccount } from 'wagmi';
import { toast } from 'react-toastify';
import { ReactComponent as IconClose } from '@/component/icons/svg/close.svg';

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
        width: '440px',
        transform: 'translate(-50%, -50%)',
        overflow: 'visible',
        padding: 0,
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        border: '1px solid rgba(255, 255, 255, 0.25)',
        backdropFilter: 'blur(16px)',
    },
};
export default function MintModal({ hide, isShow }: { hide; isShow }) {
    const { address } = useAccount();
    const leftColumnData: StatItemProps[] = [
        { label: 'Collections', value: '12' },
        { label: 'Total Mints', value: '26.77K' },
        { label: 'Whales', value: '72' },
    ];

    const rightColumnData: StatItemProps[] = [
        { label: 'Total Gas', value: '$437.25' },
        { label: 'Holders', value: '1.39K' },
        { label: 'Blue Chip Holders', value: '41' },
    ];
    const imageUrl = 'https://metopia.oss-cn-hongkong.aliyuncs.com/imgs/default-user-avatar.png';
    const score = '57.7′ / 100';
    const lastUpdateTime = '03/26/24';
    return (
        <Modal
            appElement={document.getElementById('root')}
            onRequestClose={hide}
            isOpen={isShow}
            style={Object.assign({}, defaultConfirmModalStyle)}
        >
            <div className={`modal-vote`}>
                <IconClose className="close-icon-wrapper" onClick={hide} />
                <section className="modal-creator-score-container">
                    <img
                        loading="lazy"
                        src={imageUrl}
                        alt="Creator profile"
                        className="modal-profile-image"
                    />
                    <h2 className="modal-score-title">Your Creator Score</h2>
                    <p className="modal-score-value">{score}</p>
                    <p className="modal-update-time">Last update time: {lastUpdateTime}</p>
                </section>
                <section className="modal-stats-container">
                    <div className="modal-stats-column">
                        {leftColumnData.map((item, index) => (
                            <StatItem key={index} label={item.label} value={item.value} />
                        ))}
                    </div>
                    <div className="modal-stats-column">
                        {rightColumnData.map((item, index) => (
                            <StatItem key={index} label={item.label} value={item.value} />
                        ))}
                    </div>
                </section>
                <div className="modal-mint-btn">Mint</div>
            </div>
        </Modal>
    );
}

interface StatItemProps {
    label: string;
    value: string;
}

const StatItem: React.FC<StatItemProps> = ({ label, value }) => (
    <div className="modal-stat-item">
        <div className="modal-stat-label">{label}</div>
        <div className="modal-stat-value">{value}</div>
    </div>
);

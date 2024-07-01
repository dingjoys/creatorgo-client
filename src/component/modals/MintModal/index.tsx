import { useCallback, useEffect, useState, useMemo } from 'react';
import './index.scss';
import Modal from 'react-modal';
import { useAccount } from 'wagmi';
import { toast } from 'react-toastify';
import { ReactComponent as IconClose } from '@/component/icons/svg/close.svg';
import { formatNumberToMK } from '@/utils/numberUtils';
import moment from 'moment';
import axios from 'axios';
import useSWR from 'swr';
import { fetchMyAttestion } from '@/component/modules/Menu';

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

const request = axios.create({
    baseURL: 'https://creatorgo.metopia.xyz/api',
});

export default function MintModal({ hide, isShow }: { hide; isShow }) {
    const { address } = useAccount();
    const [myData, setMyData] = useState<{
        address: string;
        contracts: {
            metadata: string;
            address: string;
            supply: number;
            uniqueHolderNumber: number;
            whaleNumber: number;
        }[];
        best_srcs: string[];
        score: number;
        uniqueHolderNumber: number;
        minters: number;
        whaleNumber: number;
        rank: number;
        zora: { avatar };
    }>();
    const [loading, setLoading] = useState(false);
    async function fetchListData(address?: string) {
        if (address) {
            const res = (
                await request.get(`/creator/data?owner=${address}`, {
                    timeout: 20000,
                })
            )?.data;
            setMyData(res.data);
        }
    }
    useEffect(() => {
        if (address) {
            fetchListData(address);
        }
    }, [address]);
    const leftColumnData: StatItemProps[] = useMemo(
        () => [
            { label: 'Collections', value: myData?.contracts?.length || 0 },
            { label: 'Total Mints', value: formatNumberToMK(myData?.minters || 0) },
        ],
        [myData],
    );

    const rightColumnData: StatItemProps[] = useMemo(
        () => [
            // { label: 'Total Gas', value: '$437.25' },
            { label: 'Holders', value: formatNumberToMK(myData?.uniqueHolderNumber || 0) },
            { label: 'Whales', value: formatNumberToMK(myData?.whaleNumber || 0) },
            // { label: 'Blue Chip Holders', value: '41' },
        ],
        [myData],
    );
    const imageUrl = myData?.zora?.avatar; //'https://metopia.oss-cn-hongkong.aliyuncs.com/imgs/default-user-avatar-square.png';
    const score = `${myData?.score || 0}′ / 100`;
    const lastUpdateTime = moment().format('MM/DD/YY');

    const { mutate: mutateMyAttestation } = useSWR(
        address ? [address, 'fetchMyAttestion'] : null,
        fetchMyAttestion,
        {
            refreshInterval: 0,
            refreshWhenHidden: false,
        },
    );

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
                <div
                    className={`modal-mint-btn ${address || loading ? '' : 'disabled'}`}
                    onClick={() => {
                        if (address && !loading) {
                            setLoading(true);
                            axios
                                .get(`https://creatorgo.metopia.xyz/api/issue?owner=${address}`)
                                .then(() => {
                                    fetchMyAttestion(address).then(mutateMyAttestation);
                                    toast('Attestation has been upload');
                                    hide();
                                })
                                .finally(() => {
                                    setLoading(false);
                                });
                        }
                    }}
                >
                    {loading ? '...' : 'Mint'}
                </div>
                <div className="modal-mint-footer">Built on EAS</div>
            </div>
        </Modal>
    );
}

interface StatItemProps {
    label: string;
    value: string | number;
}

const StatItem: React.FC<StatItemProps> = ({ label, value }) => (
    <div className="modal-stat-item">
        <div className="modal-stat-label">{label}</div>
        <div className="modal-stat-value">{value}</div>
    </div>
);

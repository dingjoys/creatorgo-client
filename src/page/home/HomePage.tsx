import { ReactComponent as IconArrow } from '@/component/icons/svg/arrow-right-short.svg';
import { ReactComponent as IconClose } from '@/component/icons/svg/close.svg';
import { ReactComponent as IconPlus } from '@/component/icons/svg/plus.svg';
import './HomePage.scss';

import { useState } from 'react';
import { useAccount } from 'wagmi';

import useIsMobile from '@/core/useMobile';
import { useEthersSigner } from '@/core/wallet/utils';
import { useDebouncedCallback } from 'use-debounce';
import EmptyDataHint from '@/component/EmptyDataHint';
import MintModal from '@/component/modals/MintModal';

export default function HomePage() {
    const { isMobile } = useIsMobile();
    const { address } = useAccount();
    const signer = useEthersSigner();
    const [searchText, setsearchText] = useState('');
    const list = [
        {
            id: 1,
            stats: [
                { label: 'Collections', value: '12' },
                { label: 'Total Gas', value: '$437.25' },
                { label: 'Total Mints', value: '26.77K' },
                { label: 'Holders', value: '1.39K' },
                { label: 'Whales', value: '72' },
                { label: 'Blue Chip Holders', value: '41' },
            ],
            rank: 1,
            name: 'Aden3.eth',
            score: 73.9,
            avatar: 'https://metopia.oss-cn-hongkong.aliyuncs.com/imgs/default-user-avatar.png',
            images: [
                'https://metopia.oss-cn-hongkong.aliyuncs.com/imgs/default-user-avatar.png',
                'https://metopia.oss-cn-hongkong.aliyuncs.com/imgs/default-user-avatar.png',
                'https://metopia.oss-cn-hongkong.aliyuncs.com/imgs/default-user-avatar.png',
                'https://metopia.oss-cn-hongkong.aliyuncs.com/imgs/default-user-avatar.png',
                'https://metopia.oss-cn-hongkong.aliyuncs.com/imgs/default-user-avatar.png',
            ],
        },
        {
            id: 2,
            stats: [
                { label: 'Collections', value: '12' },
                { label: 'Total Gas', value: '$437.25' },
                { label: 'Total Mints', value: '26.77K' },
                { label: 'Holders', value: '1.39K' },
                { label: 'Whales', value: '72' },
                { label: 'Blue Chip Holders', value: '41' },
            ],
            rank: 1,
            name: 'Aden3.eth',
            score: 73.9,
            avatar: 'https://metopia.oss-cn-hongkong.aliyuncs.com/imgs/default-user-avatar.png',
            images: [
                'https://metopia.oss-cn-hongkong.aliyuncs.com/imgs/default-user-avatar.png',
                'https://metopia.oss-cn-hongkong.aliyuncs.com/imgs/default-user-avatar.png',
                'https://metopia.oss-cn-hongkong.aliyuncs.com/imgs/default-user-avatar.png',
                'https://metopia.oss-cn-hongkong.aliyuncs.com/imgs/default-user-avatar.png',
                'https://metopia.oss-cn-hongkong.aliyuncs.com/imgs/default-user-avatar.png',
            ],
        },
    ];
    const [currentShowImageId, setCurrentShowImageId] = useState(-1);

    const getList = (keyword) => {
        console.log('getList');
        return 1;
    };
    const foo = useDebouncedCallback((keyword) => {
        getList(keyword);
    }, 500);

    const [isShowModal, setShowModal] = useState(false);
    return (
        <div className={`artela-page ${isMobile ? 'is-mobile' : ''}`}>
            <section className="artela-page-1">
                <div className="artela-page-middle">
                    <div className="apm-title">
                        Let more people
                        <br />
                        discover your artwork
                    </div>
                    <div className="apm-mint">
                        <IconArrow />
                        Click to
                        <div className="apm-mint-btn" onClick={() => setShowModal(true)}>
                            mint your credential
                        </div>
                    </div>
                </div>
            </section>
            <section className="artela-page-2">
                <div className="ap2-container">
                    <div className={`ap2-search ${searchText ? 'highlight' : ''}`}>
                        <input
                            className="ap2-search-input"
                            value={searchText}
                            placeholder="Search Creators"
                            onChange={(e) => {
                                setsearchText(e.target?.value);
                                foo(e.target?.value);
                            }}
                        />
                        {!searchText ? (
                            <IconPlus />
                        ) : (
                            <IconClose
                                style={{
                                    cursor: 'pointer',
                                }}
                                onClick={() => {
                                    setsearchText('');
                                }}
                            />
                        )}
                    </div>
                    {list.length ? (
                        <ul className="ap2-list">
                            {list.map((item) => {
                                return (
                                    <li className="ap2-list-item" key={item.id}>
                                        <div className="ap2-list-item-left">
                                            <ProfileCard
                                                rank={item.rank}
                                                name={item.name}
                                                score={item.score}
                                                avatarSrc={item.avatar}
                                            />

                                            <section className="ap2-stats-container">
                                                {item.stats.map((stat, index) => (
                                                    <StatItem
                                                        key={index}
                                                        label={stat.label}
                                                        value={stat.value}
                                                    />
                                                ))}
                                            </section>
                                        </div>
                                        <div className="ap2-list-item-right">
                                            <img
                                                src={item.images?.[0]}
                                                alt=""
                                                className="ap2-right-img"
                                                onMouseEnter={() => {
                                                    setCurrentShowImageId(item.id);
                                                }}
                                                onMouseLeave={() => {
                                                    setCurrentShowImageId(-1);
                                                }}
                                            />
                                            {currentShowImageId == item.id && (
                                                <ImageModal images={item.images} />
                                            )}
                                        </div>
                                    </li>
                                );
                            })}
                        </ul>
                    ) : (
                        <div>
                            <EmptyDataHint
                                content={'No creator found'}
                                otherContent={
                                    <div
                                        style={{
                                            color: '#7D809A',
                                            textAlign: 'center',
                                            fontSize: '16px',
                                        }}
                                    >
                                        There were no entries that matched
                                        <br />
                                        {`"${searchText}"`}
                                    </div>
                                }
                            />
                        </div>
                    )}
                </div>
            </section>

            <MintModal isShow={isShowModal} hide={() => setShowModal(false)} />
        </div>
    );
}

type ProfileCardProps = {
    name: string;
    score: number;
    avatarSrc: string;
    rank: number;
};

const ProfileCard: React.FC<ProfileCardProps> = ({ rank, name, score, avatarSrc }) => {
    return (
        <div className="ap2-profile-card">
            <div className="ap2-profile-left">
                <span className="ap2-avatar-rank">{rank}</span>
                <span className="ap2-avatar-container">
                    <img
                        loading="lazy"
                        src={avatarSrc}
                        alt={`${name}'s avatar`}
                        className="ap2-avatar-image"
                    />
                    <img loading="lazy" src={avatarSrc} alt="" className="ap2-social-image" />
                </span>
            </div>

            <h2 className="ap2-profile-name">{name}</h2>
            <p className="ap2-profile-score">
                <span className="ap2-score-value">{score}</span>′
            </p>
        </div>
    );
};

type StatItemProps = {
    label: string;
    value: string;
};

const StatItem: React.FC<StatItemProps> = ({ label, value }) => (
    <div className="ap2-stat-item">
        <span className="ap2-stat-label">{label}</span>
        <span className="ap2-stat-value">{value}</span>
    </div>
);

const ImageModal = ({ images }) => {
    return (
        <div className="ap2-image-modal">
            <div className="ap2-image-container">
                {images.map((item) => {
                    return <img src={item} alt="" className="ap2-image-modal-img" key={item} />;
                })}
            </div>
        </div>
    );
};

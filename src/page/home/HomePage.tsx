import { ReactComponent as IconArrow } from '@/component/icons/svg/arrow-right-short.svg';
import { ReactComponent as IconClose } from '@/component/icons/svg/close.svg';
import { ReactComponent as IconPlus } from '@/component/icons/svg/plus.svg';
import { ReactComponent as IconFarcaster } from '@/component/icons/svg/farcaster.svg';
import { ReactComponent as IconDefaultAvatar } from '@/component/icons/svg/default-avatar.svg';
import './HomePage.scss';

import { useEffect, useState } from 'react';

import useIsMobile from '@/core/useMobile';
import { useEthersSigner } from '@/core/wallet/utils';
import { useDebouncedCallback } from 'use-debounce';
import EmptyDataHint from '@/component/EmptyDataHint';
import MintModal from '@/component/modals/MintModal';
import { Checkbox } from '@/component/form/Checkbox';
import { isAddress } from 'viem';
import { getFarcasterByAddresses } from '@/core/home/neynar';
import { getAdaptiveUsername, getAdaptiveUserAvatar } from '@/utils/userUtils';
import { formatNumberToMK } from '@/utils/numberUtils';
import useSWR from 'swr';
import { useAccount } from 'wagmi';
import { fetchMyAttestion } from '@/component/modules/Menu';
import axios from 'axios';
import { getZoraSrc } from '@/core/metadataReader';
type Address = `0x${string}`;
const defaultAvatar =
    'https://metopia.oss-cn-hongkong.aliyuncs.com/imgs/default-user-avatar-square.png';

const getShortAddress = (address) => `${address.substr(0, 6)}...${address.substr(-4)}`;
export default function HomePage() {
    const { isMobile } = useIsMobile();
    const signer = useEthersSigner();
    const [searchText, setSearchText] = useState('');
    const [ensNameArr, setEnsNameArr] = useState<{ name: string; address: string }[]>([]);
    const [ensAvatarArr, setEnsAvatarArr] = useState<{ address: string; avatar: string }[]>([]);
    const [list, setList] = useState<any[]>([]);
    const [farcasterUserMap, setFarcasterUserMap] = useState({});
    async function getFarcasterInfo(accounts: string[]) {
        const searchAccounts = accounts.filter(
            (item) => !Object.keys(farcasterUserMap).includes(item),
        );
        console.log('searchAccounts', searchAccounts);
        if (searchAccounts.length) {
            const res = await getFarcasterByAddresses(accounts);
            if (res.data) {
                setFarcasterUserMap(Object.assign({}, farcasterUserMap, res.data || {}));
            }
        }
    }
    // function getUsersName(accounts: string[]) {
    //     return Promise.all(
    //         accounts
    //             .filter((item) => !ensNameArr.map((a) => a.address).includes(item))
    //             .map(async (account) => {
    //                 const name = await getAdaptiveUsername(account);
    //                 return {
    //                     address: account,
    //                     name: isAddress(name) ? getShortAddress(account) : name,
    //                 };
    //             }),
    //     ).then((result) => {
    //         setEnsNameArr(result);
    //     });
    // }
    function getUsersAvatar(accounts: string[]) {
        return Promise.all(
            accounts
                .filter((item) => !ensAvatarArr.map((a) => a.address).includes(item))
                .map(async (account) => {
                    const avatar = await getAdaptiveUserAvatar(account);
                    return {
                        address: account,
                        avatar: avatar,
                    };
                }),
        ).then((result) => {
            setEnsAvatarArr(result);
        });
    }
    useEffect(() => {
        fetchListData();
    }, []);

    async function fetchListData(keywork?: string) {
        const data = await Promise.resolve(
            axios.get('http://8.218.161.115:3036/api/creators/random').then((res) => {
                const list = res.data;
                console.log(list);
                return list.data.map((item) => {
                    return {
                        stats: [
                            { label: 'Collections', value: item.collections?.length },
                            // { label: 'Total Gas', value: '$437.25' },
                            { label: 'Total Mints', value: item.minted },
                            { label: 'Holders', value: item.uniqueHolderNumber },
                            { label: 'Whales', value: item.whaleNumber },
                            // { label: 'Blue Chip Holders', value: '41' },
                        ],
                        address: item.address,
                        score: item.score?.toFixed(1)||0,
                        collections: item.collections,
                        zora: item.zora,
                    };
                });
            }),
        );
        console.log(data);
        // const temp = data?.map((item) => {
        //     return {
        //         stats: [
        //             { label: 'Collections', value: item.contracts?.length },
        //             // { label: 'Total Gas', value: '$437.25' },
        //             { label: 'Total Mints', value: formatNumberToMK(item.minters) },
        //             { label: 'Holders', value: formatNumberToMK(item.uniqueHolderNumber) },
        //             { label: 'Whales', value: formatNumberToMK(item.whaleNumber) },
        //             // { label: 'Blue Chip Holders', value: '41' },
        //         ],
        //         address: item.address,
        //         rank: item.rank,
        //         score: item.score,
        //         images: item.best_srcs,
        //     };
        // });
        setList(data);
    }

    useEffect(() => {
        const accounts = list.map((item) => item.address);
        // getUsersName(accounts);
        getFarcasterInfo(accounts);
        getUsersAvatar(accounts);
    }, [list]);

    const [currentShowImageId, setCurrentShowImageId] = useState('');

    const foo = useDebouncedCallback((keyword) => {
        fetchListData(keyword);
    }, 500);

    const [isShowModal, setShowModal] = useState(false);
    const [isFollowed, setisFollowed] = useState(false);

    const { address } = useAccount();
    const { data: myAttestation, mutate: mutateMyAttestation } = useSWR(
        address ? [address, 'fetchMyAttestion'] : null,
        fetchMyAttestion,
        {
            refreshInterval: 0,
            refreshWhenHidden: false,
        },
    );

    return (
        <div className={`artela-page ${isMobile ? 'is-mobile' : ''}`}>
            <section className="artela-page-1">
                <video
                    muted={true}
                    src="https://oss.metopia.xyz/imgs/creatorgo/creatorgo-home-bg.webm"
                    autoPlay={true}
                    controls={false}
                    loop={true}
                    className="artela-page-bg"
                ></video>
                <div className="artela-page-middle">
                    <div className="apm-title">
                        Let more people
                        <br />
                        discover your artwork
                    </div>
                    <div className="apm-mint">
                        <IconArrow />
                        Click to
                        {address ? (
                            <div className="apm-mint-btn" onClick={() => setShowModal(true)}>
                                {myAttestation?.length ? 'attest your power' : 'update your power'}
                            </div>
                        ) : (
                            <div
                                className="apm-mint-btn"
                                onClick={() =>
                                    document.getElementById('connect-wallet-button').click()
                                }
                            >
                                connect your account
                            </div>
                        )}
                    </div>
                </div>
            </section>
            <section className="artela-page-2">
                <div className="ap2-container">
                    <div className="ap2-header">
                        {/* <div className="ap2-header-check">
                            <Checkbox
                                size="24px"
                                shape="square"
                                value={isFollowed}
                                onChange={(value) => {
                                    setisFollowed(value);
                                }}
                            />
                            Following
                        </div> */}
                        <div className={`ap2-search ${searchText ? 'highlight' : ''}`}>
                            <input
                                className="ap2-search-input"
                                value={searchText}
                                placeholder="Search Creators"
                                onChange={(e) => {
                                    setSearchText(e.target?.value);
                                    // foo(e.target?.value);
                                }}
                            />
                            <div
                                onClick={() => {
                                    window.location.href = `/detail/${searchText}`;
                                }}
                                style={{
                                    cursor: 'pointer',
                                }}
                            >
                                <IconPlus />
                            </div>
                            {/* {!searchText ? (
                                
                            ) 
                            : (
                                <IconClose
                                    style={{
                                        cursor: 'pointer',
                                    }}
                                    onClick={() => {
                                        setSearchText('');
                                    }}
                                />
                            )} */}
                        </div>
                    </div>

                    {list?.length ? (
                        <ul className="ap2-list">
                            {list.map((item) => {
                                // const ensname =
                                //     ensNameArr.find((a) => a.address === item.address)?.name || '-';
                                // const ensavatar = ensAvatarArr.find(
                                //     (a) => a.address === item.address,
                                // )?.avatar;
                                console.log('farcasterUserMap', farcasterUserMap);
                                const farcasterItem =
                                    farcasterUserMap[String(item.address).toLowerCase()];
                                const farcasterName = farcasterItem?.[0]?.username;
                                return (
                                    <li className="ap2-list-item" key={item.address}>
                                        <div className="ap2-list-item-left">
                                            <ProfileCard
                                                avatarSrc={getZoraSrc(item.zora.avatar)}
                                                score={item.score}
                                                name={item.zora.displayName || item.address}
                                                farcasterName={farcasterName}
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
                                                    setCurrentShowImageId(item.address);
                                                }}
                                                onMouseLeave={() => {
                                                    setCurrentShowImageId('');
                                                }}
                                            />
                                            {currentShowImageId == item.address && (
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
    farcasterName: string;
};

const ProfileCard: React.FC<ProfileCardProps> = ({ name, score, avatarSrc, farcasterName }) => {
    return (
        <div className="ap2-profile-card">
            <div className="ap2-profile-left">
                {/* <span className="ap2-avatar-rank">{rank}</span> */}
                <span className="ap2-avatar-container">
                    {avatarSrc ? (
                        <img
                            loading="lazy"
                            src={avatarSrc}
                            alt={`${name}'s avatar`}
                            className="ap2-avatar-image"
                        />
                    ) : (
                        <IconDefaultAvatar width="32px" height="32px" />
                    )}

                    {farcasterName && (
                        <IconFarcaster
                            className="ap2-social-image"
                            onClick={() => {
                                window.open(`https://warpcast.com/${farcasterName}`);
                            }}
                        />
                    )}
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
    value: string | number;
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

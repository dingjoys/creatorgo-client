import { useEffect, useMemo, useState } from 'react';
import './index.scss';
import { ReactComponent as IconClose } from '@/component/icons/svg/close-border.svg';
import { ReactComponent as IconBadge1 } from '@/component/icons/svg/badge1.svg';
import { ReactComponent as IconBadge2 } from '@/component/icons/svg/badge2.svg';
import MyGraph from './MyGraph';
import { useParams } from 'react-router-dom';
import { getCreatorData, CreatorDetail } from '@/core/home/neynar';
import { getProfile } from '@/core/home/user';
import { formatPrice } from '@/utils/numberUtils';
import moment from 'moment';
import { getTopMinters } from '@/core/home/minters';
import { getBlock } from 'wagmi/actions';
import wagmiConfig from '@/walletConfig';
import IpfsImage from '@/component/IpfsImage';
const defaultAvatar =
    'https://metopia.oss-cn-hongkong.aliyuncs.com/imgs/default-user-avatar-square.png';
const zoraChain = 'https://metopia.oss-cn-hongkong.aliyuncs.com/imgs/creatorgo/zora.png';

export default function Detail() {
    const { owner } = useParams();
    const [blockMap, setblockMap] = useState({});
    const [user, setUser] = useState<{
        avatar: string;
        name: string;
        description: string;
        farcaster: string | null;
        twitter: string | null;
        followers: string | null;
        following: string | null;
    }>();
    useEffect(() => {
        fetchCreatorData(owner);
        // fetchUserProfile(owner);
        // fetchTopMinters(owner);
    }, [owner]);

    const [creatorData, setCreatorData] = useState<CreatorDetail>();
    async function fetchCreatorData(owner) {
        if (!owner) return;
        const data = await getCreatorData(owner);
        setCreatorData(data);
        if (data?.firstMintBlockNumber) {
            getBlockInfo(data?.firstMintBlockNumber);
        }
        const userInfo = data?.zora;
        setUser({
            avatar:
                (userInfo?.avatar?.indexOf('http') == -1
                    ? `https://zora.co${userInfo?.avatar}`
                    : userInfo?.avatar) || defaultAvatar,
            name: userInfo?.username,
            farcaster: userInfo?.extension?.links?.farcaster,
            twitter: userInfo?.extension?.links?.twitter,
            description: userInfo?.description,
            followers: userInfo?.totalFollowers,
            following: userInfo?.totalFollowing,
        });
        settopMinters(data?.recentMints);
        data?.recentMints?.forEach((item) => {
            if (item.block_number) {
                getBlockInfo(item.block_number);
            }
        });
    }
    const [topMinters, settopMinters] = useState([]);
    // async function fetchTopMinters(owner) {
    //     if (!owner) return;
    //     const data = await getTopMinters(owner);
    //     settopMinters(data?.topMinters || []);

    //     setMintInfo({
    //         minterCount: data?.minterCount,
    //         totalTxFees: data?.totalTxFees,
    //         totalValue: data?.totalValue,
    //     });
    // }
    // async function fetchUserProfile(owner) {
    //     if (!owner) return;
    //     const userInfo = await getProfile(owner);
    //     if (userInfo) {
    //         setUser({
    //             avatar: userInfo?.userAvatar || defaultAvatar,
    //             name: userInfo?.username,
    //             farcaster: userInfo?.socialAccounts?.farcaster,
    //             twitter: userInfo?.socialAccounts?.twitter,
    //             description: userInfo?.description,
    //         });
    //     }
    // }

    const [activeTab, setActiveTab] = useState(1);

    const minters = useMemo(() => {
        const totalTokens = creatorData?.collections?.reduce((arr, item) => {
            arr = arr.concat(item.tokens);
            return arr;
        }, []);
        return topMinters?.map((item) => {
            const token = totalTokens.find(
                (token) => token.contract == item.contract && token.tokenId == item.token_id,
            );
            return {
                avatarSrc: token?.img?.image || defaultAvatar,
                username: token?.img?.name,
                itemCount: item?.total_amount,
                isBadge1: false,
                isBadge2: false,
                hasFarcaster: false,
            };
        });
    }, [topMinters, creatorData?.collections]);

    const nftData = useMemo<NFTCardProps[]>(() => {
        const totalTokens = creatorData?.collections?.reduce((arr, item) => {
            arr = arr.concat(item.tokens);
            return arr;
        }, []);
        return (
            topMinters?.map((item) => {
                const token = totalTokens?.find(
                    (token) =>
                        token.contract == item.contract &&
                        Number(token.tokenId) == Number(item.token_id),
                );
                return {
                    imageSrc: token?.img?.image || defaultAvatar,
                    title: `${token?.img?.name} #${item.token_id}`,
                    mintedBy: item.minter,
                    blockNumber: item.block_number,
                };
            }) || []
        );
    }, [topMinters, creatorData?.collections]);

    const galleryData = useMemo(() => {
        return (
            creatorData?.collections?.map((item) => {
                const title = item.metadata?.name
                    ? item.metadata?.name
                    : item.tokens?.[0]?.img?.name;
                const src = item.metadata?.image
                    ? item.metadata?.image
                    : item.tokens?.[0]?.img?.image;
                return {
                    src: src || defaultAvatar,
                    title: title,
                };
            }) || []
        );
    }, [creatorData?.collections]);

    const [selectedGallery, setselectedGallery] = useState(-1);
    const galleryImages = useMemo(() => {
        if (selectedGallery == -1) {
            return (
                creatorData?.collections
                    ?.reduce((arr, item) => {
                        arr = arr.concat(
                            item.tokens.map((token) => ({
                                ...token,
                                collectioMetadata: item.metadata,
                            })),
                        );
                        return arr;
                    }, [])
                    ?.map((item) => {
                        return {
                            image: item?.img?.image || defaultAvatar,
                            title: item?.img?.name || 'title',
                            chainIcon: zoraChain,
                            authorAvatar: item.collectioMetadata?.image || defaultAvatar,
                            authorName: item.collectioMetadata?.name,
                            mintedCount: item.total_amount,
                        };
                    }) || []
            );
        }
        return (
            creatorData?.collections?.[selectedGallery]?.tokens?.map((item) => {
                const collection = creatorData?.collections?.[selectedGallery];
                return {
                    image: item?.img?.image || defaultAvatar,
                    title: item?.img?.name || 'title',
                    chainIcon: zoraChain,
                    authorAvatar: collection?.metadata?.image,
                    authorName: collection?.metadata?.name,
                    mintedCount: item.total_amount,
                };
            }) || []
        );
    }, [creatorData?.collections, selectedGallery]);

    const getBlockInfo = async (block_number: number) => {
        if (blockMap[block_number]) {
            return blockMap[block_number];
        }

        const block = await getBlock(wagmiConfig, { blockNumber: BigInt(block_number) });
        blockMap[block_number] = block;
        setblockMap({ ...blockMap });
        return block;
    };
    return (
        <div className="detail-wrapper">
            <div className="detail-side-bar">
                <ul className="dsc-list">
                    <li
                        className={`dsb-item ${activeTab == 1 ? 'active' : ''}`}
                        onClick={() => {
                            setActiveTab(1);
                        }}
                    >
                        Overview
                    </li>
                    <li
                        className={`dsb-item ${activeTab == 2 ? 'active' : ''}`}
                        onClick={() => {
                            setActiveTab(2);
                        }}
                    >
                        Collections
                    </li>
                </ul>
            </div>
            {activeTab == 1 ? (
                <div className="detail-overview">
                    <div className="detail-info">
                        <div className="di-title">About Creator</div>
                        <div className="di-user">
                            <div className="diu-avatar">
                                <img src={user?.avatar} alt="" />
                            </div>
                            <div className="diu-right">
                                <header className="diu-profile-header">
                                    <div className="diu-profile-info">
                                        <h1 className="diu-profile-name">{user?.name}</h1>
                                        <span className="diu-profile-score">
                                            {Number(creatorData?.score)?.toFixed(1)}′
                                        </span>
                                        <div className="diu-profile-actions">
                                            {/* <button className="diu-follow-button">Follow</button> */}

                                            {user?.farcaster ? (
                                                <IconButton
                                                    onClick={() => {
                                                        window.open('user.farcaster');
                                                    }}
                                                    src={
                                                        'https://metopia.oss-cn-hongkong.aliyuncs.com/imgs/creatorgo/farcaster.png'
                                                    }
                                                    alt="First action"
                                                />
                                            ) : null}

                                            {user?.twitter ? (
                                                <IconButton
                                                    onClick={() => {
                                                        window.open('user.twitter');
                                                    }}
                                                    src={
                                                        'https://metopia.oss-cn-hongkong.aliyuncs.com/imgs/creatorgo/twitter.png'
                                                    }
                                                    alt="First action"
                                                />
                                            ) : null}
                                        </div>
                                    </div>

                                    <p className="diu-profile-description">{user?.description}</p>
                                    <p className="diu-profile-followers">
                                        <strong>{user?.followers}</strong> followers
                                    </p>
                                </header>
                            </div>
                        </div>
                        <div className="di-details">
                            <div className="di-title">Details</div>
                            <section className="dd-stats-container">
                                <div className="dd-stats-item">
                                    <div className="dd-stats-row">
                                        <div className="dd-stats-key">Chain</div>
                                        <div className="dd-stats-value">Zora</div>
                                    </div>
                                    <div className="dd-stats-row">
                                        <div className="dd-stats-key">Unique minters</div>
                                        <div className="dd-stats-value">
                                            {creatorData?.uniqueHolderNumber}
                                        </div>
                                    </div>
                                    {/* <div className="dd-stats-row">
                                        <div className="dd-stats-key">Earnings</div>
                                        <div className="dd-stats-value">75.21 ETH</div>
                                    </div> */}
                                </div>
                                <div className="dd-stats-item">
                                    <div className="dd-stats-row">
                                        <div className="dd-stats-key">Total minted</div>
                                        <div className="dd-stats-value">
                                            {creatorData?.totalMint
                                                ? formatPrice(creatorData?.totalMint)
                                                : creatorData?.totalMint}{' '}
                                            items
                                        </div>
                                    </div>
                                    <div className="dd-stats-row">
                                        <div className="dd-stats-key">First timestamp</div>
                                        <div className="dd-stats-value">
                                            {creatorData?.firstMintBlockNumber &&
                                            blockMap[creatorData?.firstMintBlockNumber]
                                                ? moment(
                                                      Number(
                                                          blockMap[
                                                              creatorData?.firstMintBlockNumber
                                                          ]?.timestamp,
                                                      ) * 1000,
                                                  ).format('MMM,DD,YYYY H:MM')
                                                : '-'}
                                        </div>
                                    </div>
                                    {/* <div className="dd-stats-row">
                                        <div className="dd-stats-key">Total gas</div>
                                        <div className="dd-stats-value">2.63 ETH</div>
                                    </div> */}
                                </div>
                            </section>
                        </div>
                        <div>
                            <div className="di-title">
                                Farcaster minters
                                <div className="di-subtitle">Top minters</div>
                            </div>
                            <div className="di-minters">
                                {minters?.map((item, index) => (
                                    <Profile
                                        key={index}
                                        avatarSrc={item.avatarSrc}
                                        username={item.username}
                                        isBadge1={item.isBadge1}
                                        isBadge2={item.isBadge2}
                                        itemCount={item.itemCount}
                                    />
                                ))}
                            </div>
                        </div>
                        <div>
                            <div className="di-title">Mint history</div>
                            <section className="nft-wrapper">
                                {nftData.map((nft, index) => {
                                    const blockTime = blockMap[nft.time]?.timestamp
                                        ? Number(blockMap[nft.time]?.timestamp) * 1000
                                        : 0;
                                    const duration = moment.duration(moment().diff(blockTime));
                                    const h = duration.hours();
                                    const m = duration.minutes();
                                    const s = duration.minutes();
                                    return <NFTCard key={index} {...nft} time={h + 'H'} />;
                                })}
                            </section>
                        </div>
                    </div>
                    <div className="detail-chart">
                        <div className="dc-title">Creator onchain trajectory</div>
                        <MyGraph
                            collections={creatorData?.collections || []}
                            creatorName={user?.name}
                        />
                    </div>
                </div>
            ) : (
                <div className="detail-collection">
                    <section className="detail-image-gallery">
                        {galleryData.map((item, index) => (
                            <GalleryItem
                                title={item.title}
                                key={index}
                                src={item.src}
                                clean={() => {
                                    setselectedGallery(-1);
                                }}
                                setSelected={() => {
                                    setselectedGallery(index);
                                }}
                                isSelected={selectedGallery == index}
                            />
                        ))}
                    </section>
                    <section className="detail-collection-list">
                        {galleryImages.map((item, index) => (
                            <Post
                                imageUrl={item.image}
                                title={item.title}
                                chainIcon={item.chainIcon}
                                authorIconUrl={item.authorAvatar}
                                authorName={item.authorName}
                                time={item.mintedCount}
                            />
                        ))}
                    </section>
                </div>
            )}
        </div>
    );
}

interface PostProps {
    imageUrl: string;
    title: string;
    chainIcon: string;
    authorIconUrl: string;
    authorName: string;
    time: number | string;
}

const Post: React.FC<PostProps> = ({
    imageUrl,
    title,
    chainIcon,
    authorIconUrl,
    authorName,
    time,
}) => {
    return (
        <article className="post-container">
            <IpfsImage src={imageUrl} className="post-image" />
            <div className="post-content">
                <div className="post-details">
                    <div className="post-title">
                        <div className="post-title-text">{title}</div>
                        <img src={chainIcon} alt="" className="post-title-icon" />
                    </div>
                    <div className="post-author">
                        <img src={authorIconUrl} alt="" className="post-author-icon" />
                        <div className="post-author-name">
                            <span className="post-author-from">From</span> {authorName}
                        </div>
                    </div>
                </div>
                <time className="post-time">{time}Mints</time>
            </div>
        </article>
    );
};
interface GalleryItemProps {
    src: string;
    title: string;
    isSelected?: boolean;
    setSelected: () => void;
    clean: () => void;
}

const GalleryItem: React.FC<GalleryItemProps> = ({
    src,
    title,
    isSelected,
    setSelected,
    clean,
}) => (
    <div
        className={`detail-gallery-item ${isSelected ? 'is-selected' : ''}`}
        onClick={() => {
            setSelected();
        }}
    >
        {isSelected ? (
            <div className="dgi-close">
                <IconClose
                    onClick={(e) => {
                        e.stopPropagation();
                        clean();
                    }}
                />
            </div>
        ) : null}
        <IpfsImage src={src} className="detail-gallery-image" />
        <div className="detail-gallery-title">{title}</div>
    </div>
);
const IconButton: React.FC<{ src: string; alt: string; onClick: () => void }> = ({
    src,
    alt,
    onClick,
}) => (
    <button className="diu-icon-button" onClick={onClick}>
        <img loading="lazy" src={src} alt={alt} className="diu-icon" />
    </button>
);

interface ProfileProps {
    avatarSrc: string;
    username: string;
    isBadge1: boolean;
    isBadge2: boolean;
    itemCount: number;
}

const Profile: React.FC<ProfileProps> = ({
    avatarSrc,
    username,
    isBadge1,
    isBadge2,
    itemCount,
}) => {
    return (
        <>
            <div className="detail-profile-container">
                <div className="detail-user-info">
                    <IpfsImage src={avatarSrc} className="detail-avatar" />
                    <div className="detail-username-container">
                        <div className="detail-username">{username}</div>
                        <div className="detail-badge-container">
                            {isBadge1 ? <IconBadge1 className="detail-badge" /> : null}
                            {isBadge2 ? <IconBadge2 className="detail-badge" /> : null}
                        </div>
                    </div>
                </div>
                <span className="detail-profile-line"></span>
                <div className="detail-item-count"> {itemCount} items</div>
            </div>
        </>
    );
};

interface NFTCardProps {
    imageSrc: string;
    title: string;
    mintedBy: string;
    price: string;
    time: string | number;
}

const NFTCard: React.FC<NFTCardProps> = ({ imageSrc, title, mintedBy, price, time }) => (
    <article className="nft-card">
        <IpfsImage src={imageSrc} className="nft-image" />
        <h3 className="nft-title">{title}</h3>
        <div className="nft-minter">
            <span className="minted-by">Minted by</span>
            <span className="minter-address">{mintedBy}</span>
        </div>
        <div className="nft-details">
            <span className="nft-price">{price}</span>
            <span className="nft-detail-line"></span>
            <span className="nft-time">{time}</span>
        </div>
    </article>
);

import { ReactNode, useEffect, useState } from 'react';
import './index.scss';

const defaultAvatar =
    'https://metopia.oss-cn-hongkong.aliyuncs.com/imgs/default-user-avatar-square.png';

export default function Detail() {
    const [user, setUser] = useState<{
        avatar: string;
        name: string;
        id: string;
        score: number;
        description: string;
        followers: number;
    }>();

    useEffect(() => {
        fetchCreator();
    }, []);

    function fetchCreator() {
        setUser({
            avatar: defaultAvatar,
            name: 'Manveliyo',
            id: '1',
            score: 92.7,
            followers: 20000,
            description: 'visual artist and researcher in Australia, like life & like art!',
        });
    }
    const [activeTab, setActiveTab] = useState(1);

    const minters = [
        {
            avatarSrc: defaultAvatar,
            username: 'beninem',
            badges: [defaultAvatar, defaultAvatar],
            itemCount: 1203,
            hasFarcaster: true,
        },
        {
            avatarSrc: defaultAvatar,
            username: 'beninem',
            badges: [defaultAvatar, defaultAvatar],
            itemCount: 1203,
            hasFarcaster: true,
        },
        {
            avatarSrc: defaultAvatar,
            username: 'beninem',
            badges: [defaultAvatar, defaultAvatar],
            itemCount: 1203,
            hasFarcaster: true,
        },
        {
            avatarSrc: defaultAvatar,
            username: 'beninem',
            badges: [defaultAvatar, defaultAvatar],
            itemCount: 1203,
            hasFarcaster: true,
        },
        {
            avatarSrc: defaultAvatar,
            username: 'beninem',
            badges: [defaultAvatar, defaultAvatar],
            itemCount: 1203,
            hasFarcaster: true,
        },
        {
            avatarSrc: defaultAvatar,
            username: 'beninem',
            badges: [defaultAvatar, defaultAvatar],
            itemCount: 1203,
            hasFarcaster: true,
        },
        {
            avatarSrc: defaultAvatar,
            username: 'beninem',
            badges: [defaultAvatar, defaultAvatar],
            itemCount: 1203,
            hasFarcaster: true,
        },
    ];

    const nftData: NFTCardProps[] = [
        {
            imageSrc: defaultAvatar,
            title: 'Peace #1364',
            mintedBy: 'hatchlamasolingab...',
            price: '0.0025 ETH',
            time: '7h',
        },
        {
            imageSrc: defaultAvatar,
            title: 'My house #1364',
            mintedBy: 'hatchlamasolingab...',
            price: '0.0025 ETH',
            time: '7h',
        },
        {
            imageSrc: defaultAvatar,
            title: 'EmoEmo #1364',
            mintedBy: 'hatchlamasolingab...',
            price: '0.0025 ETH',
            time: '7h',
        },
        {
            imageSrc: defaultAvatar,
            title: 'Peace #1364',
            mintedBy: 'hatchlamasolingab...',
            price: '0.0025 ETH',
            time: '7h',
        },
        {
            imageSrc: defaultAvatar,
            title: 'Peace #1364',
            mintedBy: 'hatchlamasolingab...',
            price: '0.0025 ETH',
            time: '7h',
        },
    ];

    const galleryData: GalleryItemProps[] = [
        {
            src: defaultAvatar,
            alt: 'GENSON01 image',
            title: 'GENSON01',
        },
        {
            src: defaultAvatar,
            alt: 'Ruins at rest image',
            title: 'Ruins at rest',
        },
        {
            src: defaultAvatar,
            alt: 'The spaces a... image',
            title: 'The spaces a...',
        },
        {
            src: defaultAvatar,
            alt: 'masonry image',
            title: 'masonry',
        },
        {
            src: defaultAvatar,
            alt: 'enjoy arrow image',
            title: 'enjoy arrow',
        },
    ];

    const galleryImages = [
        {
            image: defaultAvatar,
            title: 'title',
            chainIcon: defaultAvatar,
            authorAvatar: defaultAvatar,
            authorName: 'GENSON01',
            mintedCount: 2323,
        },
        {
            image: defaultAvatar,
            title: 'title',
            chainIcon: defaultAvatar,
            authorAvatar: defaultAvatar,
            authorName: 'GENSON01',
            mintedCount: 2323,
        },
    ];

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
                                        <span className="diu-profile-score">{user?.score}′</span>
                                        <div className="diu-profile-actions">
                                            <button className="diu-follow-button">Follow</button>

                                            <IconButton src={defaultAvatar} alt="First action" />
                                            <IconButton src={defaultAvatar} alt="Second action" />
                                        </div>
                                    </div>

                                    <p className="diu-profile-description">{user?.description}</p>
                                    <p className="diu-profile-followers">
                                        <strong>{user?.followers.toLocaleString()}</strong>{' '}
                                        followers
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
                                        <div className="dd-stats-value">2,785(2%)</div>
                                    </div>
                                    <div className="dd-stats-row">
                                        <div className="dd-stats-key">Earnings</div>
                                        <div className="dd-stats-value">75.21 ETH</div>
                                    </div>
                                </div>
                                <div className="dd-stats-item">
                                    <div className="dd-stats-row">
                                        <div className="dd-stats-key">Total minted</div>
                                        <div className="dd-stats-value">76,522 items</div>
                                    </div>
                                    <div className="dd-stats-row">
                                        <div className="dd-stats-key">First timestamp</div>
                                        <div className="dd-stats-value">Mar 31, 2023, 4:22</div>
                                    </div>
                                    <div className="dd-stats-row">
                                        <div className="dd-stats-key">Total gas</div>
                                        <div className="dd-stats-value">2.63 ETH</div>
                                    </div>
                                </div>
                            </section>
                        </div>
                        <div>
                            <div className="di-title">
                                Farcaster minters
                                <div className="di-subtitle">Farcaster minters</div>
                            </div>
                            <div className="di-minters">
                                {minters.map((item, index) => (
                                    <Profile
                                        key={index}
                                        avatarSrc={item.avatarSrc}
                                        username={item.username}
                                        badges={item.badges}
                                        itemCount={item.itemCount}
                                    />
                                ))}
                            </div>
                        </div>
                        <div>
                            <div className="di-title">Mint history</div>
                            <section className="nft-wrapper">
                                {nftData.map((nft, index) => (
                                    <NFTCard key={index} {...nft} />
                                ))}
                            </section>
                        </div>
                    </div>
                    <div className="detail-chart"></div>
                </div>
            ) : (
                <div className="detail-collection">
                    <section className="detail-image-gallery">
                        {galleryData.map((item, index) => (
                            <GalleryItem key={index} {...item} />
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
    time: number;
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
            <img src={imageUrl} alt="" className="post-image" />
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
    alt: string;
    title: string;
}

const GalleryItem: React.FC<GalleryItemProps> = ({ src, alt, title }) => (
    <div className="detail-gallery-item">
        <img loading="lazy" src={src} alt={alt} className="detail-gallery-image" />
        <div className="detail-gallery-title">{title}</div>
    </div>
);
const IconButton: React.FC<{ src: string; alt: string }> = ({ src, alt }) => (
    <button className="diu-icon-button">
        <img loading="lazy" src={src} alt={alt} className="diu-icon" />
    </button>
);

interface ProfileProps {
    avatarSrc: string;
    username: string;
    badges: string[];
    itemCount: number;
}

const Profile: React.FC<ProfileProps> = ({ avatarSrc, username, badges, itemCount }) => {
    return (
        <>
            <div className="detail-profile-container">
                <div className="detail-user-info">
                    <img
                        loading="lazy"
                        src={avatarSrc}
                        alt={`${username}'s avatar`}
                        className="detail-avatar"
                    />
                    <div className="detail-username-container">
                        <div className="detail-username">{username}</div>
                        <div className="detail-badge-container">
                            {badges.map((badge, index) => (
                                <img
                                    loading="lazy"
                                    key={index}
                                    src={badge}
                                    alt={''}
                                    className="detail-badge"
                                />
                            ))}
                        </div>
                    </div>
                </div>
                <span className="detail-profile-line"></span>
                <div className="detail-item-count"> {itemCount.toLocaleString()} items</div>
            </div>
        </>
    );
};

interface NFTCardProps {
    imageSrc: string;
    title: string;
    mintedBy: string;
    price: string;
    time: string;
}

const NFTCard: React.FC<NFTCardProps> = ({ imageSrc, title, mintedBy, price, time }) => (
    <article className="nft-card">
        <img loading="lazy" src={imageSrc} alt={title} className="nft-image" />
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

import useSize from '@react-hook/size';
import { CSSProperties, useEffect, useMemo, useRef, useState } from 'react';
import ReactLoading from 'react-loading';
import './index.scss';

interface LazyLoadImageParam {
    src: string;
    alt?: string;
    className?: string;
    defaultSrc?: string;
    onError?;
    style?: CSSProperties;
    onClick?;
    title?: string;
}

interface NftImageParam {
    defaultSrc: string;
    chainId?: string;
    contract?: string;
    tokenId?: number;
    width: number;
    height?: number;
    className?: string;
    afterLoaded?;
}
const cacheBlobUrlPoor = [];
const WrappedLazyLoadImage = (image: LazyLoadImageParam) => {
    const [loading, setLoading] = useState(true);
    const containerRef = useRef(null);
    const [width, height] = useSize(containerRef);
    const [redirectedSrc, setRedirectedSrc] = useState(null);
    const [blobUrl, setBlobUrl] = useState(null);

    const src = useMemo(() => {
        let result = null;
        if (image?.src?.indexOf('ipfs://') === 0)
            result = 'https://ipfs.io/ipfs' + image.src.substring(7, image.src.length);
        else if (image?.src?.indexOf('https://metopia.xyz/data-center/nfts/image') === 0) {
            if (!redirectedSrc) {
                setRedirectedSrc('');
                fetch(image?.src)
                    .then((res) => res.json())
                    .then((res) => {
                        setRedirectedSrc(res?.data?.image);
                    });
            }
            result = null;
        } else {
            result = image?.src;
        }
        return result || redirectedSrc;
    }, [image, redirectedSrc]);

    function downloadUrl(url) {
        if (cacheBlobUrlPoor.some((item) => item.url === url)) {
            const target = cacheBlobUrlPoor.find((item) => item.url === url);
            return Promise.resolve().then(() => target?.blobUrl);
        }
        return fetch(url)
            .then(async (response) => {
                if (!response.ok) {
                    cacheBlobUrlPoor.push({
                        url,
                        blobUrl: 'https://oss.metopia.xyz/imgs/no-image-available.png',
                    });
                    throw new Error(`fetch Image Error!`);
                }
                const res = await response.text();
                try {
                    const json = JSON.parse(res);
                    if (json) {
                        cacheBlobUrlPoor.push({
                            url,
                            blobUrl: 'https://oss.metopia.xyz/imgs/no-image-available.png',
                        });
                    }
                } catch (e) {
                    console.log('is not json');
                }

                let type = 'image/*'; // 资源类型
                if (res.includes('<svg')) {
                    type = 'image/svg+xml';
                }
                const blob = new Blob([res], { type: type });
                const objectURL = URL.createObjectURL(blob);
                cacheBlobUrlPoor.push({
                    url,
                    blobUrl: objectURL,
                });
                return objectURL;
            })
            .catch((e) => {
                console.log('fetch error', e);
            });
    }
    return (
        <div
            className={'wrapped-lazy-load-image ' + (image.className ? image.className : '')}
            ref={containerRef}
            style={Object.assign(
                {},
                image?.style,
                // Not working
                src?.indexOf('data:image/svg+xml;base64') == 0 ? { paddingLeft: '-1px' } : {},
            )}
            onClick={image.onClick}
        >
            {
                <div className="wrapper">
                    <img
                        title={image.title}
                        alt={image.alt || ''}
                        onLoad={() => setLoading(false)}
                        src={
                            blobUrl
                                ? blobUrl
                                : src?.length
                                ? src
                                : image.defaultSrc ||
                                  'https://oss.metopia.xyz/imgs/no-image-available.png'
                        }
                        onError={(e) => {
                            setLoading(false);
                            image.onError &&
                                image.onError(
                                    src?.length
                                        ? src
                                        : image.defaultSrc ||
                                              'https://oss.metopia.xyz/imgs/no-image-available.png',
                                );
                            downloadUrl(src).then((url) => {
                                // console.log('url', url)
                                setBlobUrl(url);
                            });
                        }}
                    />
                </div>
            }
            {loading ? (
                <ReactLoading
                    type={'spin'}
                    color={'#ddd'}
                    height={Math.min(Math.min(width, height) / 2, 160)}
                    width={Math.min(Math.min(width, height) / 2, 160)}
                    className="loading"
                />
            ) : null}
        </div>
    );
};

const NftImage = (props: NftImageParam) => {
    const { defaultSrc, chainId, contract, tokenId, width, className, afterLoaded, height } = props;
    const [url, setUrl] = useState(defaultSrc);

    useEffect(() => {
        if (url) afterLoaded && afterLoaded(url);
    }, [url]);
    return (
        <WrappedLazyLoadImage
            alt={''}
            src={url}
            className={className}
            defaultSrc={defaultSrc}
            onError={() => {}}
            style={width ? { width: width + 'px', height: (height || width) + 'px' } : null}
        />
    );
};

export { NftImage, WrappedLazyLoadImage };

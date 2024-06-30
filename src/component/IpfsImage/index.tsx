export default function IpfsImage({ src, className }: { src: string; className?: string }) {
    const hash = src?.split('ipfs://')?.[1];
    return (
        <img
            src={hash ? `https://metopia.quicknode-ipfs.com/ipfs/${hash}` : src}
            alt=""
            className={className || ''}
        />
    );
}

export default function IpfsImage(src: string) {
    const hash = src?.split('ipfs://')?.[0];

    return <img src={hash ? `https://metopia.quicknode-ipfs.com/ipfs/${hash}` : src} alt="" />;
}

import ContentLoader from 'react-content-loader';
import './index.scss';
import { CSSProperties } from 'react';

export const loaderConfig = {
    bgColor: '#1E202B',
    activeColor: '#343640',
};

export const SpaceOverviewHeaderLoader = (props) => (
    <ContentLoader
        speed={2}
        width={752}
        height={120}
        viewBox="0 0 752 120"
        backgroundColor={loaderConfig.bgColor}
        foregroundColor={loaderConfig.activeColor}
        {...props}
    >
        <rect x="0" y="0" rx="16" ry="16" width="376" height="44" />
        <rect x="0" y="52" rx="10" ry="10" width="752" height="20" />
        <rect x="0" y="76" rx="10" ry="10" width="752" height="20" />
        <rect x="0" y="100" rx="10" ry="10" width="752" height="20" />
    </ContentLoader>
);
export const RectLoader = (props: { height?: number; width?: number; style?: CSSProperties }) => {
    const width = props?.width || '100%';
    const height = props?.height || 22;
    const style = props?.style || {};
    return (
        <ContentLoader
            speed={2}
            width={width}
            height={height}
            viewBox={`0 0 ${width} ${height}`}
            backgroundColor={loaderConfig.bgColor}
            foregroundColor={loaderConfig.activeColor}
            style={style}
        >
            <rect x="0" y="0" rx="16" ry="16" width={width} height={height} />
        </ContentLoader>
    );
};

export const CircleLoader = (props: { size?: number; style?: CSSProperties }) => {
    const size = props?.size || 22;
    const style = props?.style || {};
    const halfSize = Math.floor(size / 2);
    return (
        <ContentLoader
            speed={2}
            width={size}
            height={size}
            viewBox={`0 0 ${size} ${size}`}
            backgroundColor={loaderConfig.bgColor}
            foregroundColor={loaderConfig.activeColor}
            style={style}
        >
            <circle cx={halfSize} cy={halfSize} r={halfSize} />
        </ContentLoader>
    );
};

export function BadgeHomeCardLoader() {
    return (
        <div className="loading-loder-bage-home-card">
            <ContentLoader
                speed={2}
                width={588}
                height={287}
                viewBox="0 0 588 287"
                backgroundColor={loaderConfig.bgColor}
                foregroundColor={loaderConfig.activeColor}
                className="loader-content"
            >
                <rect x="240" y="64" rx="15" ry="15" width="348" height="29" />
                <rect x="240" y="133" rx="8" ry="8" width="348" height="15" />
                <rect x="240" y="150" rx="8" ry="8" width="348" height="15" />
                <rect x="240" y="167" rx="8" ry="8" width="348" height="15" />
                <rect x="240" y="244" rx="16" ry="16" width="154" height="40" />
                <rect x="0" y="0" rx="16" ry="16" width="200" height="287" />
                <rect x="402" y="244" rx="16" ry="16" width="154" height="40" />
                <rect x="268" y="101" rx="11" ry="11" width="80" height="22" />
                <circle cx="250" cy="112" r="10" />
            </ContentLoader>
        </div>
    );
}

export function HomeTableLoader(props: { height: number; count: number }) {
    const totalHeight = props?.height * props.count + (props.count - 1) * 24;
    return (
        <ContentLoader
            speed={2}
            width={'100%'}
            height={`${totalHeight}`}
            viewBox={`0 0 100% ${totalHeight}`}
            foregroundColor={loaderConfig.activeColor}
            backgroundColor={loaderConfig.bgColor}
        >
            {Array.from({ length: props.count }, (val, index) => index).map((index) => {
                return (
                    <rect
                        key={`home-table-loader-${index}`}
                        x="0"
                        y={index * (props?.height + 8)}
                        rx="16"
                        width="100%"
                        height={props?.height}
                    />
                );
            })}
        </ContentLoader>
    );
}

export function SpaceAvatarLoader() {
    return (
        <ContentLoader
            speed={2}
            width={164}
            height={102}
            viewBox="0 0 164 102"
            backgroundColor={loaderConfig.bgColor}
            foregroundColor={loaderConfig.activeColor}
            className="loading-loader-space-avatar"
        >
            <circle cx="82" cy="32" r="32" />
            <rect x="0" y="72" rx="15" ry="15" width="164" height="30" />
        </ContentLoader>
    );
}
export const SpaceRecordLoader = (props) => (
    <ContentLoader
        speed={2}
        width={316}
        height={184}
        viewBox="0 0 316 184"
        backgroundColor={loaderConfig.bgColor}
        foregroundColor={loaderConfig.activeColor}
        {...props}
    >
        <rect x="0" y="0" rx="9" ry="9" width="106" height="18" />
        <rect x="236" y="22" rx="9" ry="9" width="80" height="18" />
        <rect x="0" y="22" rx="9" ry="9" width="204" height="18" />
        <rect x="276" y="0" rx="8" ry="8" width="40" height="18" />
        <rect x="0" y="72" rx="9" ry="9" width="106" height="18" />
        <rect x="236" y="94" rx="9" ry="9" width="80" height="18" />
        <rect x="0" y="94" rx="9" ry="9" width="204" height="18" />
        <rect x="276" y="72" rx="9" ry="9" width="40" height="18" />
        <rect x="0" y="144" rx="9" ry="9" width="106" height="18" />
        <rect x="236" y="166" rx="9" ry="9" width="80" height="18" />
        <rect x="0" y="166" rx="9" ry="9" width="204" height="18" />
        <rect x="276" y="144" rx="9" ry="9" width="40" height="18" />
        <path d="M 0 55.5 h 316 M 0 127.5 h 316" />
    </ContentLoader>
);

export const SpaceMetobadgeHeaderLoader = (props) => (
    <ContentLoader
        speed={2}
        width={800}
        height={120}
        viewBox="0 0 800 120"
        backgroundColor={loaderConfig.bgColor}
        foregroundColor={loaderConfig.activeColor}
        {...props}
    >
        <rect x="0" y="0" rx="16" ry="16" width="376" height="44" />
        <rect x="0" y="52" rx="10" ry="10" width="800" height="20" />
        <rect x="0" y="76" rx="10" ry="10" width="800" height="20" />
        <rect x="0" y="100" rx="10" ry="10" width="800" height="20" />
    </ContentLoader>
);

export const BadgeDetailLoader = (props) => (
    <ContentLoader
        speed={2}
        width={600}
        height={158}
        viewBox="0 0 600 158"
        backgroundColor={loaderConfig.bgColor}
        foregroundColor={loaderConfig.activeColor}
        {...props}
    >
        <rect x="0" y="0" rx="16" ry="16" width="600" height="56" />
        <rect x="0" y="110" rx="11" ry="11" width="600" height="22" />
        <rect x="0" y="136" rx="11" ry="11" width="600" height="22" />
        <circle cx="11" cy="79" r="11" />
        <rect x="30" y="68" rx="11" ry="11" width="80" height="22" />
    </ContentLoader>
);

export const CredentialDetailHeaderLoader = (props) => (
    <ContentLoader
        speed={2}
        width={690}
        height={184}
        viewBox="0 0 690 184"
        backgroundColor={loaderConfig.bgColor}
        foregroundColor={loaderConfig.activeColor}
        {...props}
    >
        <rect x="0" y="36" rx="16" ry="16" width="690" height="56" />
        <rect x="0" y="96" rx="16" ry="16" width="690" height="56" />
        <circle cx="11" cy="173" r="11" />
        <rect x="30" y="162" rx="11" ry="11" width="80" height="22" />
        <rect x="134" y="162" rx="11" ry="11" width="200" height="22" />
        <rect x="0" y="0" rx="8" ry="8" width="104" height="22" />
        <rect x="112" y="0" rx="8" ry="8" width="104" height="22" />
        <path d="M 122.5 167 v 12" />
    </ContentLoader>
);

export const CredentialDetailClaimLoader = (props) => (
    <ContentLoader
        speed={2}
        width={574}
        height={97}
        viewBox="0 0 574 97"
        backgroundColor={loaderConfig.bgColor}
        foregroundColor={loaderConfig.activeColor}
        {...props}
    >
        <rect x="0" y="0" rx="11" ry="11" width="574" height="22" />
        <rect x="0" y="27" rx="11" ry="11" width="574" height="22" />
        <rect x="0" y="65" rx="16" ry="16" width="120" height="32" />
    </ContentLoader>
);

export const RaffleDetailHeaderLoader = (props) => (
    <ContentLoader
        speed={2}
        width={760}
        height={96}
        viewBox="0 0 760 96"
        backgroundColor={loaderConfig.bgColor}
        foregroundColor={loaderConfig.activeColor}
        {...props}
    >
        <rect x="0" y="0" rx="16" ry="16" width="760" height="56" />
        <circle cx="11" cy="85" r="11" />
        <rect x="30" y="74" rx="11" ry="11" width="80" height="22" />
        <rect x="134" y="74" rx="11" ry="11" width="200" height="22" />
        <path d="M 122.5 79 v 12" />
    </ContentLoader>
);
export const RaffleDetailParticipantLoader = (props) => (
    <ContentLoader
        speed={2}
        width={760}
        height={121}
        viewBox="0 0 760 121"
        backgroundColor={loaderConfig.bgColor}
        foregroundColor={loaderConfig.activeColor}
        {...props}
    >
        <circle cx="24" cy="24" r="24" />
        <circle cx="113" cy="24" r="24" />
        <circle cx="202" cy="24" r="24" />
        <circle cx="291" cy="24" r="24" />
        <circle cx="380" cy="24" r="24" />
        <circle cx="469" cy="24" r="24" />
        <circle cx="558" cy="24" r="24" />
        <circle cx="647" cy="24" r="24" />
        <circle cx="736" cy="24" r="24" />
        <circle cx="24" cy="96" r="24" />
        <circle cx="113" cy="96" r="24" />
        <circle cx="202" cy="96" r="24" />
        <circle cx="291" cy="96" r="24" />
        <circle cx="380" cy="96" r="24" />
        <circle cx="469" cy="96" r="24" />
        <circle cx="558" cy="96" r="24" />
        <circle cx="647" cy="96" r="24" />
        <circle cx="736" cy="96" r="24" />
    </ContentLoader>
);
export const NFTListLoader = (props) => (
    <ContentLoader
        speed={2}
        width={1200}
        height={333}
        viewBox="0 0 1200 333"
        backgroundColor={loaderConfig.bgColor}
        foregroundColor={loaderConfig.activeColor}
        {...props}
    >
        <rect x="0" y="0" rx="8" ry="8" width="180" height="180" />
        <rect x="204" y="0" rx="8" ry="8" width="180" height="180" />
        <rect x="408" y="0" rx="8" ry="8" width="180" height="180" />
        <rect x="612" y="0" rx="8" ry="8" width="180" height="180" />
        <rect x="816" y="0" rx="8" ry="8" width="180" height="180" />
        <rect x="1020" y="0" rx="8" ry="8" width="180" height="180" />
        <rect x="0" y="204" rx="8" ry="8" width="180" height="180" />
        <rect x="204" y="204" rx="8" ry="8" width="180" height="180" />
        <rect x="408" y="204" rx="8" ry="8" width="180" height="180" />
        <rect x="612" y="204" rx="8" ry="8" width="180" height="180" />
        <rect x="816" y="204" rx="8" ry="8" width="180" height="180" />
        <rect x="1020" y="204" rx="8" ry="8" width="180" height="180" />
    </ContentLoader>
);

import './index.scss';
const EmptyDataHint = (props: { content: any; otherContent?: any; size?: string }) => {
    const { content, otherContent, size } = props;
    return (
        <div className="empty-data-hint">
            {size ? (
                <div
                    className="hint-icon icon-exclaimtion-thin"
                    style={{ width: size, height: size, fontSize: size }}
                ></div>
            ) : (
                <div className="hint-icon icon-exclaimtion-thin"></div>
            )}
            <div className="text">{content}</div>
            {otherContent}
            {/* <div className="empty-stay-tuned">stay-tuned</div> */}
        </div>
    );
};

export default EmptyDataHint;

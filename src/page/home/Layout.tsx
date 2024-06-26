import './index.scss';
export default function Layout(props) {
    let { children } = props;
    return (
        <div className="sub-home-layout-wrapper">
            <div className="sub-home-layout">{children}</div>
        </div>
    );
}

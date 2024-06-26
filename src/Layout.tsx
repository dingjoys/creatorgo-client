import { Outlet } from 'react-router-dom';
import { Menu } from '@/component/modules/Menu';
import { ReactComponent as IconLogo } from '@/component/icons/svg/logo.svg';
import useIsMobile from './core/useMobile';
const Layout = ({ project }: { project?: string }) => {
    const { isMobile } = useIsMobile();
    return (
        <div className={`bg-wrapper`}>
            <div className="app" id="app">
                <Menu project={project} />
                <div className={`container`} id="page-container">
                    <div className="body">
                        <Outlet />
                    </div>
                    <div
                        style={{
                            margin: '48px auto',
                            paddingTop: isMobile ? '48rem' : '48px',
                            maxWidth: isMobile ? '100vw' : '1312px',
                            // borderTop: '1px solid rgba(125, 128, 154, 0.25)',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            gap: isMobile ? '8rem' : '8px',
                            fontSize: isMobile ? '12rem' : '12px',
                            color: '#7D809A',
                        }}
                    >
                        {/* <IconLogo />
                        Powered by Metopia */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Layout;

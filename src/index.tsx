import GlobalLayout from '@/GlobalLayout';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './Layout';
// page
import { ScrollToTop } from '@/core/hooks/ScrollToTop';
import HomePage from '@/page/home/HomePage';
import DetailPage from './page/Detail';

function App() {
    return (
        <BrowserRouter basename="">
            <Routes>
                <Route
                    path="/"
                    element={
                        <>
                            <ScrollToTop />
                            <Layout project="home" />
                        </>
                    }
                >
                    <Route index element={<HomePage />}></Route>
                    <Route path="detail/:id" element={<DetailPage />}></Route>
                    <Route path="*" element={<HomePage />}></Route>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}
ReactDOM.render(
    <GlobalLayout>
        <App />
    </GlobalLayout>,
    document.getElementById('root'),
);

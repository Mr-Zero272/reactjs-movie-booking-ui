import { Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { publicRoutes } from '~/routes';

import { DefaultLayout } from '~/components/Layout';
import LoginModal from '~/components/Modal/LoginModal';
import { useSelector } from 'react-redux';

function App() {
    const isOpenModal = useSelector((state) => state.loginModal.isOpen);

    if (isOpenModal) {
        document.body.classList.add('modal-active');
    } else {
        document.body.classList.remove('modal-active');
    }
    return (
        <Router>
            <div className="App">
                {isOpenModal && <LoginModal />}
                <Routes>
                    {publicRoutes.map((route, index) => {
                        const Page = route.component;
                        let Layout = DefaultLayout;

                        if (route.layout) {
                            Layout = route.layout;
                        } else if (route.layout === null) {
                            Layout = Fragment;
                        }
                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    <Layout>
                                        <Page />
                                    </Layout>
                                }
                            ></Route>
                        );
                    })}
                </Routes>
            </div>
        </Router>
    );
}

export default App;

import { Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import { publicRoutes, privateRoutes } from '~/routes';

import { DefaultLayout } from '~/Layout';
import { ToastContainer } from 'react-toastify';
import PrivateRouter from '~/routes/PrivateRouter';

function App() {
    // if (modalInfo.isOpen) {
    //     document.body.classList.add('modal-active');
    // } else {
    //     document.body.classList.remove('modal-active');
    // }
    return (
        <Router>
            <ToastContainer />
            <div className="App">
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
                    {privateRoutes.map((route, index) => {
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
                                    <PrivateRouter>
                                        <Layout>
                                            <Page />
                                        </Layout>
                                    </PrivateRouter>
                                }
                            />
                        );
                    })}
                </Routes>
            </div>
        </Router>
    );
}

export default App;

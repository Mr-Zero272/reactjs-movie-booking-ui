//Layouts
// import { HeaderOnly } from '~/components/Layout';

import Home from '~/pages/Home';
import About from '~/pages/About';
import Booking from '~/pages/Booking';
import Blog from '~/pages/Blog';

//Public routes
const publicRoutes = [
    { path: '/', component: Home },
    { path: '/about', component: About },
    { path: '/booking', component: Booking },
    { path: '/blog', component: Blog },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };

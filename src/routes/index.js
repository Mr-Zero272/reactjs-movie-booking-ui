//Layouts
// import { HeaderOnly } from '~/components/Layout';

import Home from '~/pages/Home';
import About from '~/pages/About';
import Booking from '~/pages/Booking';
import Blog from '~/pages/Blog';
import Schedule from '~/pages/Schedule';

//Public routes
const publicRoutes = [
    { path: '/', component: Home },
    { path: '/about', component: About },
    { path: '/booking', component: Booking },
    { path: '/blog', component: Blog },
    { path: '/schedule', component: Schedule },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };

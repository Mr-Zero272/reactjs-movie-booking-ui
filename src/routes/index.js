//Layouts
import { HeaderOnly } from '~/components/Layout';

//Pages
import Home from '~/pages/Home';
import About from '~/pages/About';
import Booking from '~/pages/Booking';
import Blog from '~/pages/Blog';
import Schedule from '~/pages/Schedule';
import Detail from '~/pages/Detail';

//Public routes
const publicRoutes = [
    { path: '/', component: Home },
    { path: '/about', component: About },
    { path: '/booking', component: Booking },
    { path: '/blog', component: Blog },
    { path: '/schedule', component: Schedule },
    { path: '/detail', component: Detail, layout: HeaderOnly },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };

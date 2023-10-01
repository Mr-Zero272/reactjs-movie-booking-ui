//Layouts
import { HeaderOnly } from '~/components/Layout';

//Pages
import Home from '~/pages/Home';
import Booking from '~/pages/Booking';
import Blog from '~/pages/Blog';
import Schedule from '~/pages/Schedule';
import Detail from '~/pages/Detail';
import Login from '~/pages/Login';
import Ticket from '~/pages/Ticket';
import Search from '~/pages/Search';
import Register from '~/pages/Register';
//Public routes
const publicRoutes = [
    { path: '/', component: Home },
    { path: '/search', component: Search },
    { path: '/booking/:id', component: Booking, layout: HeaderOnly },
    { path: '/blog', component: Blog },
    { path: '/schedule', component: Schedule },
    { path: '/detail/:movieId', component: Detail, layout: HeaderOnly },
    { path: '/login', component: Login, layout: null },
    { path: '/ticket', component: Ticket },
    { path: '/register', component: Register, layout: null },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };

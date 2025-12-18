import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Catalog from './pages/Catalog';
import About from './pages/About';
import Contact from './pages/Contact';
import ProductDetail from './pages/ProductDetail';
import Products from './pages/Products';
import Privacy from './pages/Privacy';
import Returns from './pages/Returns';
import Shipping from './pages/Shipping';
import MyAccount from './pages/MyAccount';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import OrderConfirmation from './pages/OrderConfirmation';
import Analytics from './pages/Analytics';
import Orders from './pages/Orders';
import TvSlides from './pages/TvSlides';
import Player from './pages/Player';
import Settings from './pages/Settings';
import Customers from './pages/Customers';
import Promotions from './pages/Promotions';
import Layout from './Layout.jsx';


export const PAGES = {
    "Home": Home,
    "Dashboard": Dashboard,
    "Catalog": Catalog,
    "About": About,
    "Contact": Contact,
    "ProductDetail": ProductDetail,
    "Products": Products,
    "Privacy": Privacy,
    "Returns": Returns,
    "Shipping": Shipping,
    "MyAccount": MyAccount,
    "Cart": Cart,
    "Checkout": Checkout,
    "OrderConfirmation": OrderConfirmation,
    "Analytics": Analytics,
    "Orders": Orders,
    "TvSlides": TvSlides,
    "Player": Player,
    "Settings": Settings,
    "Customers": Customers,
    "Promotions": Promotions,
}

export const pagesConfig = {
    mainPage: "Home",
    Pages: PAGES,
    Layout: Layout,
};
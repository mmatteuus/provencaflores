import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Layout from './Layout'
import Home from '@/pages/Home'
import Catalog from '@/pages/Catalog'
import ProductDetail from '@/pages/ProductDetail'
import About from '@/pages/About'
import Contact from '@/pages/Contact'
import Cart from '@/pages/Cart'
import Checkout from '@/pages/Checkout'
import OrderConfirmation from '@/pages/OrderConfirmation'
import MyAccount from '@/pages/MyAccount'
import PageNotFound from '@/lib/PageNotFound'
import { Toaster } from '@/components/ui/toaster'

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/product/:slug" element={<ProductDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/pedido/:orderId" element={<OrderConfirmation />} />
          <Route path="/minha-conta" element={<MyAccount />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Layout>
      <Toaster />
    </Router>
  )
}

export default App


import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import CartDrawer from './components/CartDrawer'
import QuickView from './components/QuickView'
import Toast from './components/Toast'
import Home from './pages/Home'
import Shop from './pages/Shop'
import ProductDetail from './pages/ProductDetail'
import Checkout from './pages/Checkout'
import Wishlist from './pages/Wishlist'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

function ScrollProgress() {
  useEffect(() => {
    const bar = document.getElementById('scroll-bar')
    const update = () => {
      const total = document.body.scrollHeight - window.innerHeight
      const pct = total > 0 ? (window.scrollY / total) * 100 : 0
      if (bar) bar.style.width = pct + '%'
    }
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [])
  return (
    <div className="fixed top-0 left-0 right-0 z-[60] h-[2px] pointer-events-none">
      <div id="scroll-bar" className="h-full bg-gradient-to-r from-electric to-indigo-300 w-0" style={{ transition: 'none' }} />
    </div>
  )
}

function AppShell() {
  return (
    <>
      <ScrollToTop />
      <ScrollProgress />
      <div className="min-h-screen bg-indigo-950 text-white">
        <Navbar />
        <CartDrawer />
        <QuickView />
        <Toast />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/wishlist" element={<Wishlist />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AppShell />
    </BrowserRouter>
  )
}

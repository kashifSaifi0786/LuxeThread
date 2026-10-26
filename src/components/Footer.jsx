import { Link } from 'react-router-dom'
import { Zap, Instagram, Twitter, Youtube } from 'lucide-react'

const links = {
  Shop: ['New In', 'Tops', 'Bottoms', 'Outerwear', 'Dresses', 'Accessories'],
  Brands: ['VÖRN', 'AURI', 'MIRU', 'View All'],
  Help: ['Size Guide', 'Returns', 'Shipping', 'Contact Us', 'FAQ'],
}

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-indigo-950/50 mt-10">
      <div className="container-main py-14">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-2 lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 bg-electric rounded-lg flex items-center justify-center">
                <Zap size={14} fill="white" className="text-white" />
              </div>
              <span className="font-display text-xl text-white">LuxeThread</span>
            </div>
            <p className="text-muted text-sm leading-relaxed max-w-xs mb-6">
              Curated premium fashion for those who see clothing as an extension of identity.
            </p>
            <div className="flex gap-3">
              {[Instagram, Twitter, Youtube].map((Icon, i) => (
                <a key={i} href="#" className="w-9 h-9 rounded-full glass flex items-center justify-center text-muted hover:text-white hover:border-electric/40 transition-all border border-white/10">
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(links).map(([section, items]) => (
            <div key={section}>
              <h4 className="text-white text-sm font-semibold mb-4 tracking-wide">{section}</h4>
              <ul className="space-y-2.5">
                {items.map(item => (
                  <li key={item}>
                    <Link to="/shop" className="text-muted text-sm hover:text-white transition-colors duration-200">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-white/5 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-muted text-xs">© 2025 LuxeThread. All rights reserved.</p>
          <div className="flex gap-5">
            {['Privacy Policy', 'Terms', 'Cookies'].map(item => (
              <a key={item} href="#" className="text-muted text-xs hover:text-white transition-colors">{item}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

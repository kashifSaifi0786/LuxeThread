import { useState } from 'react'
import { ArrowLeft, ArrowRight, CheckCircle, Package, CreditCard, User, Lock } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useStore } from '../context/store'

const steps = [
  { id: 1, label: 'Information', icon: User },
  { id: 2, label: 'Shipping', icon: Package },
  { id: 3, label: 'Payment', icon: CreditCard },
]

const InputField = ({ label, placeholder, type = 'text', required }) => (
  <div>
    <label className="block text-xs text-muted mb-1.5 uppercase tracking-wider">{label}{required && ' *'}</label>
    <input type={type} placeholder={placeholder} required={required} className="input-field" />
  </div>
)

export default function Checkout() {
  const [step, setStep] = useState(1)
  const [done, setDone] = useState(false)
  const { cart, cartTotal, clearCart } = useStore()
  const total = useStore((s) => s.cartTotal())
  const navigate = useNavigate()

  const handleNext = (e) => {
    e.preventDefault()
    if (step < 3) setStep(s => s + 1)
    else {
      setDone(true)
      setTimeout(() => { clearCart(); navigate('/') }, 4000)
    }
  }

  if (cart.length === 0 && !done) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center pt-24 gap-5">
        <p className="font-display text-3xl text-white">Your bag is empty</p>
        <Link to="/shop" className="btn-primary rounded-full">Continue Shopping</Link>
      </div>
    )
  }

  if (done) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center pt-24 gap-6 text-center px-4">
        <div className="w-24 h-24 rounded-full bg-green-500/15 border border-green-500/30 flex items-center justify-center animate-pulse-glow">
          <CheckCircle size={40} className="text-green-400" />
        </div>
        <div>
          <h1 className="font-display text-4xl text-white mb-3">Order Confirmed!</h1>
          <p className="text-muted max-w-sm">
            Thank you for your order. A confirmation has been sent to your email.
            Redirecting you home in a few seconds.
          </p>
        </div>
        <div className="glass rounded-2xl border border-white/10 px-8 py-4">
          <p className="text-sm text-muted">Order #LT-{Math.floor(Math.random() * 90000) + 10000}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="container-main max-w-5xl">
        {/* Back */}
        <Link to="/shop" className="inline-flex items-center gap-2 text-sm text-muted hover:text-white transition-colors mb-8">
          <ArrowLeft size={14} /> Back to shopping
        </Link>

        {/* Progress */}
        <div className="flex items-center gap-0 mb-12">
          {steps.map((s, i) => (
            <div key={s.id} className="flex items-center flex-1">
              <button
                onClick={() => step > s.id && setStep(s.id)}
                className={`flex items-center gap-2.5 group ${step > s.id ? 'cursor-pointer' : 'cursor-default'}`}
              >
                <div className={`w-9 h-9 rounded-full flex items-center justify-center border-2 transition-all duration-300
                  ${step === s.id ? 'border-electric bg-electric text-white scale-110' :
                    step > s.id ? 'border-green-500 bg-green-500/20 text-green-400' :
                    'border-white/20 text-muted'}`}
                >
                  {step > s.id ? <CheckCircle size={16} /> : <s.icon size={15} />}
                </div>
                <span className={`text-sm font-medium hidden sm:block transition-colors
                  ${step === s.id ? 'text-white' : step > s.id ? 'text-green-400' : 'text-muted'}`}>
                  {s.label}
                </span>
              </button>
              {i < steps.length - 1 && (
                <div className={`flex-1 h-px mx-4 transition-colors duration-500 ${step > s.id ? 'bg-green-500/40' : 'bg-white/10'}`} />
              )}
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-5 gap-10">
          {/* Form */}
          <form onSubmit={handleNext} className="lg:col-span-3 space-y-5">
            {step === 1 && (
              <div className="space-y-5 animate-fade-up">
                <h2 className="font-display text-2xl text-white">Contact Information</h2>
                <div className="grid grid-cols-2 gap-4">
                  <InputField label="First Name" placeholder="Jane" required />
                  <InputField label="Last Name" placeholder="Smith" required />
                </div>
                <InputField label="Email" type="email" placeholder="jane@email.com" required />
                <InputField label="Phone" type="tel" placeholder="+1 (555) 000-0000" />
              </div>
            )}

            {step === 2 && (
              <div className="space-y-5 animate-fade-up">
                <h2 className="font-display text-2xl text-white">Shipping Address</h2>
                <InputField label="Address Line 1" placeholder="123 Park Avenue" required />
                <InputField label="Address Line 2" placeholder="Apt, Suite, Unit (optional)" />
                <div className="grid grid-cols-2 gap-4">
                  <InputField label="City" placeholder="New York" required />
                  <InputField label="State / Province" placeholder="NY" required />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <InputField label="ZIP / Postal Code" placeholder="10001" required />
                  <div>
                    <label className="block text-xs text-muted mb-1.5 uppercase tracking-wider">Country</label>
                    <select className="input-field" defaultValue="US">
                      <option value="US" className="bg-indigo-950">United States</option>
                      <option value="GB" className="bg-indigo-950">United Kingdom</option>
                      <option value="CA" className="bg-indigo-950">Canada</option>
                      <option value="AU" className="bg-indigo-950">Australia</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-xs text-muted mb-3 uppercase tracking-wider">Shipping Method</label>
                  {[
                    { name: 'Standard Delivery', time: '5–7 business days', price: total >= 200 ? 'Free' : '$12' },
                    { name: 'Express Delivery', time: '2–3 business days', price: '$28' },
                    { name: 'Next Day (DHL)', time: '1 business day', price: '$55' },
                  ].map((opt, i) => (
                    <label key={i} className="flex items-center justify-between p-4 card mb-2 cursor-pointer hover:border-electric/40 transition-colors">
                      <div className="flex items-center gap-3">
                        <input type="radio" name="shipping" defaultChecked={i === 0} className="accent-electric" />
                        <div>
                          <p className="text-sm text-white font-medium">{opt.name}</p>
                          <p className="text-xs text-muted">{opt.time}</p>
                        </div>
                      </div>
                      <span className="text-sm font-mono text-white">{opt.price}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-5 animate-fade-up">
                <h2 className="font-display text-2xl text-white">Payment Details</h2>
                <div className="glass rounded-2xl border border-white/10 p-4 flex items-center gap-3">
                  <Lock size={14} className="text-green-400" />
                  <span className="text-xs text-muted">Your payment information is encrypted and secure</span>
                </div>
                <InputField label="Cardholder Name" placeholder="Jane Smith" required />
                <div>
                  <label className="block text-xs text-muted mb-1.5 uppercase tracking-wider">Card Number *</label>
                  <input
                    type="text"
                    placeholder="4242  4242  4242  4242"
                    maxLength={19}
                    className="input-field font-mono"
                    onChange={(e) => {
                      const v = e.target.value.replace(/\D/g, '').replace(/(\d{4})/g, '$1 ').trim()
                      e.target.value = v
                    }}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <InputField label="Expiry (MM/YY)" placeholder="08/27" required />
                  <InputField label="CVV" placeholder="•••" required />
                </div>
                <div className="flex gap-2 mt-2">
                  {['Visa', 'Mastercard', 'Amex', 'PayPal'].map(c => (
                    <div key={c} className="px-3 py-1.5 glass rounded-lg text-xs text-muted border border-white/10">{c}</div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex items-center gap-3 pt-2">
              {step > 1 && (
                <button type="button" onClick={() => setStep(s => s - 1)} className="btn-secondary rounded-xl py-4 px-6">
                  <ArrowLeft size={16} /> Back
                </button>
              )}
              <button type="submit" className="btn-primary flex-1 rounded-xl py-4 text-base">
                {step < 3 ? (
                  <>Continue <ArrowRight size={18} /></>
                ) : (
                  <>Place Order · ${total.toLocaleString()} <CheckCircle size={18} /></>
                )}
              </button>
            </div>
          </form>

          {/* Order Summary */}
          <div className="lg:col-span-2">
            <div className="glass rounded-2xl border border-white/10 p-6 sticky top-28">
              <h3 className="font-display text-xl text-white mb-5">Order Summary</h3>
              <div className="space-y-3 mb-5 max-h-64 overflow-y-auto pr-1">
                {cart.map((item) => (
                  <div key={item.key} className="flex gap-3">
                    <div className="relative flex-shrink-0">
                      <img src={item.images[0]} alt={item.name} className="w-14 h-16 object-cover rounded-xl" />
                      <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-electric text-white text-[10px] rounded-full flex items-center justify-center font-bold">
                        {item.qty}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-electric-light">{item.brand}</p>
                      <p className="text-sm text-white font-medium leading-tight truncate">{item.name}</p>
                      <p className="text-xs text-muted">{item.size}</p>
                    </div>
                    <span className="text-sm font-mono text-white flex-shrink-0">${(item.price * item.qty).toLocaleString()}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-white/10 pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted">Subtotal</span>
                  <span className="text-white">${total.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted">Shipping</span>
                  <span className="text-green-400">{total >= 200 ? 'Free' : '$12'}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted">Tax (est.)</span>
                  <span className="text-white">${(total * 0.08).toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-medium text-base border-t border-white/10 pt-3 mt-3">
                  <span className="text-white">Total</span>
                  <span className="font-mono text-white text-lg">${(total + (total < 200 ? 12 : 0) + total * 0.08).toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

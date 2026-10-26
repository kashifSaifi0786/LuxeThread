import { useEffect } from 'react'
import { CheckCircle, X, AlertCircle, Info } from 'lucide-react'
import { useStore } from '../context/store'

const icons = {
  success: CheckCircle,
  error: AlertCircle,
  info: Info,
}

const colors = {
  success: 'border-green-500/30 bg-green-500/10 text-green-300',
  error: 'border-red-500/30 bg-red-500/10 text-red-300',
  info: 'border-electric/30 bg-electric/10 text-electric-light',
}

export default function ToastStack() {
  const { toasts, removeToast } = useStore()

  return (
    <div className="fixed bottom-6 right-6 z-[200] flex flex-col gap-3">
      {toasts.map((toast) => {
        const Icon = icons[toast.type] || CheckCircle
        return (
          <div
            key={toast.id}
            className={`flex items-center gap-3 px-5 py-3.5 rounded-2xl border glass-heavy
                         shadow-glow animate-fade-up max-w-xs ${colors[toast.type]}`}
          >
            <Icon size={17} className="flex-shrink-0" />
            <span className="text-sm font-medium text-white">{toast.message}</span>
            <button onClick={() => removeToast(toast.id)} className="ml-2 text-muted hover:text-white transition-colors">
              <X size={14} />
            </button>
          </div>
        )
      })}
    </div>
  )
}

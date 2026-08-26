import { useLocation, useNavigate } from 'react-router-dom'

const TABS = [
  { path: '/home', emoji: '🏠', label: 'הבית' },
  { path: '/now', emoji: '⚡', label: 'עכשיו' },
  { path: '/for-dad', emoji: '👨', label: 'בשבילך' },
  { path: '/did-you-know', emoji: '🎯', label: 'ידעת?' },
] as const

function BottomNav() {
  const navigate = useNavigate()
  const { pathname } = useLocation()

  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-[var(--border)] bg-[#0A0A0A]/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-[390px] items-center justify-between px-2 py-2">
        {TABS.map((tab) => {
          const active = pathname === tab.path
          return (
            <button
              key={tab.path}
              type="button"
              onClick={() => navigate(tab.path)}
              className={`flex flex-1 flex-col items-center gap-0.5 rounded-xl py-1 text-xs ${
                active ? 'text-accent' : 'text-[var(--text-secondary)]'
              }`}
            >
              <span className="text-lg">{tab.emoji}</span>
              <span>{tab.label}</span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}

export default BottomNav

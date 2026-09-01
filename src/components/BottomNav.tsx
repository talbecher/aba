import { useLocation, useNavigate } from 'react-router-dom'

const TABS = [
  { path: '/home', emoji: '🏠', label: 'בית' },
  { path: '/now', emoji: '⚡', label: 'מה עכשיו' },
  { path: '/did-you-know', emoji: '🎯', label: 'הידעת?' },
  { path: '/journey', emoji: '🗂️', label: 'מסע' },
] as const

function BottomNav() {
  const navigate = useNavigate()
  const { pathname } = useLocation()

  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-40 border-t border-[var(--border)]"
      style={{
        backgroundColor: 'rgba(10, 10, 10, 0.95)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        padding: '8px 0 20px',
      }}
    >
      <div className="mx-auto flex max-w-[390px] items-center justify-between px-2">
        {TABS.map((tab) => {
          const active = pathname === tab.path
          return (
            <button
              key={tab.path}
              type="button"
              onClick={() => navigate(tab.path)}
              aria-label={tab.label}
              aria-current={active ? 'page' : undefined}
              style={{ minHeight: 44 }}
              className={`flex flex-1 flex-col items-center justify-center gap-0.5 rounded-xl ${
                active
                  ? 'font-bold text-accent'
                  : 'text-[var(--text-muted)]'
              }`}
            >
              <span className="text-[22px]">{tab.emoji}</span>
              <span className="text-[10px]">{tab.label}</span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}

export default BottomNav

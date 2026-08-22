import type { ReactNode } from 'react'

interface BottomSheetProps {
  open: boolean
  onClose: () => void
  children: ReactNode
}

function BottomSheet({ open, onClose, children }: BottomSheetProps) {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-50">
      <div
        className="absolute inset-0 bg-black/60"
        onClick={onClose}
        aria-hidden="true"
      />
      <div className="absolute inset-x-0 bottom-0 mx-auto max-w-[390px] rounded-t-2xl border-t border-neutral-800 bg-neutral-900 p-6 pb-8">
        {children}
      </div>
    </div>
  )
}

export default BottomSheet

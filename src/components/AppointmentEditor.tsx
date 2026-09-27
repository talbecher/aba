import { useState } from 'react'
import type { Appointment } from '../types/user'

interface AppointmentEditorProps {
  appointment?: Appointment
  onSave: (data: { date: string; time: string; location: string }) => void
  onMarkDone: () => void
}

function formatFullDate(dateStr: string): string {
  const [y, m, d] = dateStr.split('-')
  return `${d}.${m}.${y}`
}

function AppointmentEditor({ appointment, onSave, onMarkDone }: AppointmentEditorProps) {
  const [editing, setEditing] = useState(false)
  const [date, setDate] = useState(appointment?.date ?? '')
  const [time, setTime] = useState(appointment?.time ?? '')
  const [location, setLocation] = useState(appointment?.location ?? '')

  const startEdit = () => {
    setDate(appointment?.date ?? '')
    setTime(appointment?.time ?? '')
    setLocation(appointment?.location ?? '')
    setEditing(true)
  }

  const handleSave = () => {
    if (!date || !time) return
    onSave({ date, time, location })
    setEditing(false)
  }

  return (
    <div className="flex flex-col gap-2 rounded-xl border border-[var(--border)] p-3">
      <p className="text-sm font-semibold text-[var(--text)]">התור שלכם</p>

      {!appointment && !editing && (
        <button
          type="button"
          onClick={startEdit}
          style={{ minHeight: 44 }}
          className="rounded-xl bg-accent p-3 text-sm font-semibold text-neutral-950"
        >
          📅 קבעתי תור
        </button>
      )}

      {editing && (
        <div className="flex flex-col gap-2">
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full rounded-xl border border-neutral-700 bg-neutral-950 p-3 text-neutral-100 focus:border-accent focus:outline-none"
          />
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="w-full rounded-xl border border-neutral-700 bg-neutral-950 p-3 text-neutral-100 focus:border-accent focus:outline-none"
          />
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="מיקום / רופא (אופציונלי)"
            className="w-full rounded-xl border border-neutral-700 bg-neutral-950 p-3 text-neutral-100 placeholder:text-neutral-600 focus:border-accent focus:outline-none"
          />
          <div className="flex gap-2">
            <button
              type="button"
              onClick={handleSave}
              disabled={!date || !time}
              style={{ minHeight: 44 }}
              className="flex-1 rounded-xl bg-accent p-3 text-sm font-semibold text-neutral-950 disabled:opacity-40"
            >
              שמור
            </button>
            <button
              type="button"
              onClick={() => setEditing(false)}
              style={{ minHeight: 44 }}
              className="flex-1 rounded-xl border border-neutral-700 p-3 text-sm font-semibold text-neutral-300"
            >
              ביטול
            </button>
          </div>
        </div>
      )}

      {appointment && !editing && (
        <div className="flex flex-col gap-1">
          <p className="text-sm text-[var(--text)]">
            📅 {formatFullDate(appointment.date)} · {appointment.time}
          </p>
          {appointment.location && (
            <p className="text-sm text-[var(--text-secondary)]">
              📍 {appointment.location}
            </p>
          )}
          <div className="mt-1 flex gap-2">
            <button
              type="button"
              onClick={startEdit}
              style={{ minHeight: 44 }}
              className="flex-1 rounded-xl border border-neutral-700 p-3 text-sm font-semibold text-neutral-300"
            >
              שנה
            </button>
            <button
              type="button"
              onClick={onMarkDone}
              disabled={appointment.status === 'done'}
              style={{
                minHeight: 44,
                backgroundColor:
                  appointment.status === 'done' ? 'var(--color-success)' : 'transparent',
                border:
                  appointment.status === 'done'
                    ? 'none'
                    : '1px solid var(--color-success)',
                color: appointment.status === 'done' ? '#fff' : 'var(--color-success)',
              }}
              className="flex-1 rounded-xl p-3 text-sm font-semibold disabled:opacity-70"
            >
              בוצע ✓
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AppointmentEditor

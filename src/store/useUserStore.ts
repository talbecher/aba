import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { KnowledgeLevel, Tone, UserState } from '../types/user'

interface UserStore extends UserState {
  setTone: (tone: Tone) => void
  setKnowledgeLevel: (level: KnowledgeLevel) => void
  setDueDate: (date: string) => void
  setManualWeekOverride: (week: number | null) => void
  setIsFirstBaby: (val: boolean) => void
  toggleAction: (id: string) => void
  completeOnboarding: () => void
  setNotifications: (val: boolean) => void
  addRevealedWeek: (week: number) => void
  toggleCompletedTask: (id: string) => void
  addPlannedEvent: (id: string) => void
  setCurrentTaskIndex: (index: number) => void
}

const initialState: UserState = {
  tone: 'bro',
  knowledge_level: 'medium',
  is_first_baby: true,
  due_date: null,
  manual_week_override: null,
  completed_action_ids: [],
  onboarding_completed: false,
  notification_preference: true,
  revealedWeeks: [],
  completedTasks: [],
  plannedEvents: [],
  currentTaskIndex: 0,
}

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      ...initialState,
      setTone: (tone) => set({ tone }),
      setKnowledgeLevel: (knowledge_level) => set({ knowledge_level }),
      setDueDate: (due_date) => set({ due_date }),
      setManualWeekOverride: (manual_week_override) =>
        set({ manual_week_override }),
      setIsFirstBaby: (is_first_baby) => set({ is_first_baby }),
      toggleAction: (id) =>
        set((state) => ({
          completed_action_ids: state.completed_action_ids.includes(id)
            ? state.completed_action_ids.filter((actionId) => actionId !== id)
            : [...state.completed_action_ids, id],
        })),
      completeOnboarding: () => set({ onboarding_completed: true }),
      setNotifications: (notification_preference) =>
        set({ notification_preference }),
      addRevealedWeek: (week) =>
        set((state) =>
          state.revealedWeeks.includes(week)
            ? state
            : { revealedWeeks: [...state.revealedWeeks, week] },
        ),
      toggleCompletedTask: (id) =>
        set((state) => ({
          completedTasks: state.completedTasks.includes(id)
            ? state.completedTasks.filter((taskId) => taskId !== id)
            : [...state.completedTasks, id],
        })),
      addPlannedEvent: (id) =>
        set((state) =>
          state.plannedEvents.includes(id)
            ? state
            : { plannedEvents: [...state.plannedEvents, id] },
        ),
      setCurrentTaskIndex: (index) => set({ currentTaskIndex: index }),
    }),
    { name: 'aba-user-store' },
  ),
)

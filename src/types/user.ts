export type Tone = 'bro' | 'tachles' | 'deep' | 'doctor'

export type KnowledgeLevel = 'beginner' | 'medium' | 'pro'

export interface UserState {
  tone: Tone
  knowledge_level: KnowledgeLevel
  is_first_baby: boolean
  due_date: string | null
  manual_week_override: number | null
  completed_action_ids: string[]
  onboarding_completed: boolean
  notification_preference: boolean
  revealedWeeks: number[]
  completedTasks: string[]
  plannedEvents: string[]
}

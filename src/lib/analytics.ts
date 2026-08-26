export type AnalyticsEvent =
  | 'onboarding_complete'
  | 'tone_selected'
  | 'visualization_opened'
  | 'action_checked'
  | 'sos_opened'
  | 'return_visit'
  | 'share_card_shared'
  | 'share_card_downloaded'

export function trackEvent(
  event: AnalyticsEvent,
  payload?: Record<string, unknown>,
): void {
  console.log(`[analytics] ${event}`, payload ?? {})
}

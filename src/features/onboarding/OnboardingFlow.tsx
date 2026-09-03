import { Navigate, useNavigate } from 'react-router-dom'
import { useUserStore } from '../../store/useUserStore'
import StepWhen from './StepWhen'

function OnboardingFlow() {
  const onboardingCompleted = useUserStore((state) => state.onboarding_completed)
  const completeOnboarding = useUserStore((state) => state.completeOnboarding)
  const navigate = useNavigate()

  if (onboardingCompleted) {
    return <Navigate to="/home" replace />
  }

  const handleComplete = () => {
    completeOnboarding()
    navigate('/home')
  }

  return (
    <div className="mx-auto h-dvh w-full max-w-[390px]" style={{ backgroundColor: '#0A0A0A' }}>
      <StepWhen onComplete={handleComplete} />
    </div>
  )
}

export default OnboardingFlow

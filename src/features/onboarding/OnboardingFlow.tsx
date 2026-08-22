import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { useUserStore } from '../../store/useUserStore'
import StepWhen from './StepWhen'
import StepKnowledge from './StepKnowledge'

function OnboardingFlow() {
  const onboardingCompleted = useUserStore((state) => state.onboarding_completed)
  const completeOnboarding = useUserStore((state) => state.completeOnboarding)
  const navigate = useNavigate()
  const [step, setStep] = useState<0 | 1>(0)

  if (onboardingCompleted) {
    return <Navigate to="/home" replace />
  }

  const handleComplete = () => {
    completeOnboarding()
    navigate('/home')
  }

  return (
    <div className="mx-auto h-dvh w-full max-w-[390px] bg-white text-neutral-900 dark:bg-neutral-950 dark:text-neutral-100">
      {step === 0 && <StepWhen onNext={() => setStep(1)} />}
      {step === 1 && <StepKnowledge onComplete={handleComplete} />}
    </div>
  )
}

export default OnboardingFlow

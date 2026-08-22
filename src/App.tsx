import { Outlet, Route, Routes } from 'react-router-dom'
import OnboardingFlow from './features/onboarding/OnboardingFlow'
import HomeScreen from './features/home/HomeScreen'
import AllowedScreen from './features/allowed/AllowedScreen'
import DictionaryScreen from './features/dictionary/DictionaryScreen'
import TimelineScreen from './features/timeline/TimelineScreen'
import BottomNav from './components/BottomNav'

function Placeholder({ name }: { name: string }) {
  return (
    <div className="flex h-dvh w-full max-w-[390px] mx-auto items-center justify-center bg-white text-neutral-900 dark:bg-neutral-950 dark:text-neutral-100">
      {name}
    </div>
  )
}

function AppLayout() {
  return (
    <>
      <Outlet />
      <BottomNav />
    </>
  )
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<OnboardingFlow />} />
      <Route element={<AppLayout />}>
        <Route path="/home" element={<HomeScreen />} />
        <Route path="/allowed" element={<AllowedScreen />} />
        <Route path="/dictionary" element={<DictionaryScreen />} />
        <Route path="/timeline" element={<TimelineScreen />} />
        <Route path="/sos" element={<Placeholder name="SOS" />} />
      </Route>
    </Routes>
  )
}

export default App

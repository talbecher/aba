import { Outlet, Route, Routes } from 'react-router-dom'
import OnboardingFlow from './features/onboarding/OnboardingFlow'
import HomeScreen from './features/home/HomeScreen'
import NowScreen from './features/now/NowScreen'
import ForDadScreen from './features/fordad/ForDadScreen'
import DidYouKnowScreen from './features/didyouknow/DidYouKnowScreen'
import TimelineScreen from './features/timeline/TimelineScreen'
import BottomNav from './components/BottomNav'

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
        <Route path="/now" element={<NowScreen />} />
        <Route path="/for-dad" element={<ForDadScreen />} />
        <Route path="/did-you-know" element={<DidYouKnowScreen />} />
        <Route path="/timeline" element={<TimelineScreen />} />
      </Route>
    </Routes>
  )
}

export default App

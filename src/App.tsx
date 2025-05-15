import { Routes, Route } from 'react-router-dom'
import WelcomePage from './components/WelcomePage'
import ChatPage from './components/ChatPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<WelcomePage />} />
      <Route path="/chat" element={<ChatPage />} />
    </Routes>
  )
}

export default App
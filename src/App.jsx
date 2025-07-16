import { useState } from 'react'
import ChatBox from './components/ChatBox'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <main className="min-h-screen bg-gray-50">
        <div className="chat chat-start">
          <div className="chat-bubble">
            It's over Anakin,
            <br />
            I have the high ground.
          </div>
        </div>
        <div className="chat chat-end">
          <div className="chat-bubble">You underestimate my power!</div>
        </div>
        <ChatBox />
      </main>

    </>
  )
}

export default App

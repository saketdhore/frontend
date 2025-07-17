import ChatContainer from './components/ChatContainer'
import Navbar from './components/Navbar'
import PromptSanbox from './components/PromptSanbox'
import SuggestionBox from './components/SuggestionBox'
function App() {
  return (
    <>
      <Navbar />
      <main className="flex min-h-screen bg-gray-50">
        <PromptSanbox />
        <SuggestionBox />
      </main>
    </>
  )
}

export default App

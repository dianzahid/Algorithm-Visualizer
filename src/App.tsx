import { useState } from 'react'
import AlgorithmVisualizer from './components/AlgorithmVisualizer'
import Chatbot from './components/Chatbot'

function App() {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<string>('bubble-sort')

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Algorithm Visualizer</h1>
        </div>
      </header>
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <AlgorithmVisualizer selectedAlgorithm={selectedAlgorithm} />
          </div>
          <div className="lg:col-span-1">
            <Chatbot />
          </div>
        </div>
      </main>
    </div>
  )
}

export default App

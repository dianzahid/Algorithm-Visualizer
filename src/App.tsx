import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import AlgorithmVisualizer from './components/AlgorithmVisualizer'
import GraphVisualizer from './components/GraphVisualizer'
import LandingPage from './components/LandingPage'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center">
              <Link to="/" className="text-3xl font-bold text-gray-900 hover:text-indigo-600">
                Algorithm Visualizer
              </Link>
              <nav className="space-x-4">
                <Link to="/" className="text-gray-600 hover:text-indigo-600">Home</Link>
                <Link to="/sorting" className="text-gray-600 hover:text-indigo-600">Sorting</Link>
                <Link to="/graph" className="text-gray-600 hover:text-indigo-600">Graph</Link>
              </nav>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/sorting" element={<AlgorithmVisualizer />} />
            <Route path="/graph" element={<GraphVisualizer />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App

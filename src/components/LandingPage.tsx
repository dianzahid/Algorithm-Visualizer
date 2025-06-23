import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

const LandingPage = () => {
  const navigate = useNavigate()

  const cardVariants = {
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.2
      }
    }
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Algorithm Visualizer
          </h1>
          <p className="text-xl text-gray-600">
            Choose an algorithm category to visualize
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <motion.div
            variants={cardVariants}
            whileHover="hover"
            className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer"
            onClick={() => navigate('/sorting')}
          >
            <div className="p-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                Sorting Algorithms
              </h2>
              <p className="text-gray-600 mb-4">
                Visualize array-based algorithms like Bubble Sort, Insertion Sort,
                Selection Sort, and Merge Sort using interactive bar animations.
              </p>
              <div className="flex justify-end">
                <span className="text-indigo-600 font-medium">Explore →</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={cardVariants}
            whileHover="hover"
            className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer"
            onClick={() => navigate('/graph')}
          >
            <div className="p-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                Graph Algorithms
              </h2>
              <p className="text-gray-600 mb-4">
                Explore node-based algorithms such as BFS, DFS, Dijkstra's, and
                Prim's Algorithm using interactive grid and node visualizations.
              </p>
              <div className="flex justify-end">
                <span className="text-indigo-600 font-medium">Explore →</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default LandingPage 
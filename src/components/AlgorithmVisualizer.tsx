import { useState } from 'react'
import { motion } from 'framer-motion'

interface AlgorithmVisualizerProps {
  selectedAlgorithm: string
}

const AlgorithmVisualizer: React.FC<AlgorithmVisualizerProps> = ({ selectedAlgorithm }) => {
  const [array, setArray] = useState<number[]>([])
  const [isPlaying, setIsPlaying] = useState(false)
  const [speed, setSpeed] = useState(1)

  const generateNewArray = () => {
    const newArray = Array.from({ length: 10 }, () => Math.floor(Math.random() * 100))
    setArray(newArray)
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex flex-col space-y-4">
        <div className="flex justify-between items-center">
          <select
            className="p-2 px-4 py-2 text-white rounded-md"
            value={selectedAlgorithm}
          >
            <option value="bubble-sort">Bubble Sort</option>
            <option value="selection-sort">Selection Sort</option>
            <option value="merge-sort">Merge Sort</option>
            <option value="insertion-sort">Insertion Sort</option>
          </select>
          <div className="flex space-x-2">
            <button
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
              onClick={generateNewArray}
            >
              Generate Array
            </button>
            <button
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
              onClick={() => setIsPlaying(!isPlaying)}
            >
              {isPlaying ? 'Pause' : 'Play'}
            </button>
          </div>
        </div>

        <div className="h-64 flex items-end space-x-2">
          {array.map((value, index) => (
            <motion.div
              key={index}
              className="w-8 bg-indigo-500 rounded-t-lg"
              style={{ height: `${value}%` }}
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            />
          ))}
        </div>

        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <label htmlFor="speed" className="text-sm font-medium text-gray-700">
              Speed:
            </label>
            <input
              type="range"
              id="speed"
              min="0.1"
              max="2"
              step="0.1"
              value={speed}
              onChange={(e) => setSpeed(parseFloat(e.target.value))}
              className="w-32"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default AlgorithmVisualizer 
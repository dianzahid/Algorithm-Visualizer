import { useState } from 'react'
import { motion } from 'framer-motion'

interface AlgorithmVisualizerProps {
  selectedAlgorithm: string
}

//make a component named AlgorithmVisualizer with a prop type selectedAlgorithm
const AlgorithmVisualizer: React.FC<AlgorithmVisualizerProps> = ({ selectedAlgorithm }) => {
  //state variables ** Important for UI to re render**
  const [array, setArray] = useState<number[]>([]) //initialize array to only hold numbers and empty 
  const [isPlaying, setIsPlaying] = useState(false) //initialize to flase (not playing or paused)
  const [speed, setSpeed] = useState(1) //initial speed is 1x

  const generateNewArray = () => {
    const newArray = Array.from({ length: 10 }, () => Math.floor(Math.random() * 100)) // Creats a new array size 10 with numbers from 0 to 99
    //console.log(newArray)
    setArray(newArray) //update the state variable array to newArray values
  }

  return (
    <div className="bg-white rounded-lg shadow p-6"> {/*The main div for the Visualizer */} 
      <div className="bg-flex flex-col space-y-4"> {/*The flex container for the Visualizer -- top are buttons -- middle is the graph -- bottom is the speed  */}
        <div className="flex justify-between items-center"> {/* top div and flex container for buttons */}
          <select
            className="bg-black px-4 py-2 text-white rounded-md cursor-pointer border-black border border-r-8"
          > {/* selector for type of sorting algorithm */}
            <option value="bubble-sort">Bubble Sort</option>
            <option value="selection-sort">Selection Sort</option>
            <option value="merge-sort">Merge Sort</option>
            <option value="insertion-sort">Insertion Sort</option>
          </select>

          <div className="flex space-x-2">
            <button // Generate Array button
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
              onClick={generateNewArray} 
            > {/* call the GenerateNewArrayFunction */}
              Generate Array
            </button>
            <button //Play sorting algorithm button
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
              onClick={() => setIsPlaying(!isPlaying)} 
            >
              {isPlaying ? 'Pause' : 'Play'} {/* update the text on the button */}
            </button>
          </div>
        </div>

        <div className="h-64 flex items-end space-x-2 pt-[10px]"> {/* middle div containing graph for visualization */}
          {array.map((value, index) => ( //For each loop
            <motion.div // motion div to set up animations and render bars 
              key={index}
              className="w-8 bg-indigo-500 rounded-t-lg min-h-[25px]"
              style={{ height: `${value+8}%` }}
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              ><span className='text-white flex justify-center'>{value}</span></motion.div>
          ))}
        </div>

        <div className="flex justify-between items-center"> {/* Bottom Div containing speed adjuster */}
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
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const AlgorithmVisualizer = () => {
  // Color configuration - centralized color management
  const getDefaultColor = (algorithm: string) => {
    switch (algorithm) {
      case 'bubble-sort':
        return 'bg-indigo-500'
      case 'merge-sort':
        return 'bg-indigo-500'
      default:
        return 'bg-indigo-500'
    }
  }

  //state variables ** Important for UI to re render**
  const [array, setArray] = useState<number[]>([]) //initialize array to only hold numbers and empty 
  const [isPlaying, setIsPlaying] = useState(false) //initialize to flase (not playing or paused)
  const [speed, setSpeed] = useState(1) //initial speed is 1x
  const [currentStep, setCurrentStep] = useState(0) //inital step 0 
  const [sortingSteps, setSortingSteps] = useState<number[][]>([]) //intial empty matrix of sorting steps
  const [selectedAlgorithm, setSelectedAlgorithm] = useState('bubble-sort') //starts in bubble-sort state 
  const [barColors, setBarColors] = useState<string[]>([]) //empty colours

  const generateNewArray = () => {
    const newArray = Array.from({ length: 10 }, () => Math.floor(Math.random() * 100)) // Creats a new array size 10 with numbers from 0 to 99
    //console.log(newArray)
    setArray(newArray) //update the state variable array to newArray values
    setCurrentStep(0) // make sure the following are in initial states 
    setSortingSteps([])
    setIsPlaying(false)
    setBarColors(newArray.map(() => getDefaultColor(selectedAlgorithm))) //use centralized color function
  }

  //implement bubbleSort Algroithm 
  const bubbleSort = (arr: number[]) => {   //takes param array 
    const steps: number[][] = [arr.slice()]  // slice to make a copy of the array and store it into a 2d array.  This is important for visualzation (each array in every step of the sorting process is shown) 
    const n = arr.length // the rest is normal bubblesort implementation 
    let swapped: boolean

    do {
      swapped = false
      for (let i = 0; i < n - 1; i++) {
        if (arr[i] > arr[i + 1]) {
          [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]] //Swap arr[i-1] and arr[i]
          swapped = true // do the outer loop again
          steps.push(arr.slice()) //push current array into steps 2d matrix  (for viusualization) -- Show an element shift 
        }
      }
    } while (swapped)
    
    //console.log(steps.length);
    return steps
  }

  //InstertionSort implementation
  const insertionSort = (arr:number[]) => {
    const steps: number[][] = [arr.slice()]
    for(let j = 1; j<arr.length; j++ ){
      let key = arr[j]
      let i = j-1

      while(i>=0 && arr[i] > key){
        arr[i+1] = arr[i]
        i = i-1
        steps.push(arr.slice()) //show element shift 
      }
      arr[i+1] = key
      steps.push(arr.slice()) //show element shift 
    }
    //console.log(steps);
    return steps;
  }

  //selectionSort implementation
  const selectionSort = (arr: number[]) => {
    const steps: number[][] = [arr.slice()]

    for (let i = 0; i<arr.length; i++){
      let min = i
      for(let j=i+1; j < arr.length; j++){
        if(arr[j] < arr[min]){
          min = j
        }
      }
      if (i !== min){
        [arr[i], arr[min]] = [arr[min], arr[i]];
        steps.push(arr.slice());
      }
    }
    return steps
  }

// merge sort implementation 
  const mergeSort = (arr: number[]) => {
    const steps: number[][] = [arr.slice()] //create the initial matrix with only arr
    const colors: string[][] = [arr.map(() => 'bg-indigo-500')] //set every colour to default
    
    //merge function 
    const merge = (left: number[], right: number[], startIdx: number, depth: number) => {
      const result: number[] = []
      let i = 0, j = 0
      
      // Color the bars being merged
      const currentColors = [...colors[colors.length - 1]]
      for (let k = startIdx; k < startIdx + left.length + right.length; k++) {
        currentColors[k] = 'bg-yellow-500'
      }
      colors.push([...currentColors])
      steps.push([...arr]) //spread operator -- same as arr.slice()
      
      while (i < left.length && j < right.length) {
        if (left[i] <= right[j]) {
          result.push(left[i])
          i++
        } else {
          result.push(right[j])
          j++
        }
      }
      
      while (i < left.length) {
        result.push(left[i])
        i++
      }
      
      while (j < right.length) {
        result.push(right[j])
        j++
      }
      
      // Update the original array with merged result
      for (let k = 0; k < result.length; k++) {
        arr[startIdx + k] = result[k]
      }
      
      // Color the merged bars
      const mergedColors = [...colors[colors.length - 1]]
      for (let k = startIdx; k < startIdx + result.length; k++) {
        mergedColors[k] = 'bg-green-500'
      }
      colors.push([...mergedColors])
      steps.push([...arr])
    }
    
    //sort function 
    const sort = (arr: number[], start: number, end: number, depth: number) => {
      if (end - start <= 1) return

      const mid = Math.floor((start + end) / 2)
      
      // Color the bars being divided
      const currentColors = [...colors[colors.length - 1]]
      for (let k = start; k < end; k++) {
        currentColors[k] = 'bg-blue-500'
      }
      colors.push([...currentColors])
      steps.push([...arr])
      
      // recursive call to sort function 
      sort(arr, start, mid, depth + 1)
      sort(arr, mid, end, depth + 1)
      //call merge function 
      merge(arr.slice(start, mid), arr.slice(mid, end), start, depth)
    }
    
    //call sort function 
    sort(arr, 0, arr.length, 0)
    
    // Add final step with original color
    const finalColors = arr.map(() => 'bg-indigo-500')
    colors.push(finalColors)
    steps.push([...arr])
    
    //return the object of steps and colors 
    return { steps, colors }
  }

  //runs everytime a component renders or a value changes 
  useEffect(() => {
    if (isPlaying && currentStep < sortingSteps.length - 1) {
      const timer = setTimeout(() => {
        setCurrentStep(prev => prev + 1)
        setArray(sortingSteps[currentStep + 1])
        if (selectedAlgorithm === 'merge-sort') {
          const result = mergeSort([...array]) //call merge sort function 
          setBarColors(result.colors[currentStep + 1]) //set the bar colors to the next step 
        }
      }, 1000 / speed)
      return () => clearTimeout(timer)
    } else if (currentStep >= sortingSteps.length - 1) {
      setIsPlaying(false)
      // Ensure bars return to appropriate color when sorting is complete
      setBarColors(array.map(() => getDefaultColor(selectedAlgorithm)))
    }
  }, [isPlaying, currentStep, sortingSteps, speed, selectedAlgorithm, array]) //dependency array, re-renders when these values change

  //called when play is clicked
  const handlePlay = () => {
    if (!isPlaying && currentStep === 0) {
      let steps: number[][] = []
      let colors: string[][] = []
      
      if(selectedAlgorithm === 'bubble-sort'){
        steps = bubbleSort([...array]) //call bubble sort function 
        colors = steps.map(() => array.map(() => getDefaultColor(selectedAlgorithm)))
      } else if (selectedAlgorithm === 'insertion-sort'){
        steps = insertionSort([...array])
        colors = steps.map(() => array.map(() => getDefaultColor(selectedAlgorithm)))
      }
      else if (selectedAlgorithm === 'selection-sort'){
        steps = selectionSort([...array])
        colors = steps.map(() => array.map(() => getDefaultColor(selectedAlgorithm)))
      }
      else if (selectedAlgorithm === 'merge-sort'){
        const result = mergeSort([...array]) //call merge sort function, save the object of steps and colors to result
        steps = result.steps
        colors = result.colors
        console.log(steps);
        console.log(colors);
      }
      
      setSortingSteps(steps)
      setBarColors(colors[0]) //set the bar colors to the first step 
    }
    setIsPlaying(!isPlaying)
  }

  return (
    <div className="bg-white rounded-lg shadow p-6"> {/*The main div for the Visualizer */} 
      <div className="bg-flex flex-col space-y-4"> {/*The flex container for the Visualizer -- top are buttons -- middle is the graph -- bottom is the speed  */}
        <div className="flex justify-between items-center"> {/* top div and flex container for buttons */}
          <select
            value={selectedAlgorithm}
            onChange={(e) => {
              setSelectedAlgorithm(e.target.value) //set the state to the user chosen
            }}
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
              onClick={handlePlay} 
            >
              {isPlaying ? 'Pause' : 'Play'} {/* update the text on the button */}
            </button>
          </div>
        </div>

        <div className="h-64 flex items-end space-x-2 pt-[10px]"> {/* middle div containing graph for visualization */}
          {array.map((value, index) => ( //For each loop
            <motion.div // motion div to set up animations and render bars 
              key={index}
              className={`w-8 ${barColors[index] || 'bg-yellow-500'} rounded-t-lg min-h-[25px]`}
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
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

  // Algorithm information configuration
  const getAlgorithmInfo = (algorithm: string) => {
    switch (algorithm) {
      case 'bubble-sort':
        return {
          name: 'Bubble Sort',
          timeComplexity: {
            best: 'O(n)',
            average: 'O(n²)',
            worst: 'O(n²)'
          },
          spaceComplexity: 'O(1)',
          description: 'Bubble Sort is a simple sorting algorithm that repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order. The algorithm gets its name because smaller elements "bubble" to the top of the list. It\'s not efficient for large datasets but is easy to understand and implement.',
          howItWorks: 'The algorithm works by repeatedly stepping through the list to be sorted, comparing each pair of adjacent items and swapping them if they are in the wrong order. The pass through the list is repeated until no swaps are needed, which indicates that the list is sorted.',
          useCases: 'Bubble Sort is mainly used for educational purposes and when simplicity is preferred over efficiency. It can be useful for small datasets or when the data is nearly sorted.'
        }
      case 'insertion-sort':
        return {
          name: 'Insertion Sort',
          timeComplexity: {
            best: 'O(n)',
            average: 'O(n²)',
            worst: 'O(n²)'
          },
          spaceComplexity: 'O(1)',
          description: 'Insertion Sort is a simple sorting algorithm that builds the final sorted array one item at a time. It is much less efficient on large lists than more advanced algorithms such as quicksort, heapsort, or merge sort.',
          howItWorks: 'The algorithm works by taking each element from the array and inserting it into its correct position in a sorted subarray. It starts with the second element and compares it with the first element, then moves to the third element and inserts it into the correct position among the first two elements, and so on.',
          useCases: 'Insertion Sort is efficient for small data sets and is often used as part of more sophisticated algorithms. It works well when the data is nearly sorted or when the dataset is small.'
        }
      case 'selection-sort':
        return {
          name: 'Selection Sort',
          timeComplexity: {
            best: 'O(n²)',
            average: 'O(n²)',
            worst: 'O(n²)'
          },
          spaceComplexity: 'O(1)',
          description: 'Selection Sort is an in-place comparison sorting algorithm that divides the input list into two parts: a sorted sublist of items which is built up from left to right and a sublist of the remaining unsorted items.',
          howItWorks: 'The algorithm repeatedly selects the smallest element from the unsorted sublist and places it at the end of the sorted sublist. This process continues until the unsorted sublist becomes empty.',
          useCases: 'Selection Sort is simple to implement and performs well on small lists. It has the advantage of making the minimum number of swaps, which can be beneficial when swap operations are expensive.'
        }
      case 'merge-sort':
        return {
          name: 'Merge Sort',
          timeComplexity: {
            best: 'O(n log n)',
            average: 'O(n log n)',
            worst: 'O(n log n)'
          },
          spaceComplexity: 'O(n)',
          description: 'Merge Sort is an efficient, stable, comparison-based, divide and conquer sorting algorithm. It divides the input array into two halves, recursively sorts them, and then merges the sorted halves.',
          howItWorks: 'The algorithm works by dividing the unsorted list into n sublists, each containing one element (a list of one element is considered sorted). Then repeatedly merge sublists to produce new sorted sublists until there is only one sublist remaining.',
          useCases: 'Merge Sort is excellent for sorting linked lists and is often used in external sorting. It\'s also used in many programming languages\' built-in sort functions due to its guaranteed O(n log n) performance.'
        }
      default:
        return {
          name: 'Unknown Algorithm',
          timeComplexity: {
            best: 'N/A',
            average: 'N/A',
            worst: 'N/A'
          },
          spaceComplexity: 'N/A',
          description: 'Please select an algorithm to view its information.',
          howItWorks: '',
          useCases: ''
        }
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
  const [arraySize, setArraySize] = useState(10) //initial array size is 10
  const [algorithmColors, setAlgorithmColors] = useState<string[][]>([]) //store colors for each step

  const generateNewArray = () => {
    const newArray = Array.from({ length: arraySize }, () => Math.floor(Math.random() * 100)) // Creates a new array with dynamic size
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
    const colors: string[][] = [arr.map(() => 'bg-indigo-500')] //set every colour to default
    const n = arr.length // the rest is normal bubblesort implementation 
    let swapped: boolean

    do {
      swapped = false
      for (let i = 0; i < n - 1; i++) {
        // Color the elements being compared
        const currentColors = [...colors[colors.length - 1]]
        currentColors[i] = 'bg-yellow-500'
        currentColors[i + 1] = 'bg-yellow-500'
        colors.push([...currentColors])
        steps.push([...arr])
        
        if (arr[i] > arr[i + 1]) {
          [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]] //Swap arr[i-1] and arr[i]
          swapped = true // do the outer loop again
          
          // Color the swapped elements
          const swappedColors = [...colors[colors.length - 1]]
          swappedColors[i] = 'bg-green-500'
          swappedColors[i + 1] = 'bg-green-500'
          colors.push([...swappedColors])
          steps.push(arr.slice()) //push current array into steps 2d matrix  (for viusualization) -- Show an element shift 
        } else {
          // Color the elements that don't need swapping
          const noSwapColors = [...colors[colors.length - 1]]
          noSwapColors[i] = 'bg-blue-500'
          noSwapColors[i + 1] = 'bg-blue-500'
          colors.push([...noSwapColors])
          steps.push([...arr])
        }
      }
    } while (swapped)
    
    // Add final step with original color
    const finalColors = arr.map(() => 'bg-indigo-500')
    colors.push(finalColors)
    steps.push([...arr])
    
    //console.log(steps.length);
    return { steps, colors }
  }

  //InstertionSort implementation
  const insertionSort = (arr:number[]) => {
    const steps: number[][] = [arr.slice()]
    const colors: string[][] = [arr.map(() => 'bg-indigo-500')]
    
    for(let j = 1; j<arr.length; j++ ){
      let key = arr[j]
      let i = j-1

      // Color the key element
      const keyColors = [...colors[colors.length - 1]]
      keyColors[j] = 'bg-yellow-500'
      colors.push([...keyColors])
      steps.push([...arr])

      while(i>=0 && arr[i] > key){
        // Color the element being shifted
        const shiftColors = [...colors[colors.length - 1]]
        shiftColors[i] = 'bg-red-500'
        colors.push([...shiftColors])
        steps.push([...arr])
        
        arr[i+1] = arr[i]
        i = i-1
      }
      arr[i+1] = key
      
      // Color the inserted element
      const insertedColors = [...colors[colors.length - 1]]
      insertedColors[i+1] = 'bg-green-500'
      colors.push([...insertedColors])
      steps.push([...arr]) //show element shift 
    }
    
    // Add final step with original color
    const finalColors = arr.map(() => 'bg-indigo-500')
    colors.push(finalColors)
    steps.push([...arr])
    
    //console.log(steps);
    return { steps, colors }
  }

  //selectionSort implementation
  const selectionSort = (arr: number[]) => {
    const steps: number[][] = [arr.slice()]
    const colors: string[][] = [arr.map(() => 'bg-indigo-500')]

    for (let i = 0; i<arr.length; i++){
      let min = i
      
      // Color the current position
      const currentColors = [...colors[colors.length - 1]]
      currentColors[i] = 'bg-blue-500'
      colors.push([...currentColors])
      steps.push([...arr])
      
      for(let j=i+1; j < arr.length; j++){
        // Color the element being compared
        const compareColors = [...colors[colors.length - 1]]
        compareColors[j] = 'bg-yellow-500'
        colors.push([...compareColors])
        steps.push([...arr])
        
        if(arr[j] < arr[min]){
          min = j
          
          // Color the new minimum
          const minColors = [...colors[colors.length - 1]]
          minColors[min] = 'bg-green-500'
          colors.push([...minColors])
          steps.push([...arr])
        }
      }
      if (i !== min){
        [arr[i], arr[min]] = [arr[min], arr[i]];
        
        // Color the swapped elements
        const swappedColors = [...colors[colors.length - 1]]
        swappedColors[i] = 'bg-green-500'
        swappedColors[min] = 'bg-green-500'
        colors.push([...swappedColors])
        steps.push([...arr]);
      }
    }
    
    // Add final step with original color
    const finalColors = arr.map(() => 'bg-indigo-500')
    colors.push(finalColors)
    steps.push([...arr])
    
    return { steps, colors }
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
        // Update colors from the stored algorithm colors
        if (currentStep + 1 < algorithmColors.length) {
          setBarColors(algorithmColors[currentStep + 1])
        }
      }, 1000 / speed)
      return () => clearTimeout(timer)
    } else if (currentStep >= sortingSteps.length - 1) {
      setIsPlaying(false)
      // Ensure bars return to appropriate color when sorting is complete
      setBarColors(array.map(() => getDefaultColor(selectedAlgorithm)))
    }
  }, [isPlaying, currentStep, sortingSteps, algorithmColors, speed, selectedAlgorithm, array]) //dependency array, re-renders when these values change

  // Regenerate array when array size changes
  useEffect(() => {
    if (array.length > 0) {
      generateNewArray()
    }
  }, [arraySize]) // Only regenerate if array size changes and there's already an array

  //called when play is clicked
  const handlePlay = () => {
    if (!isPlaying && currentStep === 0) {
      let steps: number[][] = []
      let colors: string[][] = []
      
      if(selectedAlgorithm === 'bubble-sort'){
        const result = bubbleSort([...array]) //call bubble sort function 
        steps = result.steps
        colors = result.colors
      } else if (selectedAlgorithm === 'insertion-sort'){
        const result = insertionSort([...array])
        steps = result.steps
        colors = result.colors
      }
      else if (selectedAlgorithm === 'selection-sort'){
        const result = selectionSort([...array])
        steps = result.steps
        colors = result.colors
      }
      else if (selectedAlgorithm === 'merge-sort'){
        const result = mergeSort([...array]) //call merge sort function, save the object of steps and colors to result
        steps = result.steps
        colors = result.colors
        console.log(steps);
        console.log(colors);
      }
      
      setSortingSteps(steps)
      setAlgorithmColors(colors)
      setBarColors(colors[0]) //set the bar colors to the first step 
    }
    setIsPlaying(!isPlaying)
  }

  return (
    <div className="bg-white rounded-lg shadow p-6"> {/*The main div for the Visualizer */} 
      <div className="bg-flex flex-col space-y-4"> {/*The flex container for the Visualizer -- top are buttons -- middle is the graph -- bottom is the speed  */}
        <div className="flex justify-between items-center"> {/* top div and flex container for buttons */}
          <div className="flex flex-col space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Select Sorting Algorithm:
            </label>
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
          </div>

          <div className="flex flex-col space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Controls:
            </label>
            <div className="flex space-x-2">
              <button // Generate Array button
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
                onClick={generateNewArray} 
              > {/* call the GenerateNewArrayFunction */}
                Generate Array
              </button>
              <button //Play sorting algorithm button
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
                onClick={handlePlay} 
              >
                {isPlaying ? 'Pause' : 'Play'} {/* update the text on the button */}
              </button>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-xs text-gray-500">Small</span>
              <div className="relative group">
                <input
                  type="range"
                  min="5"
                  max="25"
                  step="1"
                  value={arraySize}
                  onChange={(e) => setArraySize(parseInt(e.target.value))}
                  className="w-24"
                />
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
                  {arraySize} Elements
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800"></div>
                </div>
              </div>
              <span className="text-xs text-gray-500">Large</span>
            </div>
          </div>
        </div>

        <div className="h-64 flex items-end space-x-2 pt-[10px] overflow-x-auto"> {/* middle div containing graph for visualization */}
          {array.length > 0 ? (
            array.map((value, index) => ( //For each loop
              <motion.div // motion div to set up animations and render bars 
                key={index}
                className={`w-8 ${barColors[index] || 'bg-yellow-500'} rounded-t-lg min-h-[25px] flex-shrink-0`}
                style={{ height: `${Math.min(value + 8, 92)}%` }}
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                ><span className='text-white flex justify-center'>{value}</span></motion.div>
            ))
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center text-gray-400">
              <h3 className="text-xl font-semibold mb-2">No Array Generated</h3>
              <p className="text-center max-w-md">
                Click "Generate Array" to create a new array and start visualizing sorting algorithms!
              </p>
            </div>
          )}
        </div>

        <div className="flex justify-between items-center"> {/* Bottom Div containing speed adjuster */}
          <div className="flex flex-col space-y-2">
            <label htmlFor="speed" className="text-sm font-medium text-gray-700">
              Animation Speed:
            </label>
            <div className="flex items-center space-x-2">
              <span className="text-xs text-gray-500">Slow</span>
              <div className="relative group">
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
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
                  {speed}x Speed
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800"></div>
                </div>
              </div>
              <span className="text-xs text-gray-500">Fast</span>
            </div>
          </div>
        </div>

        {/* Algorithm Information Section */}
        <div className="mt-8 border-t pt-6">
          {/* Time Complexity Section */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Time Complexity</h3>
            <div className="grid grid-cols-4 gap-4">
              <div className="bg-blue-50 p-3 rounded-lg">
                <div className="text-sm font-medium text-blue-600">Best Case</div>
                <div className="text-lg font-bold text-blue-800">{getAlgorithmInfo(selectedAlgorithm).timeComplexity.best}</div>
              </div>
              <div className="bg-yellow-50 p-3 rounded-lg">
                <div className="text-sm font-medium text-yellow-600">Average Case</div>
                <div className="text-lg font-bold text-yellow-800">{getAlgorithmInfo(selectedAlgorithm).timeComplexity.average}</div>
              </div>
              <div className="bg-red-50 p-3 rounded-lg">
                <div className="text-sm font-medium text-red-600">Worst Case</div>
                <div className="text-lg font-bold text-red-800">{getAlgorithmInfo(selectedAlgorithm).timeComplexity.worst}</div>
              </div>
              <div className="bg-green-50 p-3 rounded-lg">
                <div className="text-sm font-medium text-green-600">Space Complexity</div>
                <div className="text-lg font-bold text-green-800">{getAlgorithmInfo(selectedAlgorithm).spaceComplexity}</div>
              </div>
            </div>
          </div>

          {/* Algorithm Details Section */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">{getAlgorithmInfo(selectedAlgorithm).name}</h3>
            <div className="space-y-4">
              <div>
                <h4 className="text-md font-medium text-gray-700 mb-2">Description</h4>
                <p className="text-gray-600 leading-relaxed">{getAlgorithmInfo(selectedAlgorithm).description}</p>
              </div>
              <div>
                <h4 className="text-md font-medium text-gray-700 mb-2">How It Works</h4>
                <p className="text-gray-600 leading-relaxed">{getAlgorithmInfo(selectedAlgorithm).howItWorks}</p>
              </div>
              <div>
                <h4 className="text-md font-medium text-gray-700 mb-2">Use Cases</h4>
                <p className="text-gray-600 leading-relaxed">{getAlgorithmInfo(selectedAlgorithm).useCases}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AlgorithmVisualizer 
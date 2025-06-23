import { useState } from 'react'

const GraphVisualizer = () => {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState('bfs')

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex flex-col space-y-4">
        <div className="flex justify-between items-center">
          <select
            value={selectedAlgorithm}
            onChange={(e) => setSelectedAlgorithm(e.target.value)}
            className="bg-black px-4 py-2 text-white rounded-md cursor-pointer border-black border border-r-8"
          >
            <option value="bfs">Breadth-First Search</option>
            <option value="dfs">Depth-First Search</option>
            <option value="dijkstra">Dijkstra's Algorithm</option>
            <option value="prim">Prim's Algorithm</option>
          </select>
        </div>

        <div className="h-96 bg-gray-100 rounded-lg flex items-center justify-center">
          <p className="text-gray-500">Graph visualization coming soon...</p>
        </div>
      </div>
    </div>
  )
}

export default GraphVisualizer 
import { useState } from 'react'

interface Message {
  text: string
  sender: 'user' | 'bot'
}

const Chatbot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')

  const handleSendMessage = () => {
    if (input.trim() === '') return

    // Add user message
    const newMessages = [...messages, { text: input, sender: 'user' as const }]
    setMessages(newMessages)
    setInput('')

    // Simulate bot response
    setTimeout(() => {
      const botResponse = getBotResponse(input)
      setMessages([...newMessages, { text: botResponse, sender: 'bot' as const }])
    }, 1000)
  }

  const getBotResponse = (userInput: string): string => {
    const lowerInput = userInput.toLowerCase()
    
    if (lowerInput.includes('bubble sort')) {
      return 'Bubble Sort is a simple sorting algorithm that repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order.'
    } else if (lowerInput.includes('selection sort')) {
      return 'Selection Sort is an in-place comparison sorting algorithm that divides the input list into two parts: the sublist of items already sorted and the sublist of items remaining to be sorted.'
    } else if (lowerInput.includes('merge sort')) {
      return 'Merge Sort is a divide-and-conquer algorithm that divides the input array into two halves, calls itself for the two halves, and then merges the two sorted halves.'
    } else if (lowerInput.includes('quick sort')) {
      return 'Quick Sort is a divide-and-conquer algorithm that works by selecting a pivot element and partitioning the array around the pivot, such that elements smaller than the pivot are on the left and elements greater than the pivot are on the right.'
    } else {
      return 'I can help you understand various sorting algorithms. Try asking about Bubble Sort, Selection Sort, Merge Sort, or Quick Sort!'
    }
  }

  return (
    <div className="bg-white rounded-lg shadow p-6 h-full flex flex-col">
      <h2 className="text-xl font-semibold mb-4">Algorithm Chatbot</h2>
      
      <div className="flex-1 overflow-y-auto mb-4 space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${
              message.sender === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`max-w-[80%] rounded-lg p-3 ${
                message.sender === 'user'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 text-gray-800'
              }`}
            >
              {message.text}
            </div>
          </div>
        ))}
      </div>

      <div className="flex space-x-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          placeholder="Ask about algorithms..."
          className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
        <button
          onClick={handleSendMessage}
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
        >
          Send
        </button>
      </div>
    </div>
  )
}

export default Chatbot 
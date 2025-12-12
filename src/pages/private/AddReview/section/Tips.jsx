import React from 'react'

function Tips() {
  return (
    <div className="mt-8 bg-accent/20 rounded-2xl p-6 border-2 border-accent/30">
          <h3
            className="font-bold font-popins text-base-content mb-3 flex items-center gap-2"
          >
            💡 Tips for a great review
          </h3>
          <ul
            className="space-y-2 text-sm font-inter text-neutral"
          >
            <li>• Take a clear, well-lit photo of the food</li>
            <li>• Be specific about what you liked or didn't like</li>
            <li>• Mention the portion size and value for money</li>
            <li>• Include details about service and ambiance if relevant</li>
            <li>• Be honest but respectful in your feedback</li>
          </ul>
        </div>
  )
}

export default Tips;
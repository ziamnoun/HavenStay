import React from 'react'

export default function HomePage() {
  return (
    <div className='min-h-screen bg-white'>
        {/* Upper part using grid layout */}
        <div className="div-upper-part h-[80%] bg-slate-500 grid grid-cols-2">
            <div className="div-1 bg-blue-500">iiijji</div>
            <div className="div-2 bg-yellow-500">1111</div>
        </div>
        
        {/* Lower part using flex layout */}
        <div className="div-lower-part h-[20%] bg-red-950 grid grid-cols-2">
            <div className="div-1 bg-green-500">fffff</div>
            <div className="div-2 bg-purple-500">222</div>
        </div>
    </div>
  )
}

import React from 'react'

const Tabs = (props) => {


  return (
    <div className="inline-flex items-center border-b-gray-300">
        <span className={`ml-4 py-2 bg-white hover:bg-slate-100 border-b-4 ${props.active === 'Inbox' ? "border-b-red-400" : "border-b-white"}`}><button className={`my-3 px-4 text-base border-r`} onClick={(e) => props.action(e, 'Inbox')}>Inbox</button></span>
        <span className={`py-2 bg-white hover:bg-slate-100 border-b-4 ${props.active === 'Archive' ? "border-b-red-400" : "border-b-white"}`}><button className={`my-3 px-4 text-base border-r`} onClick={(e) => props.action(e, 'Archive')}>Archive</button></span>
    </div>
  )
}

export default Tabs;
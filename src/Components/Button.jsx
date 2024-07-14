import React from 'react'
import Archive from '../Helper/Archive.jsx';

const Button = ({hide, clickAction, unarchive, label, disabled}) => {
  return (
    <div className="flex mt-3">
        <button type="button" className={`p-4 mx-4 my-2 border rounded-lg border-gray-400 text-indigo-950 bg-slate-100 hover:bg-slate-200 drop-shadow-sm font-semibold flex items-center flex-1 ${hide && "hidden"}`} style={disabled ? {opacity: 0.2} : {}}onClick={clickAction} disabled={disabled}><span className='pr-2'><Archive unarchive={unarchive}/></span> {label}</button>
    </div>
  )
}

export default Button;

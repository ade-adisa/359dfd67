import React from 'react'
import Archive from '../Helper/Archive.jsx';

const Button = (props) => {
  return (
    <div className="flex mt-3">
        <button type="button" className={`bg-white p-4 mx-4 my-2 border rounded-lg border-gray-400 text-indigo-950 bg-slate-100 hover:bg-slate-200 drop-shadow-sm font-semibold flex items-center flex-1 ${props.hide && "hidden"}`} onClick={props.clickAction}><span className='pr-2'><Archive unarchive={props.unarchive}/></span> {props.label}</button>
    </div>
  )
}

export default Button;

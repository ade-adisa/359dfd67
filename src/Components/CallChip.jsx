import React from 'react'
import {FormatTime, FormatDate} from '../Helper/DateandTimeHelper.js';
import Incoming from '../Helper/Incoming.jsx';
import Archive from '../Helper/Archive.jsx';
import Outgoing from '../Helper/Outgoing.jsx';

const CallChip = ({data, clickAction, archiveAction, unarchiveAction}) => {
  return (
    <div>
        {data.length > 0 ? data.map(item => FormatDate(item.created_at)).filter((value, index, self) => self.indexOf(value) === index).map(call => 
            <div className="flex flex-col" key={call.id}>
                <h2 className='border-b border-dashed border-gray-400 w-full text-center mt-3 mb-4' style={{lineHeight: "0.1em"}}><span className="px-2 uppercase bg-white text-center text-gray-500">{call}</span></h2>
                {data.filter(day => FormatDate(day.created_at) === call).map(callChip => 
                    <div role="button"
                        key={callChip.id}
                        className="border-gray-400 border rounded-lg mb-2 mt-2 mx-4 text-800 p-2 flex items-center justify-between bg-white hover:bg-slate-50"
                        onKeyDown={undefined}
                        onClick={() => clickAction(callChip.id)}
                    >
                        <div className="flex items-center cursor-pointer justify-between max-w-full flex-1">
                            <span className="flex items-center justify-start w-3/4" style={{ maxWidth: "60%"}}>
                                <span className="mr-3 text-xs">
                                    {callChip.direction === "inbound" ? <Incoming answered={callChip.call_type === "answered"}/> : <Outgoing answered={callChip.call_type === "answered"}/>}
                                </span>
                                <span className="flex flex-col">
                                    <div className="max-w-full font-semibold flex items-center">
                                        {callChip.from} <span className={`circle ml-2 ${callChip.duration === 0 && "hidden"}`}>{callChip.duration}</span>
                                    </div>
                                    <div className="text-xs avertBg text-gray-400">
                                        {`tried to call on ${callChip.to}`}
                                    </div>
                                </span>
                            </span>
                            <span className="flex">
                                <span className="flex items-center ml-2 border-r border-gray-300 py-1 px-2 text-xs">
                                    {FormatTime(callChip.created_at)}
                                </span>
                                <span className="flex items-center text-xs">
                                    <button type="button" className='bg-white p-1 pl-2 rounded-lg text-indigo-950 font-semibold flex items-center flex-1' onClick={(e)=>{callChip.is_archived ? unarchiveAction(e, callChip.id) : archiveAction(e, callChip.id)}}><Archive unarchive={callChip.is_archived}/></button>
                                </span>
                            </span>
                        </div>
                    </div>
                )}
            </div>
        )
        : 
        <div className={`flex items-center text-center justify-center`} style={{height: "calc(666px - 200px)"}}>
            No logs here
        </div>
    }
    </div>
  )
}

export default CallChip;

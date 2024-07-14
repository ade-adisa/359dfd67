import React, {useState, useEffect} from 'react';
import {FormatTime} from '../Helper/DateandTimeHelper.js';
import Incoming from '../Helper/Incoming.jsx';
import Outgoing from '../Helper/Outgoing.jsx';

const ActivityDetail = ({id, backAction}) => {

    const [detailData, setDetailData] = useState({});
    const BASE_URL = "https://aircall-backend.onrender.com"

    useEffect(() => {
        fetch(`${BASE_URL}/activities/${id}`)
          .then(res => res.json())
          .then(data => setDetailData(data));
    }, [id]);
    

    return (
        <div>
            <span className={`mx-4 py-2 bg-indigo-100 hover:bg-indigo-200 border-1 rounded-lg`}><button className="my-3 px-3 text-md" onClick={backAction}>Back</button></span>
            <div className="mx-4 pt-4 font-semibold border-t" style={{marginTop: 8, paddingTop: 6, borderTop: "1px solid lightgray"}}>Details</div>
            <div key={detailData.id}
                id={detailData.id} className="border-gray-400 border rounded-lg mb-2 mt-2 mx-4 text-800 p-2 flex items-center justify-between bg-white"
            >
                <div className="flex items-center justify-between max-w-full flex-1">
                    <span className="flex items-center justify-start w-3/4" style={{ maxWidth: "60%"}}>
                        <span className="mr-3 text-xs">
                            {detailData.direction === "inbound" ? <Incoming answered={detailData.call_type === "answered"}/> : <Outgoing answered={detailData.call_type === "answered"}/>}
                        </span>
                        <span className="flex flex-col">
                            <div className={`max-w-full font-medium text-xs text-red-400 pb-2 ${!detailData.is_archived && "hidden"}`}>
                                {detailData.is_archived && `ARCHIVED`}
                            </div>
                            <div className="max-w-full font-semibold flex items-center">
                                {detailData.from} <span className={`circle ml-2 ${(detailData.duration === 0 || detailData.duration === undefined) && "hidden"}`}>{detailData.duration}</span>
                            </div>
                            <div className="max-w-full text-gray-400">
                                {detailData.to}
                            </div>
                            <div className="text-xs avertBg text-gray-400">
                                {`tried to call on ${detailData.via}`}
                            </div>
                        </span>
                    </span>
                    <span className="flex items-center ml-2 border-l border-gray-300 py-1 px-2 text-xs">
                        {FormatTime(detailData.created_at)}
                    </span>
                </div>
            </div>
        </div>
    )
}

export default ActivityDetail;

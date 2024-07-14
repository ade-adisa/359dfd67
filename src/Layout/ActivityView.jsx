import React, {useState, useEffect} from 'react';
import {FormatTime, FormatDate} from '../Helper/DateandTimeHelper.js';
import Button from '../Components/Button.jsx';
import CallChip from '../Components/CallChip.jsx';
import ActivityDetail from './ActivityDetail.jsx';
import Tabs from '../Components/Tabs.jsx';
import Header from '../Components/Header.jsx';



const ActivityView = () => {

    const [callData, setCallData] = useState([]);
    const [archived, setArchived] = useState(false);
    const [activeTab, setActiveTab] = useState("Inbox");
    const [detailId, setDetailId] = useState("");
    const [detailView, setDetailView] = useState(false);



    const BASE_URL = "https://aircall-backend.onrender.com"

    useEffect(() => {
        fetch(`${BASE_URL}/activities`)
          .then(res => res.json())
          .then(data => setCallData(data));
    }, []);

    const archiveAction = (e, call_id) => {
        e.stopPropagation();
        const updatedData = callData.filter(val => val.id === call_id).map(dat => ({...dat, is_archived: true}))
        fetch(`${BASE_URL}/activities/${call_id}`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              method: 'PATCH',                                                              
              body: JSON.stringify(updatedData[0])
        })
    }

    const unarchiveAction = (e, call_id) => {
        e.stopPropagation();
        const updatedData = callData.filter(val => val.id === call_id).map(dat => ({...dat, is_archived: false}))
        fetch(`${BASE_URL}/activities/${call_id}`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              method: 'PATCH',                                                              
              body: JSON.stringify(updatedData[0])
        })
        console.log(updatedData);
    }

    const archiveAllAction = () => {
        const updatedData = callData.filter(e => !e.is_archived).map(dat => ({...dat, is_archived: true}))
        updatedData.forEach((element) => 
            fetch(`${BASE_URL}/activities/${element.id}`, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: 'PATCH',                                                              
                body: JSON.stringify(element)
            })
        );
    }

    const unArchiveAllAction = () => {
        fetch(`${BASE_URL}/reset`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': null
            },
            method: 'PATCH',                                                              
        });
        // window.location.reload();
    }

    const tabAction = (e, label) => {
        setActiveTab(label);
        setArchived(label === "Archive" ? true : false);
    }

    const showDetailAction = (id) => {
        setDetailId(id);
        setDetailView(true);
    }

    return (
        <div className=''>
            <div className='flex px-4 justify-between border-b '>
                <Header/>
                <Tabs action={tabAction} active={activeTab}/>
            </div>

            {archived ?
                <Button label={"Restore all calls"} clickAction={unArchiveAllAction} hide={detailView} unarchive/>
                :
                <Button label={"Archive all calls"} clickAction={archiveAllAction} hide={detailView}/>
            }

            <div className='overflow-x-auto	overflow-y-auto pb-4' style={{width: "inherit", maxHeight: "calc(666px - 200px)"}}>
                {detailView ?
                    <ActivityDetail id={detailId} backAction={() => setDetailView(false)}/>
                :
                    <CallChip data={callData.filter(call => call.is_archived === archived)} clickAction={showDetailAction} archiveAction={archiveAction} unarchiveAction={unarchiveAction}/>
                }
            </div>

        </div>
    )
}

export default ActivityView;
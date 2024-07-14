import React, {useState, useEffect} from 'react';
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
    const [refreshView, setRefreshView] = useState();
    const BASE_URL = "https://aircall-backend.onrender.com"

    useEffect(() => {
        fetch(`${BASE_URL}/activities`)
          .then(res => res.json())
          .then(data => setCallData(data))
          .catch(error => console.error(error));
    }, [refreshView]);

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
        .then(data => setRefreshView(data))
        .catch(error => console.error(error))
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
        .then(data => setRefreshView(data))
        .catch(error => console.error(error))
    }

    const archiveAllAction = () => {
        const updatedData = callData.filter(e => !e.is_archived).map(dat => ({...dat, is_archived: true}))
        updatedData.forEach((element) => fetch(`${BASE_URL}/activities/${element.id}`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'PATCH',
            body: JSON.stringify(element)
        })
        .then(data => setRefreshView(data))
        .catch(error => console.error(error))
        );
    }

    const unArchiveAllAction = () => {
        fetch(`${BASE_URL}/reset`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': null
            },
            method: 'PATCH',                                                              
        })
        .then(data => setRefreshView(data))
        .catch(error => console.error(error));
    }

    const tabAction = (label) => {
        setActiveTab(label);
        setArchived(label === "Archive" ? true : false);
    }

    const showDetailAction = (id) => {
        setDetailId(id);
        setDetailView(true);
    }

    return (
        <div>
            {/* HEADER AND TABS */}
            <div className="flex px-4 justify-between items-center border-b">
                <Header/>
                <Tabs action={tabAction} active={activeTab}/>
            </div>

            {/* ARCHIVE/UNARCHIVE BUTTON */}
            {archived ?
                <Button label={"Restore all calls"} clickAction={unArchiveAllAction} hide={detailView} unarchive disabled={callData.filter(call => call.is_archived).length === 0}/>
                :
                <Button label={"Archive all calls"} clickAction={archiveAllAction} hide={detailView} disabled={callData.filter(call => !call.is_archived).length === 0}/>
            }

            {/* LIST VIEWS */}
            <div className='overflow-x-auto	overflow-y-auto pb-4' style={{maxHeight: "calc(666px - 200px)"}}>
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
import React, { useState } from 'react'
import Folder from "./Folder.png"
import {database} from "../../FIREBASE"
import { useAuth } from '../../contexts/AuthContext';
import {ROOT_FOLDER} from '../../hooks/useFolder'

export default function AddFolderBtn({currentFolder}) {
    const [name,setName]=useState("");
    const { CurrentUser }=useAuth();
    
    function handleSubmit(e) {
        e.preventDefault();
        // console.log(currentFolder)
        const path=[...currentFolder.path];
        if(currentFolder!==ROOT_FOLDER){
            path.push({name:currentFolder.name,id:currentFolder.id})
        }
        if(currentFolder==null) return
        database.folders.add({
            name:name,
            userId : CurrentUser.uid ,
            createdAt:database.getCurrentTimestamp(),
            parentId:currentFolder.id,
            path:path
        })  
        setName("");
    }
    return (
        <>
            <div>
                <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModalLong">
                    <img src={Folder} height="20px" width="20px" />
                </button>
                <form onSubmit={handleSubmit}>
                <div className="modal fade" id="exampleModalLong" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLongTitle">Modal title</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text" id="basic-addon1">Folder Name</span>
                                    </div>
                                    <input type="text" className="form-control" placeholder="FolderName" aria-label="Username" aria-describedby="basic-addon1" value={name} required onChange={(e)=>{setName(e.target.value)}}/>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                    <button type="submit"  className="btn btn-primary">create Folder</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
                </div>
        </>
    )

}

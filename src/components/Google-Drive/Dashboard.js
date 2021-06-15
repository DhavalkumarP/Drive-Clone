import React from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { UseFolder } from '../../hooks/useFolder'
import AddFileBtn from './AddFileBtn'
import AddFolderBtn from './AddFolderBtn'
import "./Dashboard.css"
import Folder from './Folder'
import Files from './file'
import FolderBreadCrumb from './FolderBreadCrumb'
import Navbar from './Navbar'


export default function Dashboard() {
    const { folderId } = useParams()
    const { state = {} } = useLocation()
    const { folder, childFolders, childFiles } = UseFolder(folderId, state.folder);

    return (
        <>
            <Navbar />
            <div>
                <FolderBreadCrumb currentFolder={folder} />
                <AddFolderBtn currentFolder={folder} />
                <AddFileBtn currentFolder={folder} />
                {childFolders.length > 0 && (
                    <div>
                        {childFolders.map(childFolder => (
                            <div key={childFolder.id}>
                                <Folder folder={childFolder} />
                            </div>
                        ))}

                        {childFolders.length > 0 && childFiles.length > 0 && <hr style={{ backgroundColor: 'white' }} />}

                        {childFiles.map(childFile => (

                            <div key={childFile.id}>
                                <Files file={childFile} />
                            </div>
                        ))
                        }
                    </div>
                )}
            </div>
        </>
    )
}

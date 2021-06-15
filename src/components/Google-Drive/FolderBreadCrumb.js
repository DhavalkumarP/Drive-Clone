import React from 'react'
import { Link } from 'react-router-dom'
import { ROOT_FOLDER } from '../../hooks/useFolder'

export default function FolderBreadCrumb({ currentFolder }) {
    let path = currentFolder === ROOT_FOLDER ? [] : [ROOT_FOLDER]
    if (currentFolder) {
        path = [...path, ...currentFolder.path]
    }
    return (
        <div>
            {path.map((folder, index) => (
                <Link key={folder.id}
                    to={{
                        pathname: folder.id ? `/folder/${folder.id}` : '/',
                        state: { folder: { ...folder, path: path.slice(1, index) } }
                    }}
                    style={{ display: "inline-block" }}>
                    {folder.id ? '/' : ''} {folder.name}
                </Link>
            ))}
            {currentFolder && (<div style={{ display: "inline-block" }}>
                {currentFolder.name !== 'Root' ? '/' : ''}{currentFolder.name}
            </div>)}
        </div>
    )
}

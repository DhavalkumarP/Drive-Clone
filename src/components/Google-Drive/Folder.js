import React from 'react'
import { Link } from 'react-router-dom';

export default function Folder({folder}) {
    // console.log(folder.id);
    return (
        <Link
        
         to={{
            pathname: `/folder/${folder.id}`,
            state:{folder:folder}
         }}>
            {folder.name}
        </Link>
    )
}

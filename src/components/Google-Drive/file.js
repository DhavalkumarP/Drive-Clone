import React from 'react'

export default function Files({file}) {
    // console.log(file)
    return (
        <a href={file.url} target="_blank">
            {file.name}
        </a>
    )
}

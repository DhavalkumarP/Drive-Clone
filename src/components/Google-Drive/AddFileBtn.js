import React from 'react'
import { useAuth } from '../../contexts/AuthContext';
import { database, storage } from '../../FIREBASE';
import { ROOT_FOLDER } from '../../hooks/useFolder';
import File from "./file.svg"
export default function AddFileBtn({ currentFolder }) {


    const { CurrentUser } = useAuth()
    function handleUpload(e) {
        // console.log('hdfj')
        const file = e.target.files[0];
        if (currentFolder == null || file == null) return

        const filepath = currentFolder === ROOT_FOLDER ? `${currentFolder.path.join('/')}/${file.name}` : `${currentFolder.path.join('/')}/${currentFolder.name}/${file.name}`;

        const uploadTask = storage.ref(`/files/${CurrentUser.uid}/${filepath}`).put(file)

        uploadTask.on(
            "state_changed",
            snapshot => { },
            () => { },
            () => {
                uploadTask.snapshot.ref.getDownloadURL().then(url => {
                    database.files
                        .where("name", "==", file.name)
                        .where("userId", "==", CurrentUser.uid)
                        .where("folderId", "==", currentFolder.id)
                        .get()
                        .then(existingFiles => {
                            const existingFile = existingFiles.docs[0]
                            if (existingFile) {
                                existingFile.ref.update({ url: url })
                            }
                            else {
                                database.files.add({
                                    url: url,
                                    name: file.name,
                                    createdAt: database.getCurrentTimestamp(),
                                    folderId: currentFolder.id,
                                    userId: CurrentUser.uid
                                })

                            }
                        })
                })
            }
        )
    }

    return (
        <label style={{ display: 'inline-block' }}>
            <img src={File} />
            <input type='file' onChange={handleUpload} style={{ opacity: 0 }} />
        </label>
    )
}

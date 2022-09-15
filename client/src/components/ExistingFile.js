import React from 'react'
import NewFile from './NewFile'

import { useParams } from 'react-router';

export default function ExistingFile() {
    const { id } = useParams();
    return (
        <div>
            <NewFile id={id}/>
        </div>
    )
}

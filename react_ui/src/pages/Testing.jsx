// Importing Dependencies
import React from 'react';

// Importing Components
import Editor from '../components/Editor';

// Importing Models
import demo from '../models/demo.stl'

// Importing Styles
import './Testing.css';

const Testing = (props) => {
    
    const testing = {
        file: demo,
        name: 'Demo',
        category: 'Example',
        config: {
            rotate: [0, 0, 0],
            mm: true,
            translate: [0, 0, 0],
            center: [0, 0]
        }
    }

    return (
        <div className='testing'>
            <h2>Testing janky code</h2>
            <Editor object={testing}/>
        </div>
    );

}

export default Testing;
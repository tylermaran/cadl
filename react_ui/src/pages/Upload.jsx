// Importing Dependencies
import React from 'react';

// Importing Components
import NavBar from '../components/NavBar';
import Editor from '../components/Editor';

// Importing Styles
import './Upload.css';

const Upload = (props) => {
    
    const testing = {
        file: 'https://cadltesting.s3.us-east-2.amazonaws.com/demo2.stl',
        ext: 'stl',
        name: 'Demo',
        category: 'Example',
        config: {
            rotate: [0, 0, 0],
            mm: true,
            translate: [0, 0, 0],
            center: [0, 0]
        },
        object_color: 0x5eeb34
    }
  
    
    return (
        <div className='upload'>
            <NavBar/>
            <Editor object={testing}/>
        </div>
    );

}

export default Upload;
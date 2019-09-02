// Importing Dependencies
import React from 'react';

// Importing Components
import NavBar from '../components/NavBar';
import Editor from '../components/Editor';

// Importing Styles
import './Upload.css';

const Upload = (props) => {
    
    const testing = {
        file: 'https://cadltesting.s3.us-east-2.amazonaws.com/3DBenchy.stl',
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
        <div className='upload'>
            <NavBar/>
            <h2>Upload below</h2>
            <Editor object={testing}/>
        </div>
    );

}

export default Upload;
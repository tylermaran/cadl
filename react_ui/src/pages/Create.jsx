// Importing Dependencies
import React, {useState} from 'react';

// Importing Components
import NavBar from '../components/NavBar';
import CreateProject from '../components/CreateProject';

// Importing Styling
import './Create.css';

const Create = () => {

    const [Files, setFiles] = useState('');

    const handleUpload = (e) => {
        console.log(e.target.files);

        let fileObj = e.target.files;
        let fileArray = [];

        Object.keys(fileObj).forEach(key => {
            console.log(fileObj[key]);
            fileArray.push(fileObj[key]);
        })

        setFiles(fileArray.map(createFileDiv));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(e.target.name.value);
        console.log('heeeeey');
    }

    const createFileDiv = (file) => {
        return (
            <div className="file_output">
                {file.name}
            </div>
        )
    }

    return(
        <div>
            <NavBar/>
            <div className="create_content">

                <CreateProject handleSubmit = {handleSubmit}/>

                {/* Right Div - file upload */}
                {/* <div className="upload_files">
                    <div className="create_title">
                        Upload Files
                    </div>
                    <div className="output">
                        {Files}
                    </div>

                    <input type="file" multiple name="Upload" id="" onInput={(e) => handleUpload(e)}/>
                    
                </div> */}
               
            </div>
            
        </div>
    );

}

export default Create;


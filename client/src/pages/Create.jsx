// Importing Dependencies
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

// Importing Components
import NavBar from '../components/NavBar';
import CreateProject from '../components/CreateProject/CreateProject';
import FileUpload from '../components/CreateProject/FileUpload';
import FileOutput from '../components/CreateProject/FileOutput';
import Review from '../components/CreateProject/Review';
// import EditModal from '../components/CreateProject/EditModal';
import UploadModal from '../components/CreateProject/UploadModal';
import Footer from '../components/Footer';

// Importing Styling
import './Create.css';

class Create extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 'project', //project -> files -> confirm
            categories: [],
            file_div: '',
            file_array: '',
            project: {
                name: '',
                author: '',
                desc: '',
                category: 'Laser-Cutter',
                designs: [],
            },
            show_next: false,
            show_modal: false,
            upload_count: 0,
            upload_progress: [],
            upload_complete: false,
            redirect: false,
            file_label: 'Choose a file...',
        };
    }

    componentDidMount() {
        document.title = 'Create Project';
        let url = process.env.REACT_APP_API_URL + '/categories/99';
        fetch(url)
            .then(response => {
                return response.json();
            })
            .then(data => {
                this.setState({
                    categories: data,
                });
            });
    }

    // Update form in state
    handleFormChange = (field, value) => {
        let temp = this.state.project;
        temp[field] = value;
        this.setState({ project: temp });
    };

    // Add files to state
    handleUpload = e => {
        let fileObj = e.target.files;
        console.log(fileObj);
        let upload_array = [];
        let message = 'Choose a file...';

        // File upload constructor
        function Design(name, file, ext, category) {
            this.name = name; //string
            this.file = file;
            this.ext = ext; // string (toLowerCase)
            this.category = category; // string
            this.config = {
                mm: true, // boolean
                rotate: [-90, 0, 0], // [x, y, z]
                translate: [0, 0, 0], // [x, y, z]
                center: [0, 0], // [x, y]
                object_color: '0x4287f5', // Hex code value
                background_color: '#404040',
            };
			this.note = 'a pretty cool model'; // String
			this.author = 'themanmaran'
        }

        // File loader returns an object >.< make it into an array
        Object.keys(fileObj).forEach(key => {
            upload_array.push(fileObj[key]);
        });

        for (let i = 0; i < upload_array.length; i++) {
            let ext = upload_array[i].name
                .split('.')
                .pop()
                .toLowerCase();

            let file_data = upload_array[i];

            // Create file object
            upload_array[i] = new Design(
                upload_array[i].name,
                file_data,
                ext,
                this.state.project.category
            );
        }

        if (upload_array.length > 0) {
            message = 'Upload additional';
        }

        // Add File array to state
        this.setState({
            file_div: upload_array.map(this.createFileDiv),
            file_array: upload_array,
            file_label: message,
            show_next: true,
        });
    };

    // Append uploaded files to page
    createFileDiv = file => {
        return <FileOutput file={file} key={file.name} />;
    };

    // Switch pages
    setPage = page => {
        this.setState({
            page: page,
        });
    };

    dataURItoBlob = dataURI => {
        // convert base64/URLEncoded data component to raw binary data held in a string
        let byteString;
        if (dataURI.split(',')[0].indexOf('base64') >= 0)
            byteString = atob(dataURI.split(',')[1]);
        else byteString = unescape(dataURI.split(',')[1]);

        // separate out the mime component
        let mimeString = dataURI
            .split(',')[0]
            .split(':')[1]
            .split(';')[0];

        // write the bytes of the string to a typed array
        let ia = new Uint8Array(byteString.length);
        for (let i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }

        return new Blob([ia], { type: mimeString });
    };

    blobToFile(theBlob, fileName) {
        //A Blob() is almost a File() - it's just missing the two properties below which we will add
        theBlob.lastModifiedDate = new Date();
        theBlob.name = fileName;
        return theBlob;
    }

    handleScreenshot = () => {
        console.log('Screenshot');
        let elements = document.getElementsByTagName('canvas');

        for (let i = 0; i < elements.length; i++) {
            // get image from HTML Canvas (.75 for quality adjustment)
            let image = elements[i].toDataURL('image/png', 0.75);

            // convert screenshot to blob
            let image_blob = this.dataURItoBlob(image);

            // convert that blob to a file
            let image_file = new File(
                [image_blob],
                this.state.file_array[i].name.substring(
                    0,
                    this.state.file_array[i].name.indexOf('.')
                ) + '_screenshot.png',
                { lastModified: new Date() }
            );
            // let image_file = this.blobToFile(image_blob, this.state.file_array[i].name + '_screenshot');

            // Add image blob to temp state
            let temp = this.state.file_array;
            temp[i].screenshot = image_file;

            this.setState(
                {
                    file_array: temp,
                },
                () => {
                    console.log('Screenshot added to file');
                    console.log(this.state.file_array);
                    this.handleConfirm();
                }
            );
        }
    };

    // For each file in state:
    // Upload File to AWS and return file path
    // Create Design object for each file
    // Append Design ID to Project and create project
    handleConfirm = () => {
        console.log('Upload files to AWS');
        this.setState({
            page: 'loading',
        });
        // upload files
        this.state.file_array.map(this.aws_upload);
    };

    // Upload file to AWS
    aws_upload = file => {
        const formData = new FormData();
        formData.append('file', file.file);
        formData.append('screenshot', file.screenshot);

        let options = {
            method: 'POST',
            body: formData,
        };

        fetch(process.env.REACT_APP_API_URL + '/files', options)
            .then(response => {
                return response.json();
            })
            .then(aws_data => {
                console.log('aws data');
                console.log(aws_data);

                this.updateProgress(
                    aws_data.message,
                    aws_data.file.originalname
                );

				file.file = aws_data.file.file[0].location;
				file.screenshot = aws_data.file.screenshot[0].location;
				console.log('Files sent to /design');
				console.log(file)
                this.upload_design(file);
            });
    };

    // POST to create design in DB
    upload_design = file => {
        console.log(file);

        fetch(process.env.REACT_APP_API_URL + '/designs', {
            method: 'POST',
            body: JSON.stringify(file),
            headers: {
                'Content-Type': 'application/json',
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
        })
            .then(response => {
                return response.json();
            })
            .then(json => {
                console.log(json);
                this.updateProgress(json.message, json.result.name);

                let temp = this.state;

                // Add Mongo FileID to project and increment uploaded files
                temp.project.designs.push(json.result._id);
                temp.upload_count++;

                this.setState({ temp }, () => {
                    console.log('state: ', this.state);

                    if (
                        this.state.upload_count === this.state.file_array.length
                    ) {
                        console.log('Create Project');
                        this.upload_project();
                    }
                });
            });
    };

    // Files are uploaded - now create Project and assign files
    upload_project = () => {
        let body = this.state.project;
        console.log('body:', body);

        fetch(process.env.REACT_APP_API_URL + '/projects', {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json',
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
        })
            .then(response => {
                return response.json();
            })
            .then(json => {
                console.log(json);
                this.updateProgress(json.message, json.result.name);
                this.setState(
                    {
                        upload_complete: true,
                    },
                    () => {
                        setTimeout(() => {
                            this.setState({
                                redirect: true,
                            });
                        }, 2000);
                    }
                );
            })
            .catch(err => {
                console.log('File upload error');
                console.log(err);
            });
    };

    updateProgress = (data, detail) => {
        let temp = this.state.upload_progress;

        temp.push(
            <p key={Math.random()} className="loading_message">
                {data} ({detail})
            </p>
        );

        this.setState({
            upload_progress: temp,
        });
    };

    render() {
        const switch_view = () => {
            switch (this.state.page) {
                case 'project':
                    // Project Details
                    return (
                        <CreateProject
                            setPage={this.setPage}
                            project={this.state.project}
                            categories={this.state.categories}
                            handleFormChange={this.handleFormChange}
                        />
                    );
                case 'upload':
                    // File Upload
                    return (
                        <FileUpload
                            handleUpload={this.handleUpload}
                            files={this.state.file_div}
                            setPage={this.setPage}
                            show_next={this.state.show_next}
                            file_label={this.state.file_label}
                        />
                    );

                case 'review':
                    console.log(this.state);
                    return (
                        <Review
                            setPage={this.setPage}
                            project={this.state.project}
                            files={this.state.file_array}
                            handleConfirm={this.handleConfirm}
                            handleScreenshot={this.handleScreenshot}
                        />
                    );
                case 'loading':
                    return (
                        <UploadModal
                            files={this.state.file_array}
                            upload_progress={this.state.upload_progress}
                            upload_complete={this.state.upload_complete}
                        />
                    );
                default:
                    break;
            }
        };
        let current_view = switch_view();

        return (
            <div>
                <NavBar />
                <div className="create_content">
                    {/* Switch between project name / file upload / confirm */}
                    {current_view}
                    {this.state.redirect ? (
                        <Redirect to="/projects/recent" />
                    ) : (
                        <></>
                    )}
                </div>
                <Footer />
            </div>
        );
    }
}

export default Create;

// Importing Dependencies
import React, { Component } from 'react';

// Importing Components
import NavBar from '../components/NavBar';
import ObjectLoader from '../components/ObjectLoader';

// Importing Styles
import './Testing.css';

class Testing extends Component {
    constructor(){
        super();
        this.state = ({
            source: null,
            loader: null
        })
    }

    testing = {
        file: '',
        ext: 'stl',
        name: 'Demo',
        category: 'Example',
        config: {
            rotate: [0, 0, 0],
            mm: true,
            translate: [0, 0, 0],
            center: [0, 0]
        },
        color: 0x5eeb34
    }

    control = {
        zoom: true,
        rotate: false,
        pan: false
    }

    handleInput = (e) => {
        let reader = new FileReader();
            reader.onload = (result) => {
                console.log(result);

                this.setState({
                    source: result.target.result
                }, () => {
                    this.testing.file = this.state.source;
                    this.setState({
                        loader: (<ObjectLoader object = { this.testing } control= { this.control }/>)
                    });
                });
            }
        reader.readAsDataURL(e.target.files[0]);

    }

    render() {

        return (
            <div className='testing'>
                <NavBar/>
                <h2>Testing janky code</h2>
                <input type="file" name="object" id="whatever" multiple onInput={(e) => this.handleInput(e)}/>

                <div className="testing_object">
                    {this.state.loader}
                </div>
            </div>
        );
    }
}

export default Testing;
// Importing Dependencies
import React, { Component } from 'react';

// Importing Components
import ObjectLoader from './ObjectLoader';

// Importing Styles
import './Editor.css';

class Editor extends Component {
    // Using state to force child to update
    constructor (props) {
        super();
        this.state = {
            object: props.object
        }
    }

    
    render = () => {
        // Disable pan and rotate for editor
        const control = {
            zoom: true,
            rotate: false,
            pan: false
        }

        let temp;
        
        // Switch between MM and Inch
        const handleUnits = (boolean) => {
            temp = this.state.object;
            temp.config.mm = boolean;
            this.setState({ object: temp });
        }

        // Pan object: takes in axis and direction (+1 or -1)
        const handlePan = (axis, direction) => {
            temp = this.state.object;

            switch (axis) {
                case 'x':
                    temp.config.translate[0] += direction;
                    break;
                case 'y':
                    temp.config.translate[1] += direction;
                    break;
                case 'z':
                    temp.config.translate[2] += direction;
                    break;
                default:
                    break;
            }

            this.setState({object:temp});
        }
    
        // Rotate object: takes in axis and direction (+1 or -1)
        const handleRotate = (axis, direction) => {
            temp = this.state.object;
            
            switch (axis) {
                case 'x':
                    temp.config.rotate[0] += (10 * direction);
                    break;
                case 'y':
                    temp.config.rotate[1] += (10 * direction);
                    break;
                case 'z':
                    temp.config.rotate[2] += (10 * direction);
                    break;
                default:
                    break;
            }

            this.setState({object:temp});
        }

        return (
            <div className='Editor'>

                {/* Object Loader */}
                <div className="editor_container">
                    <ObjectLoader object = { this.state.object } control= { control }/>
                </div>
            
                {/* Control Panel */}
                <div className="control_board">
                    <hr/>
                    <div className="units">
                        <div className="unit_text">Set Scale</div>
                        <div className="unit_button">
                            <button className="edit_button" onClick={() => handleUnits(true)}>MM</button>
                            <button className="edit_button" onClick={() => handleUnits(false)}>Inch</button>
                        </div>
                    </div>
                    <hr/>
                    <div className="rotate">
                        Rotate Object
                        <div className="rotate_x">
                            <button type="button" className="edit_button" onClick={() => handleRotate('x', -1)}> - X </button>
                            <button type="button" className="edit_button" onClick={() => handleRotate('x', 1)}> + X </button>
                        </div>
                        <div className="rotate_y">
                            <button type="button" className="edit_button" onClick={() => handleRotate('y', -1)}> - Y </button>
                            <button type="button" className="edit_button" onClick={() => handleRotate('y', 1)}> + Y </button>
                        </div>
                        <div className="rotate_z">
                            <button type="button" className="edit_button" onClick={() => handleRotate('z', -1)}> - Z </button>
                            <button type="button" className="edit_button" onClick={() => handleRotate('z', 1)}> + Z </button>
                        </div>
                    </div>
                    <div className="pan">
                        Pan Object
                        <div className="pan_x">
                            <button type="button" className="edit_button" onClick={() => handlePan('x', -1)}> - X </button>
                            <button type="button" className="edit_button" onClick={() => handlePan('x', 1)}> + X </button>
                        </div>
                        <div className="pan_y">
                            <button type="button" className="edit_button" onClick={() => handlePan('y', -1)}> - Y </button>
                            <button type="button" className="edit_button" onClick={() => handlePan('y', 1)}> + Y </button>
                        </div>
                        <div className="pan_z">
                            <button type="button" className="edit_button" onClick={() => handlePan('z', -1)}> - Z </button>
                            <button type="button" className="edit_button" onClick={() => handlePan('z', 1)}> + Z </button>
                        </div>
                    </div>
                </div>
        </div>        
        )
    }
}

export default Editor;
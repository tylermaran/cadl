// Importing Dependencies
import React, { Component } from 'react';
import { Tabs, Tab } from 'react-bootstrap';

// Importing Components
import ObjectLoader from './ObjectLoader';

// Importing Styles
import './Editor.css';

class Editor extends Component {
    // Using state to force child to update
    constructor (props) {
        super();
        this.state = {
            object: props.object,
            tab_key: 'scale'
        }
    }

    interval_id = 0;
    
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
        const handleRotate = (axis, direction, hold) => {
            temp = this.state.object;
            
            clearInterval(this.interval_id);

            this.interval_id = setInterval(()=> {
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
                if (hold) clearInterval(this.interval_id);
            }, 200)
        }

        const handleRelease = () => {
            console.log('clear interval!');
            clearInterval(this.interval_id);
        }

        const button = (axis, direction, text) => {
            return (
                <button 
                    type="button" 
                    className="edit_button" 
                    onClick={() => handleRotate(axis, direction, true)}
                    onMouseDown={() => handleRotate(axis, direction)} 
                    onMouseUp={() => handleRelease()} 
                    onTouchStart={() => handleRotate(axis, direction)} 
                    onTouchEnd={() => handleRelease()}  
                >
                    {text}
                </button>
            )
        }

        const handleColor = (color) => {
            temp = this.state.object;
            temp.object_color = color;

            this.setState({
                object: temp
            });
        }

        return (
            <div className='Editor'>

                {/* Object Loader */}
                <div className="editor_container">
                    <ObjectLoader object = { this.state.object } control= { control }/>
                </div>
            
                {/* Control Panel */}
                <div className="control_board">
                    <Tabs id="controlled-tab-example" activeKey={this.state.tab_key} onSelect={k => this.setState({tab_key:k})}>
                        
                        {/* Set Scale */}
                        <Tab eventKey='scale' title='Scale'>
                            <div className="units">
                                <div className="unit_text">Set Scale</div>
                                <div className="unit_button">
                                    <button className="edit_button"  onClick={() => handleUnits(true)}>MM</button>
                                    <button className="edit_button" onClick={() => handleUnits(false)}>Inch</button>
                                </div>
                            </div>
                        </Tab>

                        {/* Rotate and Pan */}
                        <Tab eventKey='rotate' title='Rotate / Pan'>
                            {/* Rotate */}
                            <div className="rotate">
                                Rotate Object
                                <div className="rotate_x">
                                    {button('x', -1, '-X')}
                                    {button('x', 1, 'X')}
                                </div>
                                <div className="rotate_y">
                                    {button('y', -1, '-Y')}
                                    {button('y', 1, 'Y')}
                                </div>
                                <div className="rotate_z">
                                    {button('x', -1, '-Z')}
                                    {button('x', 1, 'Z')}
                                </div>
                            </div>

                            {/* Pan */}
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
                        </Tab>
                        <Tab eventKey='texture' title='Texture'>
                            COLORSSS
                            <div className="color">
                                <button type="button" className="edit_button" onClick={() => handleColor(0xd99802)}> Orange </button>
                                <button type="button" className="edit_button" onClick={() => handleColor(0x2cbf08)}> Green </button>
                                <button type="button" className="edit_button" onClick={() => handleColor(0x1529ad)}> Blue </button>

                            </div>
                        </Tab>




                    </Tabs>
                    
                 </div>   
            </div>
        )
    }
}

export default Editor;
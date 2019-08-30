// Importing Dependencies
import React, {useState} from 'react';

// Importing Components
import SetObject from '../components/SetObject';

// Importing Models
import demo from '../models/demo2.stl'

// Importing Styles
import './Testing.css';


const Testing = (props) => {
    const [MM, setMM] = useState(true);

    const handleUnits = (boolean) => {
        setMM(boolean)
    }

    return (
        <div className='testing'>
            <h2>Testing janky code</h2>
            <button onClick={() => handleUnits(true)}>MM</button>
            <button onClick={() => handleUnits(false)}>Inch</button>
            
            
            <SetObject color='#eb344c'  title='nerf' category='3D Printing' mm={MM} file={demo} spin={false}/>
        </div>
    );

}

export default Testing;
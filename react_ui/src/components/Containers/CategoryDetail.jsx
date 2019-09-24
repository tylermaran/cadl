// Importing Dependencies
import React from 'react'

// Importing Styling
import './CategoryDetail.css';

const CategoryDetail = (props) => {
    let style = {
        backgroundImage: 'url(' + props.category.image + ')'
    }

    return (
        <div className='category_overview'>
            <div className="category_image" style={style}></div>
            <div className="category_detail">
                {props.category.description}
            </div>
        </div>
    ) 
}

export default CategoryDetail;
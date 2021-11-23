import React from 'react'

const Suggestions = (props) => {

    const repoClick = (item) => {
        props.repoClick(item);
    }

    return (
        <div className="suggestion-box">
            <ul>
                {props.data.length > 0 && props.data.map((item,index) => (
                    <li key={index} onClick={() => repoClick(item)}>{item.full_name}</li>
                ))}
            </ul>
        </div>
    )
}

export default Suggestions

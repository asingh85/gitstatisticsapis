import React from 'react';
import FeatherIcon from 'feather-icons-react';

const SearchBar = (props) => {

    const handleInputChange = (e) => {
        props.inputChange(e);
    }

    const handleSubmit = () => {
        props.handleSubmit();
    }

    return (
        <div>
            <form className="form-inline mt-4">
                <input
                    className="form-control form-control-sm ml-3 p-2"
                    onChange={(e) => handleInputChange(e)}
                    value={props.value}
                    type="text"
                    placeholder="Search"
                    aria-label="Search"
                />
                <FeatherIcon icon="search" onClick={() => handleSubmit()} />
            </form>
        </div>
    )
}

export default SearchBar

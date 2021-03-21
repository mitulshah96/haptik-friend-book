import React, { memo, useRef } from 'react';

function AddFriend(props) {
    const inputRef = useRef(props.defaultValue);

    function onSubmit(event) {
        if (event.key === 'Enter' && inputRef.current.value.trim().length > 0) {
            props.onSubmit(inputRef.current.value.trim());
            inputRef.current.value = '';
        }
    }

    return (
        <div className="input-container">
            <input
                type="text"
                className="input-text"
                placeholder={props.placeholder}
                defaultValue={props.defaultValue}
                ref={inputRef}
                onKeyDown={onSubmit}
            />
        </div>
    );
}

export default memo(AddFriend);

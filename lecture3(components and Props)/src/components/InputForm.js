import React from 'react'

export default function Inputfrom(props) {
    return (
        <div>
            <div className="container">
                <div className="mb-3">
                        <h1>{props.heading}</h1>
                        <div className="mb-3"></div>
                        <textarea name="form-control" id="my-box" r rows="4" cols="80"></textarea>

                </div>
                <button type="submit" className="btn btn-primary">Convert to uppercase</button>
            </div>
        </div> 
            );
}

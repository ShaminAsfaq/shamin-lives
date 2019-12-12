import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className="ui cards" style={{ justifyContent: 'center', padding: '5%' }}>
            <div className="card">
                <div className="content">
                    <div className="header">
                        Are you lost?
                    </div>
                    <div className="meta">
                        404
                    </div>
                    <div className="description">
                        You seem to be somewhere we don't want you to be.
                    </div>
                </div>
                <div className="extra content">
                    <div className="ui two buttons">
                        <div className="ui basic green button">
                            <Link to="/">Yes</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export {
    NotFound as default
}

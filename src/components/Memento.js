import React from 'react';

const Memento = () => {
    return (
            <div className="ui card" style={{ cursor: 'pointer' }}>
                <div className="content" style={{ backgroundColor: '#b7d7e8' }}>
                    <div className="header" style={{ color: 'black' }}>Cute Dog</div>
                    <div className="description" style={{ color: 'black' }}>
                    <p>Cute dogs come in a variety of shapes and sizes. Some cute dogs are cute for their adorable faces, others for their tiny stature, and even others for their massive size.</p>
    <p>Many people also have their own barometers for what makes a cute dog.</p>
                    </div>
                </div>
                <div className="extra content" style={{ backgroundColor: '#87bdd8', color: 'white' }}>
                    <span className="left floated like">
                    <i className="like icon"></i>
                    Like
                    </span>
                    <span className="right floated star">
                    <i className="star icon"></i>
                    Favorite
                    </span>
                </div>
            </div>
    );
}

export {
    Memento as default
}

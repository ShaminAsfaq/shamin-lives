import React from 'react';

const Chronicle = () => {

    const onSubmit = (event) => {
        event.preventDefault();
    }

    return (
        <form  autoComplete="off" onSubmit={onSubmit} className="ui form" style={{ padding: '5% 5% 5% 5%' }}>
            <div className="field">
                <label>Title</label>
                <input type="text" name="title" placeholder="Title of your chronicle"/>
            </div>
            <div className="field">
                <label>Site</label>
                <input type="text" name="site" placeholder="Site of the chronicle" onChange={(e) => {
                    if(e.target.value.endsWith(',')) {
                        console.log(e.target.value)
                    }
                }}/>
            </div>
            <div className="field">
                <div className="field">
                    <label>Story</label>
                    <textarea 
                        rows='20' 
                        style={{ resize: 'none' }}
                        placeholder="Your epic goes here!"
                    >
                    </textarea>
                </div>
            </div>
            <button className="ui blue button" type="submit">Submit</button>

            <input hidden type="file" multiple onChange={(e) => { console.log(e.target.value) }} className="inputfile" id="upload" />
            <label htmlFor="upload" className="ui green button">
                <i className="ui upload icon"></i> 
                Upload image
            </label>
        </form>
    );
}

export {
    Chronicle as default
}

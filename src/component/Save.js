import React from 'react';
const algoliasearch = require("algoliasearch");

const client = algoliasearch("5DGIE39UOX", "2014bcb9d00a8d90fdde4520df78b5b9");
const index = client.initIndex("event_info");
const Save = ({event}) => {
    index.clearObjects();
    index.saveObjects(event, { autoGenerateObjectIDIfNotExist: true });
    return (
        <div>
            {console.log("hello world"+event)}
        </div>
    );
}

export default Save;

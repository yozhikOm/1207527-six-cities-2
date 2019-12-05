import React from 'react';

const Favorites = (props) => {
    const {isAuthorizationRequired, history} = props;
    if(isAuthorizationRequired){
        history.push(`/login`);
    }
    return <div>favorites</div>;
};

export {Favorites};
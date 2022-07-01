import React from 'react';
import {NewLink} from './StyledLink.style';

type LinkTypes = {
    children: string;
    to: string;
}

const StyledLink = ({children, to}: LinkTypes) => {
    return (
        <NewLink to={to}>
            {children}
        </NewLink>
    );
};


export default StyledLink;
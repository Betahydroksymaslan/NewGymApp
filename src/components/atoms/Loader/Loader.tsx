import React from 'react';
import {Wrapper, Ball} from './Loader.style';

const Loader = () => {
    return (
        <Wrapper>
            <Ball></Ball>
            <Ball></Ball>
            <Ball></Ball>
            <span>Loading...</span>
        </Wrapper>
    );
};

export default Loader;
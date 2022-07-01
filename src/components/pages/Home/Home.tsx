import React from 'react';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { authActions } from 'slices/authSlice';
import { getUser } from 'slices/authSlice';

const Home = () => {
    const dispatch = useAppDispatch()
    const user = useAppSelector(getUser);
    return (
        <div>
            <button onClick={() => dispatch(authActions.logout())}>wyloguj</button>
            <span>{user?.email}</span>
        </div>
    );
};


export default Home;
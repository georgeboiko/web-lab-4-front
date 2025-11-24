import { useState } from 'react';
import {changePasswordApi} from '../api/changePasswordApi';
import { useDispatch } from 'react-redux';
import { showError } from '../../error/errorSlice';

export const UsePasswordChange = () => {

    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

    const changePassword = async (data) => {
        setLoading(true);
        try {
            const res = await changePasswordApi.changePassword(data);
        } catch (err) {
            dispatch(showError({
                description: err.message || 'Change password failed',
                fullText: null
            }));
        } finally {
            setLoading(false);
        }
    };

    return {
        changePassword, loading
    };
};
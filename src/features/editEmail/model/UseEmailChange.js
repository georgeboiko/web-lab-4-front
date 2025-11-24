import { useState } from 'react';
import {changeEmailApi} from '../api/changeEmailApi';
import { useDispatch } from 'react-redux';
import { showError } from '../../error/errorSlice';
import { useSelector } from 'react-redux';
import { updateUser } from '../../auth/model/authSlice';

export const UseEmailChange = () => {

    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth)
    const [loading, setLoading] = useState(false);

    const changeEmail = async (data) => {
        setLoading(true);
        try {
            const res = await changeEmailApi.changeEmail(data);
            dispatch(updateUser(res.user));
        } catch (err) {
            dispatch(showError({
                description: err.message || 'Change email failed',
                fullText: null
            }));
        } finally {
            setLoading(false);
        }
    };

    return {
        changeEmail, loading, auth
    };
};
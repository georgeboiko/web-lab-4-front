import { useDispatch } from 'react-redux';
import { UsePasswordChange } from "../model/UsePasswordChange";
import { showError, clearError } from '../../../features/error/errorSlice';
import CustomButton from "../../../widgets/CustomButton/ui/CustomButton";
import CustomInput from "../../../widgets/CustomInput/CustomInput";
import styles from './EditPasswordForm.module.css'
import { useState } from 'react';

const EditPasswordForm = () => {
    const dispatch = useDispatch();
    const {changePassword, loading} = UsePasswordChange();
    const [password1, setPassword1] = useState("");
    const [password2, setPassword2] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        dispatch(clearError());
        if (!password1 || !password2) {
            dispatch(showError({
                description: 'Please fill all fields',
                fullText: null
            }));
            
            return;
        }

        if (password1 !== password2) {
            dispatch(showError({
                description: 'Passwords are different',
                fullText: null
            }));
            
            return;
        }

        changePassword(password1);
    };

    return (
        <div className={styles.container}>
            <form className={styles.form} onSubmit={handleSubmit}>
                <CustomInput
                    type="password"
                    placeholder="Password"
                    value={password1}
                    onChange={(e) => setPassword1(e.target.value)}
                />
                <CustomInput
                    type="password"
                    placeholder="Repeat password"
                    value={password2}
                    onChange={(e) => setPassword2(e.target.value)}
                />
                <CustomButton
                    type="submit"
                    text="Change Password"
                    disabled={loading}
                />
            </form>
        </div>
    );
};

export default EditPasswordForm;
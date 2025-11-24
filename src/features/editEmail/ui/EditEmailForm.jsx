import { useDispatch, useSelector } from 'react-redux';
import { UseEmailChange } from "../model/UseEmailChange";
import { showError, clearError } from '../../../features/error/errorSlice';
import CustomButton from "../../../widgets/CustomButton/ui/CustomButton";
import CustomInput from "../../../widgets/CustomInput/CustomInput";
import styles from './EditEmailForm.module.css'
import { useState } from 'react';

const EditEmailForm = () => {
    const dispatch = useDispatch();
    const {changeEmail, loading, auth} = UseEmailChange();
    const [email, setEmail] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        dispatch(clearError());
        if (!email) {
            dispatch(showError({
                description: 'Please fill all fields',
                fullText: null
            }));
            
            return;
        }

        changeEmail(email);
    };

    return (
        <div className={styles.main}>
            <div className={styles.emailBox}>
                {auth ? `Email: ${auth.user}` : "Loading..."}
            </div>
            <div className={styles.container}>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <CustomInput
                        type="text"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <CustomButton
                        type="submit"
                        text="Change Email"
                        disabled={loading}
                    />
                </form>
            </div>
        </div>
    );
};

export default EditEmailForm;
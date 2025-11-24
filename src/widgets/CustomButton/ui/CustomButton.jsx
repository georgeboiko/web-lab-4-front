import styles from './CustomButton.module.css';

const CustomButton = ({
    text,
    type="submit",
    onclick,
    disabled
}) => {
    return (
        <button 
            type={type}
            className={styles.customButton}
            onClick={onclick}
            disabled={disabled}
        >
            {text}
        </button>
    );
};

export default CustomButton;
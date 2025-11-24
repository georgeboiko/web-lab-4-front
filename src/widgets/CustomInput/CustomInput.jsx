import styles from './CustomInput.module.css';

const CustomInput = ({
    type,
    placeholder,
    value,
    onChange
}) => {
    return (
         <input
            type={type}
            placeholder={placeholder}
            value={value}
            className={styles.input}
            onChange={onChange}
        />
    );
};

export default CustomInput;
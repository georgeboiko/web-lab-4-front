import { useEffect } from 'react';
import styles from './ErrorNotification.module.css';

export const ErrorNotification = ({ error, onClose, autoClose = 5000 }) => {
    useEffect(() => {
        if (error && autoClose && onClose) {
            const timer = setTimeout(onClose, autoClose);
            return () => clearTimeout(timer);
        }
    }, [error, autoClose, onClose]);

    if (!error) return null;

    return (
        <div className={styles.errorWidget} role="alert">
            <div className={styles.errorContent}>
                <span className={styles.errorIcon}>⚠️</span>
                <span className={styles.errorMessage}>{error}</span>
            </div>
            {onClose && (
                <button 
                    className={styles.closeButton}
                    onClick={onClose}
                    aria-label="Close error"
                >
                    ×
                </button>
            )}
        </div>
    );
};

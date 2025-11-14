import { useEffect, useState } from 'react';
import styles from './ErrorNotification.module.css';

export const ErrorNotification = ({ error, onClose, autoClose = 5000 }) => {

    const [fullError, setFullError] = useState(false);

    useEffect(() => {
        if (error && autoClose && onClose && !fullError) {
            const timer = setTimeout(onClose, autoClose);
            return () => clearTimeout(timer);
        }
    }, [error, autoClose, onClose, fullError]);

    if (!error) return null;

    return (
        <div>
            <div className={styles.errorWidget} role="alert">
                <div className={styles.errorContent}>
                    <span className={styles.errorIcon}>⚠️</span>
                    <span className={styles.errorMessage}>{error.description}</span>
                    {error.fullText && (
                        <button className={styles.moreButton} onClick={() => setFullError(true)}>...</button>
                    )}
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
            {fullError && (
                <div className={styles.modalBackdrop} onClick={() => setFullError(false)}>
                    <div className={styles.modalContent}>
                        <div>
                            {error.fullText}
                        </div>
                        <button className={styles.closeBtn} onClick={() => setFullError(false)}>
                            ✕
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

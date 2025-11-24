import styles from "./InformationBlock.module.css";
import { useState } from "react";

export const InformationBlock = () => {

    const [isVariantOpen, setIsVariantOpen] = useState(false);

    return (
        <div>
            <div className={styles.informationBlock}>
                <div className={styles.item}>
                    Бойко Георгий Александрович
                </div>
                <div className={styles.item}>
                    P3216
                </div>
                <div className={styles.item} onClick={() => setIsVariantOpen(true)}>
                    Вариант 755476
                </div>
            </div>
            {isVariantOpen && (
                <div className={styles.modalBackdrop} onClick={() => setIsVariantOpen(false)}>
                    <div className={styles.modalContent}>
                        <img
                            src="/images/variant.png"
                            alt="Вариант"
                            className={styles.modalImage}
                        />
                        <button className={styles.closeBtn} onClick={() => setIsVariantOpen(false)}>
                            ✕
                        </button>
                    </div>
                </div>
            )}
        </div>
    );

};
import { usePoint } from "../../features/point/model/usePoint";
import { PointChart } from "../../features/point/ui/pointChart/PointChart";
import { PointForm } from "../../features/point/ui/pointForm/PointForm";
import { PointTable } from "../../features/point/ui/pointTable/PointTable";
import { Navbar } from "../../widgets/navbar/ui/Navbar";
import { useState } from "react";
import styles from "./PointsPage.module.css";

const PointsPage = () => {

    const pointHook = usePoint();
    const [r, setR] = useState(null);
    
    return (
        <div className={styles.main}>
            <Navbar/>
            <div className={styles.container}>
                <PointForm pointHook={pointHook} rGet={r} rSet={setR} />
                <PointChart pointHook={pointHook} rGet={r} />
            </div>
            <PointTable pointHook={pointHook} />
        </div>
    );
};

export default PointsPage;

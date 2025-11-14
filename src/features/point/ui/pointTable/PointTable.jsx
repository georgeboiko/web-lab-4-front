import { useEffect } from "react";
import { usePoint } from "../../model/usePoint";
import styles from "./PointTable.module.css";

export const PointTable = () => {
    
    const {points, loading, getPoints, addPoints, deletePoints} = usePoint();
    
    useEffect(() => {
        getPoints();
    }, []);

    if (!points) {
        return <div>No data</div>;
    }

    return (
        <div className={styles.tableContainer}>
            <table className={styles.pointTable}>
                <thead>
                    <tr>
                        <th> x </th>
                        <th> y </th>
                        <th> r </th>
                        <th> result </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        points.validPoints.map(result => (
                            <tr key={result.id}>
                                <td> {result.x} </td>
                                <td> {result.y} </td>
                                <td> {result.r} </td>
                                <td className={styles.resultCell}> {result.success ? '✅' : '❌'} </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
        
    );
};
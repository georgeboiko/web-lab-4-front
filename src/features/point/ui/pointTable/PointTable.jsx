import { useEffect, useState } from "react";
import { usePoint } from "../../model/usePoint";
import styles from "./PointTable.module.css";

export const PointTable = ({ pointHook }) => {
    
    const {points, pointsWithR, loading, getPoints, getPointsWithR, addPoints, deletePoints} = pointHook;

    const [selectedIds, setSelectedIds] = useState([]);

    useEffect(() => {
        getPoints();
    }, []);

    const handleToggle = (id) => {
        setSelectedIds(prev =>
            prev.includes(id)
                ? prev.filter(item => item !== id) 
                : [...prev, id]
        );
    };


    const handleDelete = async () => {
        if (selectedIds.length === 0) return;

        await deletePoints(
            {
                points: selectedIds
            }
        );
        setSelectedIds([]);
    };

    const selectAll = () => {
        if (selectedIds.length === points.validPoints.length) setSelectedIds([]) 
        else setSelectedIds(points.validPoints.map(result => result.id));
    };


    if (!points || !points.validPoints || points.validPoints.length === 0) {
        return <div className={styles.tableContainer}>
                <table className={styles.pointTable}>
                    <thead>
                        <tr>
                            <th> x </th>
                            <th> y </th>
                            <th> r </th>
                            <th> result </th>
                            <th className={styles.twoBtnTh}>
                                <button 
                                    className={styles.deleteBtn}
                                    onClick={handleDelete}
                                    disabled={selectedIds.length === 0}
                                > Delete </button>
                                <button 
                                    className={styles.allBtn}
                                    onClick={selectAll}
                                > All </button>
                            </th>
                        </tr>
                    </thead>
                </table>
            </div>;
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
                        <th className={styles.twoBtnTh}>
                            <button 
                                className={styles.deleteBtn}
                                onClick={handleDelete}
                                disabled={selectedIds.length === 0}
                            > Delete </button>
                            <button 
                                className={styles.allBtn}
                                onClick={selectAll}
                            > All </button>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        points.validPoints.slice().reverse().map(result => (
                            <tr key={result.id}>
                                <td> {result.x} </td>
                                <td> {result.y} </td>
                                <td> {result.r} </td>
                                <td className={styles.resultCell}> {result.success ? '✅' : '❌'} </td>
                                <td>
                                    <input
                                        className={styles.selectBox}
                                        type="checkbox"
                                        checked={selectedIds.includes(result.id)}
                                        onChange={() => handleToggle(result.id)}
                                    />
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
        
    );
};
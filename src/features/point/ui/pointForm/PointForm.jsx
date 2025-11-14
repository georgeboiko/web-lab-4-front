import { usePoint } from "../../model/usePoint";
import styles from "./PointForm.module.css";

export const PointForm = () => {

    const {points, loading, getPoints, addPoints, deletePoints} = usePoint();

    return (
        <div className="pointFormContainer">
            
        </div>
    );

};
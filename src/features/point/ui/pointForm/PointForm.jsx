import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import styles from "./PointForm.module.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { showError } from "../../../error/errorSlice";

export const PointForm = ({pointHook, rGet, rSet}) => {

    const {points, pointsWithR, loading, getPoints, getPointsWithR, addPoints, deletePoints} = pointHook;
    const dispatch = useDispatch();

    const [x, setX] = useState(null);
    const [y, setY] = useState(null);

    const options = [
        { id: 1, label: "-5"},
        { id: 2, label: "-4"},
        { id: 3, label: "-3"},
        { id: 4, label: "-2"},
        { id: 5, label: "-1"},
        { id: 6, label: "0"},
        { id: 7, label: "1"},
        { id: 8, label: "2"},
        { id: 9, label: "3"}
    ];

    const validate = (x, y, r) => {
        let error = "";
        if (x === null || x === "" || x < -5 || x > 3) error += "X must be in [-5; 3] \n";
        if (y === null || y === "" || y < -3 || y > 5) error += "Y must be in [-3; 5] \n";
        if (r === null || r === "" || r < -5 || r > 3) error += "R must be in [-5; 3] \n";
        return error;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const msg = validate(x,y,rGet);
        if (msg.length !== 0) {
            dispatch(showError({
                description: msg,
                fullText: null
            })); 
            return;
        }
        addPoints({
            points: [
                {
                    x: x,
                    y: y,
                    r: rGet
                }
            ]
        })
    };

    return (
        <form className={styles.pointFormContainer} onSubmit={handleSubmit}>
            <Autocomplete
                options={options}
                getOptionLabel={(option) => option.label}
                className={styles.inputXR}
                renderInput={(params) => (
                    <TextField {...params} label="Choose X" />
                )}
                onChange={(e, newValue) => setX(newValue ? newValue.label : null)}
            />
            <TextField
                label="Choose Y"
                type="number"
                className="inputY"
                style={{ width: '100%' }}
                onChange={(e) => setY(e.target.value)}
            />
            <Autocomplete
                options={options}
                getOptionLabel={(option) => option.label}
                className={styles.inputXR}
                renderInput={(params) => (
                    <TextField {...params} label="Choose R" />
                )}
                onChange={(e, newValue) => rSet(newValue ? newValue.label : null)}
            />
            <button type="submit" className={styles.submitBtn}> Submit </button>
        </form>
    );

};
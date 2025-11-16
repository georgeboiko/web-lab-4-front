import { useState } from "react";
import { pointApi } from "../api/pointApi";
import { showError } from "../../error/errorSlice";
import { useDispatch } from "react-redux";

const formatInvalidPoints = (data) => {
    return {
        description: "Invalid input",
        fullText: JSON.stringify(data)
    };
};

export const usePoint = () => {
    const [points, setPoints] = useState(null);
    const [pointsWithR, setPointsWithR] = useState(null);
    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();

    const getPoints = async () => {
        setLoading(true);
        try {
            const res = await pointApi.getPoints();
            setPoints(res);
        } catch (err) {
            dispatch(showError({
                description: err.message || 'Fetch points failed',
                fullText: null
            }));
        } finally {
            setLoading(false);
        }
    }

    const getPointsWithR = async (data) => {
        setLoading(true);
        try {
            const res = await pointApi.getPointsWithR(data);
            setPointsWithR(res);
        } catch (err) {
            dispatch(showError({
                description: err.message || 'Fetch points with R failed',
                fullText: null
            }));
        } finally {
            setLoading(false);
        }
    }

    const addPoints = async (data) => {
        setLoading(true);
        try {
            const res = await pointApi.addPoints(data);
            if (res.invalidPoints.length !== 0) dispatch(showError(formatInvalidPoints(res.invalidPoints)));
            setPoints({
                validPoints: [
                    ...points.validPoints,
                    ...(res.validPoints ?? [])
                ]
            });
        } catch (err) {
            dispatch(showError({
                description: err.message || 'Add points failed',
                fullText: null
            }));
        } finally {
            setLoading(false);
        }
    }

    const deletePoints = async (data) => {
        setLoading(true);
        try {
            const res = await pointApi.deletePoints(data);
            setPoints({
                validPoints: points.validPoints.filter(
                    p => !res.points.includes(p.id)
                )
            });
        } catch (err) {
            dispatch(showError({
                description: err.message || 'Delete points failed',
                fullText: null
            }));
        } finally {
            setLoading(false);
        }
    }

    return {points, pointsWithR, loading, getPoints, getPointsWithR, addPoints, deletePoints};
}
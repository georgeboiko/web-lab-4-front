import { useCallback, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { clearError, showError } from "../../features/error/errorSlice";


export const useError = () => {
    const error = useSelector(state => state.error);
    const dispatch = useDispatch();

    const handleShowError = useCallback(
        msg => dispatch(showError(msg)), 
        [dispatch]
    );

    const handleClearError = useCallback(
        () => dispatch(clearError()), 
        [dispatch]
    );

    return {
        error, 
        showError: handleShowError,
        clearError: handleClearError,
        hasError: !!error
    };
};
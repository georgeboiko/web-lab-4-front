import { useError } from "../../shared/hooks/useError";
import { ErrorNotification } from "../../shared/components/ErrorNotification/ErrorNotification";

export const ErrorProvider = ({ children }) => {
    const { error, clearError } = useError();

    return (
        <>
            {children}
            <ErrorNotification 
                error={error}
                onClose={clearError}
                autoClose={5000}
            />
        </>
    );
};
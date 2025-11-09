import { useError } from "../../shared/model/ErrorNotification/useError";
import { ErrorNotification } from "../../shared/ui/ErrorNotification/ErrorNotification";

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
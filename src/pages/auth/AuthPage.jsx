import { AuthForm } from "../../features/auth/ui/AuthForm";
import { InformationBlock } from "../../widgets/informationBlock/ui/InformationBlock";

const AuthPage = () => {
    return (
        <div>
            <InformationBlock/>
            <AuthForm />
        </div>
    );
};

export default AuthPage;

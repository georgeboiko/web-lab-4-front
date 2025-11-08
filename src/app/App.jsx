import { AppProvider } from './providers/AppProvider';
import { AuthForm } from '../features/auth/ui/AuthForm';

const App = () => (
  <AppProvider>
    {/*  TODO: delete from App.jsx this shit */}
    <AuthForm/> 
  </AppProvider>
);

export default App;
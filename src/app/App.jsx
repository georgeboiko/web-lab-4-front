import { AppProvider } from './providers/AppProvider';
import { AppRouter } from './AppRouter';

const App = () => (
  
  <AppProvider>
    <AppRouter />
  </AppProvider>
);

export default App;
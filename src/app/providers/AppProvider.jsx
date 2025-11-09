import { BrowserRouter } from 'react-router-dom';
import { ErrorProvider } from './ErrorProvider';
import { Provider } from 'react-redux';
import { store } from '../store';
import { SessionProvider } from './SessionProvider';

export const AppProvider = ({ children }) => {
  return (
    <Provider store={store}>
      <SessionProvider>
        <ErrorProvider>
          <BrowserRouter>
            {children}
          </BrowserRouter>
        </ErrorProvider>
      </SessionProvider>
    </Provider>
  );
};

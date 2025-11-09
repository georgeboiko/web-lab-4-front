import { BrowserRouter } from 'react-router-dom';
import { ErrorProvider } from './ErrorProvider';
import { Provider } from 'react-redux';
import { store } from '../store';

export const AppProvider = ({ children }) => {
  return (
    <Provider store={store}>
      <ErrorProvider>
        <BrowserRouter>
          {children}
        </BrowserRouter>
      </ErrorProvider>
    </Provider>
  );
};

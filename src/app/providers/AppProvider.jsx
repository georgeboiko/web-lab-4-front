import { BrowserRouter } from 'react-router-dom';

export const AppProvider = ({ children }) => {
  return (
    <BrowserRouter>
        {children}
    </BrowserRouter>
  );
};

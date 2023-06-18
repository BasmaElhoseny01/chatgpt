import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// import LoginPage from './pages/LoginPage';
import LogIn from './components/LogIn';
import SignUp from './components/SignUp';
import Chat from './components/Chat/Chat';

import './App.css';
import { CssBaseline, ThemeProvider } from '@mui/material';
import theme from './theme'
import ChatIdContextProvider from './contexts/ChatIdContext';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <h1>bosy1</h1>
      {/* <CssBaseline />
      <ChatIdContextProvider>
        <Router className="App">
          <Routes>
            <Route path={process.env.PUBLIC_URL + '/login'} element={<LogIn />} />
            <Route path={process.env.PUBLIC_URL + '/signup'} element={<SignUp />} />
            <Route path={process.env.PUBLIC_URL + '/'} element={<Chat />} />
          </Routes>
        </Router>
      </ChatIdContextProvider> */}
    </ThemeProvider>
  );
}

export default App;

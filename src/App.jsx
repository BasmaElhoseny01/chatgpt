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
      <CssBaseline />
      <ChatIdContextProvider>
        <Router className="App">
          <Routes>
            <Route path="/login" element={<LogIn />} />
            {/* <Route path="/signup" element={<SignUp />} />
            <Route path="/" element={<Chat />} /> */}
          </Routes>
        </Router>
      </ChatIdContextProvider>
    </ThemeProvider>
  );
}

export default App;

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// import LoginPage from './pages/LoginPage';
import LogIn from './components/LogIn/LogIn';


import './App.css';
import { CssBaseline, ThemeProvider } from '@mui/material';
import theme from './theme'
function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router className="App">
        <Routes>
          <Route path="/login" element={<LogIn />} />
          <Route path="/" element={<h1>basma</h1>} />

        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Pomodoro from './pages/Pomodoro';
import Todo from './pages/Todo';
import Habit from './pages/Habit';
import Settings from './pages/Settings';
import Auth from './pages/Auth'

<Route path="/auth" element={<Auth />} />

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/auth" element={<Auth />} />
        <Route path="/" element={<Home />} />
        <Route path="/pomodoro" element={<Pomodoro />} />
        <Route path="/todo" element={<Todo />} />
        <Route path="/habit" element={<Habit />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </Router>
  );
}

export default App;
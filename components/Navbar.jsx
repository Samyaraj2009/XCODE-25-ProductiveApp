import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/auth");
    window.location.reload();
  };

  return (
    <nav className="bg-indigo-700 text-white px-6 py-4 shadow-lg flex justify-between items-center sticky top-0 z-50">
      <Link to="/" className="text-2xl font-extrabold tracking-wide hover:text-indigo-300 transition">
        ProductivityHub
      </Link>

      <ul className="flex items-center space-x-6 text-lg font-medium">
        <li><Link to="/" className="hover:text-indigo-300 transition">Home</Link></li>
        <li><Link to="/pomodoro" className="hover:text-indigo-300 transition">Pomodoro</Link></li>
        <li><Link to="/todo" className="hover:text-indigo-300 transition">To-Do</Link></li>
        <li><Link to="/habit" className="hover:text-indigo-300 transition">Habits</Link></li>
        <li><Link to="/settings" className="hover:text-indigo-300 transition">Settings</Link></li>

        <li>
          {user ? (
            <div className="flex items-center space-x-3">
              <span className="text-white font-semibold">{user.username || user.email}</span>
              <button
                onClick={handleLogout}
                className="text-sm bg-red-500 hover:bg-red-600 px-3 py-1 rounded text-white transition"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link to="/auth" className="hover:text-indigo-300 transition">Login</Link>
          )}
        </li>
      </ul>
    </nav>
  );
}
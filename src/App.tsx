import { BrowserRouter as Router } from 'react-router-dom';
import { AppRouter } from './routes/AppRouter';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <AppRouter />
      </div>
    </Router>
  );
}

export default App;
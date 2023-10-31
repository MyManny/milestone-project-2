import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<RegistrationForm />} />
        {/* Define other routes as needed */}
      </Routes>
    </Router>
  );
}

export default App;

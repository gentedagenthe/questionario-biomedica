import { Routes, Route } from 'react-router-dom';
import Questionario from './Questionario';
import Admin from './Admin';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Questionario />} />
      <Route path="/admin" element={<Admin />} />
    </Routes>
  );
}

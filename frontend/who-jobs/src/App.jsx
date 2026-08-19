
import './App.css'
import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import { useAuthCheck } from './Hooks/useAuthCheck';
function App() {
// useAuthCheck();
 return <RouterProvider router={router} />;
}

export default App

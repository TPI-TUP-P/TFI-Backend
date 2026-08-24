
import './App.css'
import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import { useAuthCheck } from './Hooks/useAuthCheck';
import toast, { Toaster } from 'react-hot-toast';

function App() {
// useAuthCheck();
 return <>
 <RouterProvider router={router} />
    <Toaster position='top-right'/>
 </>
 
}

export default App

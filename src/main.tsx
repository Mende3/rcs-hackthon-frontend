import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard'
import NotFound from './pages/NotFound'
import {createBrowserRouter,RouterProvider} from "react-router-dom";

const router = createBrowserRouter([
  { path:"/",element:<App/> },
  { path:"/login",element:<Login/> },
  { path:"/admin",element:<Dashboard/> },
  { path:"/*",element:<NotFound/> },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)

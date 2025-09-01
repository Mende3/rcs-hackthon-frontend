import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard'
import ClientePedido from './pages/Client'
import NotFound from './pages/NotFound'
import {createBrowserRouter,RouterProvider} from "react-router-dom";
import { DetalhesCliente } from './pages/Details/index.tsx';
import { HistoricoPage } from './pages/History/History.tsx';


const router = createBrowserRouter([
  { path:"/",element:<App/> },
  { path:"/login",element:<Login/> },
  { path:"/admin",element:<Dashboard/> },
  { path:"/clientePedido",element:<ClientePedido/> },
  { path:"/dashboard", element:<Dashboard />},
  { path:"/detalhes/:email", element:<DetalhesCliente/>},
  { path:"/historico", element:<HistoricoPage/>},
  { path:"/*",element:<NotFound/> },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)

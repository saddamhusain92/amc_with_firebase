import React from 'react';
import 'animate.css';
import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router-dom';
import router from './Routes';
import { AuthContext } from './Auth/authContext';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
<AuthContext>
<RouterProvider router={router}/>
</AuthContext>
  
);


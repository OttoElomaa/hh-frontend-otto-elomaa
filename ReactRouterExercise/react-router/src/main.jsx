
import React from "react";
import ReactDOM from "react-dom/client";

import './index.css'
import App from './App.jsx'

import Home from './Home.jsx';
import About from './About.jsx';
import Contact from './Contact.jsx';
import Error from './Error.jsx';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,

    // children are nested routes with a route
    // path can be defined relative to the parent path
    children: [                       
      {
        // INDEX: Front page, automatically in Outlet
        // index route does not need any path
        element: <Home />,
        index: true                   
      },
      {
        path: "about",                
        element: <About />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
    ]
  },
]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
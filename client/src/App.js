import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/authContext';
import MainRoutes from './routes/index';
import Layout from './Components/Layout';
import { ToastContainer } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Layout>
          <MainRoutes />
        </Layout>
      </AuthProvider>
      <ToastContainer
        autoClose={5000}
        newestOnTop
        closeOnClick
        rtl={false}
        draggable
        pauseOnHover={false}
      />
    </BrowserRouter>
  );
}

export default App;

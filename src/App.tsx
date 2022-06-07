import React from 'react';
import { Outlet, Route, Routes } from 'react-router-dom';
import RequireAuth from './components/RequireAuth';
import Login from './components/Login';
import Home from './components/Home';
import About from './components/About';
import LinkPage from './components/LinkPage';
import PersistLogin from './components/PersistLogin';

function App(): React.ReactElement {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <div
            style={{
              height: '100vh',
              paddingTop: '5px',
            }}
          >
            <h1>Layout</h1>
            <Outlet />
          </div>
        }
      >
        {/* public routes */}
        <Route path="login" element={<Login />} />
        <Route path="linkpage" element={<LinkPage />} />

        {/* protected routes */}
        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth />}>
            <Route path="/" element={<Home />} />
            <Route path="about" element={<About />} />
          </Route>
        </Route>
      </Route>

      <Route path="*" element={<h1>Missing</h1>} />
    </Routes>
  );
}

export default App;

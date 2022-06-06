import React from 'react';
import { Outlet, Route, Routes } from 'react-router-dom';
import RequireAuth from './components/RequireAuth';
import Login from './components/Login';
import Home from './components/Home';
import About from './components/About';
import LinkPage from './components/LinkPage';

function App(): React.ReactElement {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <div>
            <h1>Layout</h1>
            <Outlet />
          </div>
        }
      >
        {/* public routes */}
        <Route path="login" element={<Login />} />
        <Route path="linkpage" element={<LinkPage />} />

        {/* protected routes */}
        <Route element={<RequireAuth />}>
          <Route path="/" element={<Home />} />
          <Route path="about" element={<About />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;

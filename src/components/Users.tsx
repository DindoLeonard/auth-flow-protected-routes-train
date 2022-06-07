import React, { useEffect, useState } from 'react';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import useRefreshToken from '../hooks/useRefreshToken';
import { useNavigate, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const Users = (): React.ReactElement => {
  const [users, setUsers] = useState<
    { email: string; password: string; accessToken: string }[]
  >([]);
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();

  const { setAuth } = useAuth();

  const refresh = useRefreshToken();

  useEffect(() => {
    let isMounted = true;
    // now used by axios, cancel request if unmount
    const controller = new AbortController();

    const getUsers = async () => {
      try {
        const response = await axiosPrivate.get('/user', {
          signal: controller.signal,
        });

        isMounted && setUsers(response.data);

        // console.log(response.data);
      } catch (err) {
        console.error(err);
        setAuth(null);
        navigate('/login', { state: { from: location }, replace: true });
      }
    };

    getUsers();

    return () => {
      isMounted = false;

      // due to react 18's current strict mode, I disabled this
      // why? - it will stress test and unmount directly to test it, then will abort directly
      // controller.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <article>
        <h2>Users List</h2>
        {users.length ? (
          <ul>
            {users.map((user, i) => {
              return <li key={i}>{user?.email}</li>;
            })}
          </ul>
        ) : (
          <p>No users to display</p>
        )}
        <button
          type="button"
          onClick={() => {
            refresh();
          }}
        >
          Refresh
        </button>
        <br />
      </article>
    </div>
  );
};

export default Users;

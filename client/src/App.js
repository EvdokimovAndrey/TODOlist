import React, { useContext, useEffect, useState, Suspense } from 'react';
import AppRouter from "./components/router/AppRouter";
import { BrowserRouter } from "react-router-dom";
import NavBar from "./components/NavBar";
import { observer } from "mobx-react-lite";
import { Context } from "./index";
import { Spinner } from "react-bootstrap";

const App = observer(() => {
  const { user } = useContext(Context)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      user.setIsAuth(true)
      user.setUser({});
      setLoading(true)
    } else {
      user.setUser({});
      user.setIsAuth(false)
    }
    setLoading(false);
  }, [])

  if (loading) {
    return <Spinner animation={"grow"} />
  }

  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <AppRouter />
      </BrowserRouter>
    </div>
  );
})

export default App;

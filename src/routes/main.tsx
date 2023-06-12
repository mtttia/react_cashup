import { Outlet, useNavigate } from "react-router-dom";
import { RootState } from "../app/store";
import { useSelector } from "react-redux";
import React from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";


export default function Main(): JSX.Element
{

  const user = useSelector((state: RootState) => state.user.user);
  const [loaded, setLoaded] = React.useState(false);
  const [isLogged, setIsLogged] = React.useState(false);
  const navigate = useNavigate();
  const auth = getAuth();

  onAuthStateChanged(auth, (user) =>
  {
    if (user)
    {
      setIsLogged(true);
    }
    else
    {
      setIsLogged(false);
    }
  })
  
  
  React.useEffect(() =>
  {
    if (!isLogged)
    {
      if (user)
      {
        setIsLogged(true);
      }
      else
      {
        navigate("/login");
        setIsLogged(false);
      }
    }
    if (!loaded)
    {
      setLoaded(true);
    }
  }, [isLogged, loaded, user, navigate])

  return (
    <div>
      {
        loaded 
          ? <Outlet />
          : <></>
      }
    </div>
  )
}
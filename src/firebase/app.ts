import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from "firebase/auth";
import store from "../app/store";
import { setUser } from "../features/user";

export default abstract class App
{
  static async Login(email: string, password: string):Promise<boolean>
  {
    //firebase login method
    const auth = getAuth();
    const userCredentials = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredentials.user;
    if (user)
    {
      store.dispatch(setUser({email:user.email!, accessToken: user.refreshToken, uid: user.uid}));
      return true;
    }

    return false;
  }

  static async Register(email: string, password: string): Promise<boolean>
  {
    //firebase register method
    const auth = getAuth();
    const userCredentials = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredentials.user;
    if (user)
    {
      store.dispatch(setUser({email:user.email!, accessToken: user.refreshToken, uid: user.uid}));
      return true;
    }

    return false;
  }
}
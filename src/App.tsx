import { useSelector } from 'react-redux'
import { RootState } from './app/store';
//import HomePage from './views/home';
import { useEffect } from 'react';
import './translations/i18next';
import { useTranslation } from 'react-i18next';
import {
  RouterProvider,
} from "react-router-dom";
import ThemeProvider from './theme/index';
import { router } from './routes/routes';
import './firebase/firebase'


function App() {
  const language = useSelector((state: RootState) => state.setting.language)
  const { i18n } = useTranslation();
    

  useEffect(() =>
  {
    if(language != i18n.language)
    {
      //set i18n language to language
      i18n.changeLanguage(language)
    }
  })

  return (
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>

    
  )
}

export default App

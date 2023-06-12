import React from "react";
import { Alert, Box, Button, Chip, Fade, Grid, IconButton, Paper, TextField, Typography, useMediaQuery } from "@mui/material";
import {useTheme} from '@mui/material/styles';
import { useTranslation } from "react-i18next";
import App from "../firebase/app";
import {Info} from '@mui/icons-material';

interface AuthenticationFormProps
{
  register: boolean;  
}

export default function AuthenticationForm(props: AuthenticationFormProps)
{
  const { register } = props;
  const [isRegister, setIsRegister] = React.useState<boolean>(register)
  const [email, setEmail] = React.useState<string>("")
  const [confirmEmail, setConfirmEmail] = React.useState<string>("")
  const [confirmPassword, setConfirmPassword] = React.useState<string>("")
  const [password, setPassword] = React.useState<string>("")
  const [errors, setErrors] = React.useState<Map<string, string>>(new Map<string, string>())
  const [labelError, setLabelError] = React.useState<string>("")
  const [showInfoPassword, setShowInfoPassword] = React.useState<boolean>(false)
  const { t } = useTranslation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  function switchToRegister()
  {
    setIsRegister(true)
  }

  function switchToLogin()
  {
    setIsRegister(false)
  }
  
  function validateForm(): boolean
  {
    let registerFieldValid = true;
    const error = new Map<string, string>();
    if( isRegister )
      registerFieldValid = checkSameEmail(error) && checkSamePassword(error);
    
    const emailValid = checkEmail(error);
    const passwordValid = checkPassword(error);
    const isValid = registerFieldValid && emailValid && passwordValid;
    setErrors(error);
    return isValid;
  }

  function checkEmail(error:Map<string, string>): boolean
  {
    const emailRegex = new RegExp('^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$');
    if (!emailRegex.test(email))
    {
      error.set('email', 'auth.email-error');
      return false;
    }
    return true;
  }

  function checkPassword(error:Map<string, string>): boolean
  {
    const passwordRegex = new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$');
    if (!passwordRegex.test(password))
    {
      error.set('password', 'auth.password-error');
      return false;
    }
    return true;
  }

  function checkSameEmail(error:Map<string, string>):boolean
  {
    if (email !== confirmEmail)
    {
      error.set('confirm-email', 'auth.confirm-email-error');
      return false;
    }
    return true;
  }
  
  function checkSamePassword(error:Map<string, string>):boolean
  {
    if (password !== confirmPassword)
    {
      error.set('confirm-password', 'auth.confirm-password-error');
      return false;
    }
    return true;
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>)
  {
    e.preventDefault();
    if (!validateForm())
    {
      return;
    }

    setLabelError('');
    try
    {
      if (isRegister)
      {
        if (!(await App.Register(email, password)))
        {
          setLabelError('auth.register-error');
        }
      }
      else
      {
        if (!(await App.Login(email, password)))
        {
          setLabelError('auth.login-error');
        }
      }
    }
    catch (error)
    {
      setLabelError('common.unknown-error');
    }
  }

  const paperSx = {
    height: isMobile ? '100vh' : 'auto',
    p: 3,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  }

  const formItemSx = {
    marginTop:'10px'
  }


  return (
    <Box sx={{width:'100vw', height:'100vh'}}>
      <Grid container sx={{justifyContent:'start', height:'100%', alignItems:'center'}}>
        <Grid item xs={12} md={6}>
          <Paper sx={paperSx}>
            {
              labelError !== "" && <Alert severity="error" sx={{marginBottom:1, width:'100%'}} onClose={() => {setLabelError('')}} >{t(labelError)}</Alert>

            }
            <Box sx={{display:'flex', justifyContent:'start', width:'100%'}}>
              <Chip style={{margin:2, textTransform:'uppercase'}} color="primary" variant={!isRegister ? 'filled' : 'outlined'} label={ t('auth.login')} onClick={switchToLogin} />
              <Chip style={{margin:2, textTransform:'uppercase'}} color="primary" variant={isRegister ? 'filled' : 'outlined'} label={ t('auth.register')} onClick={switchToRegister} />
            </Box>
            <Typography variant="h2">{ t(isRegister ? 'auth.form-title-register' : 'auth.form-title-login') }</Typography>
            <Box component={'form'} onSubmit={handleSubmit} >
              <TextField sx={formItemSx} name="email" type="email" label={t(errors.get('email') ?? 'auth.email')} variant="outlined" fullWidth value={email} onChange={(e) => setEmail(e.target.value)} error={errors.has('email')} />
              {isRegister && <TextField sx={formItemSx} name="confirm-email" type="email" label={t(errors.get('confirm-email') ?? 'auth.email-confirm')} variant="outlined" fullWidth value={confirmEmail} onChange={(e) => setConfirmEmail(e.target.value)} error={errors.has('confirm-email')}/>}
              
              
              <TextField sx={formItemSx} name="password" type="password" label={t(errors.get('password') ?? 'auth.password')} variant="outlined" fullWidth value={password} onChange={(e) => setPassword(e.target.value)} error={errors.has('password')} />
                
              
              {!isRegister && <Typography>{t('auth.password-regex')}</Typography>}
            
              {isRegister && <TextField sx={formItemSx} name="confirm-password" type="password" label={t(errors.get('confirm-password') ?? 'auth.password-confirm')} variant="outlined" fullWidth value={confirmPassword} error={errors.has('confirm-password')} onChange={(e) => setConfirmPassword(e.target.value)} />}              
              
              <Button sx={formItemSx} type="submit" variant="contained" fullWidth>{ t(isRegister ? 'auth.register' : 'auth.login') }</Button>
            </Box>
          </Paper>
        </Grid>

      </Grid> 
    </Box>
  )
}
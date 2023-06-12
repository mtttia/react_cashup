import {useTranslation} from 'react-i18next'
import { Paper } from '@mui/material';

export default function HomePage()
{
  const { t } = useTranslation();

  return (
    <Paper>
      <h1>{t('general.hello-word')}</h1>
    </Paper>
  )
}
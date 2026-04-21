import { Outlet } from 'react-router-dom'
import { InstallPrompt } from '../pwa/install-prompt'
import { WedooThemeProvider } from '../../theme/wedoo-theme'
import { RouteEffects } from './route-effects'

export function AppFrame() {
  return (
    <WedooThemeProvider>
      <RouteEffects />
      <InstallPrompt />
      <Outlet />
    </WedooThemeProvider>
  )
}

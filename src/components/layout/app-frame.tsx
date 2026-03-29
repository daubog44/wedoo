import { Outlet } from 'react-router-dom'
import { InstallPrompt } from '../pwa/install-prompt'
import { RouteEffects } from './route-effects'

export function AppFrame() {
  return (
    <>
      <RouteEffects />
      <InstallPrompt />
      <Outlet />
    </>
  )
}

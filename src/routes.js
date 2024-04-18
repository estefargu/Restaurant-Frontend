import { exact } from 'prop-types'
import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const Restaurant = React.lazy(()=> import('./views/management/restaurants/restaurant/Restaurant'))


const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: ' /restaurants', name: 'Restaurants', exact: true },
  { path: '/restaurants/restaurant', name: 'Restaurant', element: Restaurant}
]

export default routes

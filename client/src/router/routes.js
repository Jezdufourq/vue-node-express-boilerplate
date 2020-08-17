
// layouts
import MainLayout from 'layouts/MainLayout'

// pages
import Index from 'pages/Index'
import Home from 'pages/Home'

const routes = [
  {
    path: '/',
    component: MainLayout,
    children: [
      { path: '', component: Index },
      { path: 'home', component: Home }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes

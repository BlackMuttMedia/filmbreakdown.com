import React from 'react'
import Helmet from 'react-helmet'
import TopNav from './TopNav'

const App = ({ children }) => (
  <div>
    <Helmet title='Film Breakdown' titleTemplate='%s - Film Breakdown' />
    <TopNav />
    {children}
  </div>
)

export default App

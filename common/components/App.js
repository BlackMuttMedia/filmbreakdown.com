import React from 'react'
import Helmet from 'react-helmet'
import TopNav from './TopNav'

const App = ({ children }) => (
  <div>
    <Helmet title='React Production Starter' titleTemplate='%s - React Production Starter' />
    <TopNav />
    {children}
  </div>
)

export default App

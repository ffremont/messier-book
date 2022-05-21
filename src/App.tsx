import React from 'react'
import './App.css'
import {
  MessierAppBar,
  GeneralInformation,
  MessierContainer,
  MessierProvider,
} from './messier'

function App() {
  return (
    <MessierProvider>
      {' '}
      <div className="App">
        <MessierAppBar />

        <div className="app-container">
          <GeneralInformation />
          <MessierContainer />
        </div>
      </div>
    </MessierProvider>
  )
}

export default App

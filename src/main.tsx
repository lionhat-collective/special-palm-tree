import React from 'react'
import ReactDOM from 'react-dom'
import App, { AppProps } from './App';
import { ProfitCalculatorProvider, initialState } from './profit-calculator'

(window as any).profitCalculator = (rootElement: string = 'root', props?: AppProps) => {
  return ReactDOM.render(
    <React.StrictMode>
      <ProfitCalculatorProvider initialState={initialState}>
        <App {...props} />
      </ProfitCalculatorProvider>
    </React.StrictMode>,
    document.getElementById(rootElement)
  )
}
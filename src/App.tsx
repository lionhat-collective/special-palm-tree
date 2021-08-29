import React, { ReactNode } from 'react'
import ReactDOM from 'react-dom'
import { ProfitCalculatorField, ProfitCalculatorFieldProps, ProfitCalculatorHeader, ProfitCalculatorHeaderProps } from './profit-calculator/components'

type AppConfig<T extends Record<string, unknown> = Record<string, unknown>> = [string, T]
type ConfigFieldProps = Omit<ProfitCalculatorFieldProps, 'name'>

export type AppProps = {
  income?: AppConfig<ConfigFieldProps>
  materialCost?: AppConfig<ConfigFieldProps>
  profitPercentage?: AppConfig<ConfigFieldProps>
  ownerPayPercentage?: AppConfig<ConfigFieldProps>
  taxPercentage?: AppConfig<ConfigFieldProps>
  operatingExpensePercentage?: AppConfig<ConfigFieldProps>
  headers?: AppConfig<ProfitCalculatorHeaderProps>[]
}

function PortalComponent(Component: ReactNode, id: string) {
  const el = document.getElementById(id)
  return el ? ReactDOM.createPortal(Component, el) : null
}

const RenderConfig = <T extends AppConfig>(renderer: (props: T['1'], id: string) => React.ReactPortal | null, config?: T): React.ReactPortal | null => {
  return config ? renderer(config[1], config[0]) : null
}

const FieldPortal = (name: string) => (props: ConfigFieldProps, id: string) => {
  return PortalComponent((
    <ProfitCalculatorField
      {...props}
      name={name}
    />
  ), id)
}

const HeaderPortal = (key?: string) => (props: ProfitCalculatorHeaderProps, id: string) => {
  return PortalComponent((
    <ProfitCalculatorHeader
      key={key}
      {...props}
    />
  ), id)
}

function App(props: AppProps) {
  const IncomeField = () => RenderConfig(FieldPortal('income'), props.income)
  const MaterialsField = () => RenderConfig(FieldPortal('material-cost'), props.materialCost)
  const ProfitPercentageField = () => RenderConfig(FieldPortal('profit-percentage'), props.profitPercentage)
  const OwnerPayPercentageField = () => RenderConfig(FieldPortal('owner-pay-percentage'), props.ownerPayPercentage)
  const TaxPercentageField = () => RenderConfig(FieldPortal('tax-percentage'), props.profitPercentage)
  const OperatingExpensePercentageField = () => RenderConfig(FieldPortal('operating-expense-percentage'), props.profitPercentage)

  return (
    <>
      <IncomeField />
      <MaterialsField />
      <ProfitPercentageField />
      <OwnerPayPercentageField />
      <TaxPercentageField />
      <OperatingExpensePercentageField />
      {props.headers?.map((header, idx) => RenderConfig(HeaderPortal(`header-${idx}`), header)) ?? null}
    </>
  )
}

export default App

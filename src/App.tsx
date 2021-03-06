import React, { ReactNode, useEffect } from 'react'
import ReactDOM from 'react-dom'
import { useProfitCalculator } from './profit-calculator'
import { ProfitCalculatorField, ProfitCalculatorFieldProps, ValueObserver, ValueObserverProps } from './profit-calculator/components'

type AppConfig<T extends Record<string, unknown> = Record<string, unknown>> = [string, T]
type ConfigFieldProps = Omit<ProfitCalculatorFieldProps, 'name'>

export type AppProps = {
  income?: AppConfig<ConfigFieldProps>
  materialCost?: AppConfig<ConfigFieldProps>
  profitPercentage?: AppConfig<ConfigFieldProps>
  ownerPayPercentage?: AppConfig<ConfigFieldProps>
  taxPercentage?: AppConfig<ConfigFieldProps>
  operatingExpensePercentage?: AppConfig<ConfigFieldProps>
  accounts?: AppConfig<ConfigFieldProps>[]
  observers?: AppConfig<ValueObserverProps>[]
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

const ObserverPortal = (key?: string) => (props: ValueObserverProps, id: string) => {
  return PortalComponent((
    <ValueObserver
      key={key}
      {...props}
    />
  ), id)
}

const Accounts = ({ initialAccounts }: { initialAccounts?: AppConfig<ConfigFieldProps>[] }) => {
  const [{ accounts }, { setAccounts }] = useProfitCalculator()
  useEffect(() => {
    if (initialAccounts && accounts.length === 0) {
      setAccounts(initialAccounts.map(account => account[0]))
    }
  }, [setAccounts, accounts, initialAccounts])
  return (
    <>
      {
        initialAccounts?.map((account, index) => {
          return PortalComponent(
            <ProfitCalculatorField
              name={`account-${index + 1}`}
              key={`account-${index + 1}`} 
              {...account[1]}
            />,
            account[0])
        }) ?? null
      }
    </>
  )
}

function App(props: AppProps) {
  const IncomeField = () => RenderConfig(FieldPortal('income'), props.income)
  const MaterialsField = () => RenderConfig(FieldPortal('material-cost'), props.materialCost)
  const ProfitPercentageField = () => RenderConfig(FieldPortal('profit-percentage'), props.profitPercentage)
  const OwnerPayPercentageField = () => RenderConfig(FieldPortal('owner-pay-percentage'), props.ownerPayPercentage)
  const TaxPercentageField = () => RenderConfig(FieldPortal('tax-percentage'), props.taxPercentage)
  const OperatingExpensePercentageField = () => RenderConfig(FieldPortal('operating-expense-percentage'), props.operatingExpensePercentage)

  return (
    <>
      <IncomeField />
      <MaterialsField />
      <ProfitPercentageField />
      <OwnerPayPercentageField />
      <TaxPercentageField />
      <OperatingExpensePercentageField />
      <Accounts initialAccounts={props.accounts} />
      {props.observers?.map((observer) => RenderConfig(ObserverPortal(observer[0]), observer)) ?? null}
    </>
  )
}

export default App

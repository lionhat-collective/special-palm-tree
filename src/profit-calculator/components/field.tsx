import React from 'react'
import { useProfitCalculator } from '../context';
import { ProfitCalculatorState } from '../types';

type OmittedProfitCalculatorStateKeys = 
    | 'accounts'
    | 'intoProfit'
    | 'intoOwner'
    | 'intoTax'
    | 'intoOperatingExpense'
    | 'intoAccounts'

const mapFieldNameToValue: {
    [key: string]: keyof Omit<ProfitCalculatorState, OmittedProfitCalculatorStateKeys> } = {
    income: 'incomeReceived',
    'material-cost': 'materialCost',
    'profit-percentage': 'profitPercentage',
    'owner-pay-percentage': 'ownerPayPercentage',
    'tax-percentage': 'taxPercentage',
    'operating-expense-percentage': 'operatingExpensePercentage',
}

export type ProfitCalculatorFieldProps = {
    label?: string;
    labelClassName?: string
    placeholder?: string
    className?: string
    name: string;
}

export function ProfitCalculatorField(props: ProfitCalculatorFieldProps) {
    const [state, { handleChange }] = useProfitCalculator()
    return (
        <>
            {props.label && <label htmlFor={props.name} className={'profit-calculator__field-label' + (props.labelClassName ? ` ${props.labelClassName}` : '')}>{props.label}</label>}
            <input
                type="number"
                className={'profit-calculator__field-input' + (props.className ? ` ${props.className}` : '')}
                name={props.name}
                placeholder={props.placeholder}
                value={state[mapFieldNameToValue[props.name]]}
                onChange={handleChange}
            />
        </>
    );
}
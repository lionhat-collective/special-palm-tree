import React from 'react'
import { useProfitCalculator } from '../context';
import { ProfitCalculatorState } from '../types';

const mapFieldNameToValue: { [key: string]: keyof Omit<ProfitCalculatorState, 'accounts'> } = {
    income: 'incomeReceived',
    'material-cost': 'materialCost',
    'profit-percentage': 'profitPercentage',
    'owner-pay-percentage': 'ownerPayPercentage',
    'tax-percentage': 'taxPercentage',
    'operating-expense-percentage': 'operatingExpensePercentage',
}

export type ProfitCalculatorFieldProps = {
    label?: string;
    placeholder?: string
    name: string;
}

export function ProfitCalculatorField(props: ProfitCalculatorFieldProps) {
    const [state, { handleChange }] = useProfitCalculator()
    return (
        <>
            {props.label && <label className='profit-calculator__field-label'>{props.label}</label>}
            <input
                type="number"
                className='profit-calculator__field-input'
                name={props.name}
                placeholder={props.placeholder}
                value={state[mapFieldNameToValue[props.name]]}
                onChange={handleChange}
            />
        </>
    );
}
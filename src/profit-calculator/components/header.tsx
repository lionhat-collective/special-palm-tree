import React, { PropsWithChildren } from 'react'
import { useProfitCalculator } from '../context'
import { ProfitCalculatorState } from '../types'

export type ProfitCalculatorHeaderProps = {
    title?: string
    stateKey?: keyof Pick<ProfitCalculatorState, 'profitRemaining' | 'realRevenue' | 'percentageRemaining'>
}

export function ProfitCalculatorHeader(props: PropsWithChildren<ProfitCalculatorHeaderProps>) {
    const [state] = useProfitCalculator()
    return (
        <>
            {props.title && (
                <h2 className='profit-calculator__section-header-title'>
                    {props.title}
                </h2>
            )}
            {props.stateKey && (
                <h3 className='profit-calculator__section-header-title--subtitle'>
                    {state[props.stateKey]}
                </h3>
            )}
        </>
    )
}
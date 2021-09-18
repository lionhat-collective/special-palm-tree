import React from 'react'
import { Account } from '..'
import { useProfitCalculator } from "../context"
import { ProfitCalculatorState } from "../types"

export type ValueObserverProps = {
    name: string | keyof ProfitCalculatorState
}

export function ValueObserver({ name }: ValueObserverProps) {
    const [state] = useProfitCalculator()
    if (name.includes('.')) {
        const [key, index] = name.split('.') as [keyof ProfitCalculatorState, string]
        const accounts = state[key] as Account[]
        return <>{JSON.stringify(accounts[parseInt(index) - 1])}</>
    }
    return <>{JSON.stringify(state[name as keyof ProfitCalculatorState])}</>
}
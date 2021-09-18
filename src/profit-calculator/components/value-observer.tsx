import React, { useMemo } from 'react'
import { useProfitCalculator } from "../context"
import { ProfitCalculatorState } from "../types"

export type ValueObserverProps = {
    name: string | keyof ProfitCalculatorState
}

const valueNumberState = (value: number) => `${(value > 0 ? '-positive' : value < 0 ? '-negative' : '')}`

export function ValueObserver({ name }: ValueObserverProps) {
    const [state] = useProfitCalculator()
    const [value, className] = useMemo((): [unknown, string] => {
        let className = `profit-calculator__observer-`
        let value = state[name as keyof ProfitCalculatorState]
        if (name.includes('intoAccounts.')) {
            const [key, index] = name.split('.') as [keyof ProfitCalculatorState, string]
            const accounts = state[key] as number[]
            const _index = parseInt(index) - 1
            const account = accounts[_index] ?? 0
            value = account
            className = `${className}${key}${value ? valueNumberState(value) : ''}`
            return [value, className]
        }
        className = `${className}${name}${typeof value === 'number' ? valueNumberState(value) : ''}`
        return [value, className]
    }, [name, state])

    return <span className={className}>{`${typeof value === 'number' ? value.toFixed(2) : value}`}</span>
}
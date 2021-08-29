import React from 'react'
import { useProfitCalculator } from "../context"
import { ProfitCalculatorState } from "../types"

export type ValueObserverProps = {
    name: keyof ProfitCalculatorState
}

export function ValueObserver({ name }: ValueObserverProps) {
    const [state] = useProfitCalculator()
    console.log(state[name], name)
    return <>{JSON.stringify(state[name])}</>
}
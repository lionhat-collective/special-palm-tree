import React, { createContext, PropsWithChildren, useCallback, useContext, useEffect, useMemo, useReducer } from "react";
import { profitReducer } from "./reducer";
import { ProfitCalculatorAction, ProfitCalculatorState } from "./types";

type ProfitCalculatorActions = {
    handleChange: (evt: React.ChangeEvent<HTMLInputElement>) => void;
    setAccounts: (accounts: string[]) => void;
}
type ProfitCalculator = [ProfitCalculatorState, ProfitCalculatorActions]
type ProfitCalculatorInputAction = Exclude<ProfitCalculatorAction['type'], 'SET_ACCOUNT' | 'SET_ACCOUNTS'>

const ProfitCalculatorContext = createContext<ProfitCalculator | undefined>(undefined);


export function ProfitCalculatorProvider({ children, initialState }: PropsWithChildren<{ initialState: ProfitCalculatorState }>) {
    const [state, dispatch] = useReducer(profitReducer, initialState)
    const setAccounts = useCallback((accounts: string[]) => {
        dispatch({ type: 'SET_ACCOUNTS', payload: accounts.map(account => [account, undefined]) })
    }, [])
    const handleChange = useCallback((evt: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = evt.target;
        const parsedValue = value === '' || value == null || Number.isNaN(value) ? undefined : parseFloat(value)
        if (name.includes('account-')) {
            const index = parseInt(name.split('-')[1])
            dispatch({ type: "SET_ACCOUNT", payload: [`account-${index}`, parsedValue] })
            return
        }
        const actionName = `SET_${name.replace(/-/gi, '_').toUpperCase()}` as ProfitCalculatorInputAction
        dispatch({ type: actionName, payload: parsedValue })
    }, [])

    const {
        incomeReceived,
        materialCost,
        operatingExpensePercentage,
        ownerPayPercentage,
        profitPercentage,
        taxPercentage,
        accounts,
    } = state

    useEffect(() => {
        if (
            incomeReceived !== undefined &&
            materialCost !== undefined &&
            operatingExpensePercentage !== undefined &&
            ownerPayPercentage !== undefined &&
            profitPercentage !== undefined &&
            taxPercentage !== undefined ||
            accounts.some(account => account[1] !== undefined)
        ) {
            dispatch({ type: 'DERIVE_REMAINING_PROFIT' })
        }
    }, [
        incomeReceived,
        materialCost,
        operatingExpensePercentage,
        ownerPayPercentage,
        profitPercentage,
        taxPercentage,
        accounts,
    ])

    const value = useMemo((): ProfitCalculator => [state, {
        handleChange,
        setAccounts,
    }], [state, handleChange, setAccounts])

    return (
        <ProfitCalculatorContext.Provider value={value}>
            {children}
        </ProfitCalculatorContext.Provider>
    )
}

export function useProfitCalculator(): ProfitCalculator {
    const context = useContext(ProfitCalculatorContext)
    if (typeof context === 'undefined') throw new Error('useProfitCalculator was called outside of ProfitCalculator context')
    return context
}
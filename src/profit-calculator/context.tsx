import React, { createContext, PropsWithChildren, useCallback, useContext, useEffect, useMemo, useReducer } from "react";
import { profitReducer } from "./reducer";
import { ProfitCalculatorAction, ProfitCalculatorState } from "./types";

type ProfitCalculatorActions = {
    handleChange: (evt: React.ChangeEvent<HTMLInputElement>) => void;
    addAccount: () => void;
    removeAccount: (index: number) => void;
}
type ProfitCalculator = [ProfitCalculatorState, ProfitCalculatorActions]
type ProfitCalculatorInputAction = Exclude<ProfitCalculatorAction['type'], 'SET_ACCOUNT' | 'ADD_ACCOUNT' | 'REMOVE_ACCOUNT'>

const ProfitCalculatorContext = createContext<ProfitCalculator | undefined>(undefined);


export function ProfitCalculatorProvider({ children, initialState }: PropsWithChildren<{ initialState: ProfitCalculatorState }>) {
    const [state, dispatch] = useReducer(profitReducer, initialState)
    const addAccount = () => dispatch({ type: "ADD_ACCOUNT", payload: [`account-${state.accounts.length}`, 0] })
    const removeAccount = (index: number) => dispatch({ type: "REMOVE_ACCOUNT", payload: `account-${index}` })
    const handleChange = useCallback((evt: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = evt.target;
        const parsedValue = value !== '' ? parseFloat(value) : undefined
        if (name.includes('account-')) {
            const index = parseInt(name.split('-')[1])
            dispatch({ type: "SET_ACCOUNT", payload: [`account-${index}`, parsedValue] })
            return
        }
        const actionName = `SET_${name.replace(/-/gi, '_').toUpperCase()}` as ProfitCalculatorInputAction
        dispatch({ type: actionName, payload: parsedValue })
    }, [])

    useEffect(() => {
        if (state.percentageRemaining === 0 && state.profitRemaining === 0 && state.realRevenue !== 0) {
            dispatch({ type: 'DERIVE_REMAINING_PROFIT' })
        }
    }, [state])

    console.log({ state })

    const value = useMemo((): ProfitCalculator => [state, {
        handleChange,
        addAccount,
        removeAccount
    }], [state, handleChange, addAccount, removeAccount])

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
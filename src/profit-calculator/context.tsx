import React, { createContext, PropsWithChildren, useCallback, useContext, useMemo, useReducer } from "react";
import { profitReducer, initialState } from "./reducer";
import { ProfitCalculatorAction, ProfitCalculatorState } from "./types";

function calculateRevenue(income: number, expenditure: number) {
    return income - expenditure;
}

type ProfitCalculatorActions = {
    handleChange: (evt: React.ChangeEvent<HTMLInputElement>) => void;
    addAccount: () => void;
    removeAccount: (index: number) => void;
}
type ProfitCalculator = [ProfitCalculatorState, ProfitCalculatorActions]

const ProfitCalculatorContext = createContext<ProfitCalculator | undefined>(undefined);

export function ProfitCalculatorProvider({ children, initialState }: PropsWithChildren<{ initialState: ProfitCalculatorState }>) {
    const [state, dispatch] = useReducer(profitReducer, initialState)
    const addAccount = () => dispatch({ type: "ADD_ACCOUNT", payload: [`account-${state.accounts.length}`, 0] })
    const removeAccount = (index: number) => dispatch({ type: "REMOVE_ACCOUNT", payload: `account-${index}` })
    const handleChange = useCallback((evt: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = evt.target;
        const parsedValue = typeof value === 'undefined' ? value : parseInt(value)
        if (name.includes('account-')) {
            const index = parseInt(name.split('-')[1])
            dispatch({ type: "SET_ACCOUNT", payload: [`account-${index}`, parsedValue] })
            return
        }
        const actionName = `SET_${name.replace(/-/gi, '_').toUpperCase()}` as Exclude<ProfitCalculatorAction['type'], 'SET_ACCOUNT' | 'ADD_ACCOUNT' | 'REMOVE_ACCOUNT'>
        dispatch({ type: actionName, payload: parsedValue })
    }, [])

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
import { Account, ProfitCalculatorAction, ProfitCalculatorState } from "./types"

export const initialState: ProfitCalculatorState = {
    incomeReceived: undefined,
    materialCost: undefined,
    operatingExpensePercentage: undefined,
    ownerPayPercentage: undefined,
    profitPercentage: undefined,
    taxPercentage: undefined,
    accounts: [],
    profitRemaining: 0,
    percentageRemaining: 100,
    realRevenue: 0,
}

export function profitReducer(state: ProfitCalculatorState, action: ProfitCalculatorAction): ProfitCalculatorState {
    switch (action.type) {
        case 'SET_INCOME': return {
            ...state,
            incomeReceived: action.payload,
        }
        case 'SET_MATERIAL_COST': return {
            ...state,
            materialCost: action.payload,
        }
        case 'SET_PROFIT_PERCENTAGE': return {
            ...state,
            profitPercentage: action.payload,
        }
        case 'SET_OWNER_PAY_PERCENTAGE': return {
            ...state,
            ownerPayPercentage: action.payload,
        }
        case 'SET_TAX_PERCENTAGE': return {
            ...state,
            taxPercentage: action.payload,
        }
        case 'SET_OPERATING_EXPENSE_PERCENTAGE': return {
            ...state,
            operatingExpensePercentage: action.payload,
        }
        case 'ADD_ACCOUNT': return {
            ...state,
            accounts: [...state.accounts, action.payload],
        }
        case 'REMOVE_ACCOUNT': return {
            ...state,
            accounts: state.accounts.filter(([id]: Account) => id !== action.payload),
        }
        case 'SET_ACCOUNT': return {
            ...state,
            accounts: state.accounts.map(([id, value]: Account) => id === (action.payload as Account)[0] ? action.payload : [id, value]),
        }
        default:
            return state
    }
}
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
    intoProfit: 0,
    intoOwner: 0,
    intoTax: 0,
    intoOperatingExpense: 0,
    intoAccounts: [],
}

function calculatePercentageRemaining(state: ProfitCalculatorState): ProfitCalculatorState {
    const percentageRemaining = 100 - (
        (state.profitPercentage ?? 0) + 
        (state.ownerPayPercentage ?? 0) + 
        (state.taxPercentage ?? 0) + 
        (state.operatingExpensePercentage ?? 0) + 
        state.accounts.reduce((acc, [, percentage]) => acc + (percentage ?? 0), 0)
    )
    return {
        ...state,
        percentageRemaining,
    }
}

function calculateProfitRemaining(state: ProfitCalculatorState): ProfitCalculatorState {
    const totalProfit = state.realRevenue - state.intoProfit;
    const profitRemaining = totalProfit * (state.profitPercentage ?? 0) / 100;
    return {
        ...state,
        profitRemaining,
    }
}

function calculateRevenue(income: number = 0, expenditure: number = 0) {
    return income - expenditure;
}

export function profitReducer(state: ProfitCalculatorState, action: ProfitCalculatorAction): ProfitCalculatorState {
    switch (action.type) {
        case 'SET_INCOME': return {
            ...state,
            incomeReceived: action.payload,
            realRevenue: calculateRevenue(action.payload, state.materialCost),
        }
        case 'SET_MATERIAL_COST': return {
            ...state,
            materialCost: action.payload,
            realRevenue: calculateRevenue(state.incomeReceived, action.payload),
        }
        case 'SET_PROFIT_PERCENTAGE': return calculatePercentageRemaining({
            ...state,
            profitPercentage: action.payload,
        })
        case 'SET_OWNER_PAY_PERCENTAGE': return calculatePercentageRemaining({
            ...state,
            ownerPayPercentage: action.payload,
        })
        case 'SET_TAX_PERCENTAGE': return calculatePercentageRemaining({
            ...state,
            taxPercentage: action.payload,
        })
        case 'SET_OPERATING_EXPENSE_PERCENTAGE': return calculatePercentageRemaining({
            ...state,
            operatingExpensePercentage: action.payload,
        })
        case 'ADD_ACCOUNT': return {
            ...state,
            accounts: [...state.accounts, action.payload],
        }
        case 'REMOVE_ACCOUNT': return {
            ...state,
            accounts: state.accounts.filter(([id]: Account) => id !== action.payload),
        }
        case 'SET_ACCOUNT': return calculatePercentageRemaining({
            ...state,
            accounts: state.accounts.map(([id, value]: Account) => id === (action.payload as Account)[0] ? action.payload : [id, value]),
        })
        case 'DERIVE_REMAINING_PROFIT': return calculateProfitRemaining({
            ...state,
            intoProfit: state.realRevenue * ((state.profitPercentage ?? 0) / 100),
            intoOwner: state.realRevenue * ((state.ownerPayPercentage ?? 0) / 100),
            intoTax: state.realRevenue * ((state.taxPercentage ?? 0) / 100),
            intoOperatingExpense: state.realRevenue * ((state.operatingExpensePercentage ?? 0) / 100),
            intoAccounts: state.accounts.map(([, percentage]: Account) => state.realRevenue * ((percentage ?? 0) / 100)),
        })

        default:
            return state
    }
}
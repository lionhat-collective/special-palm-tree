
export type Account = [string, number]

export type ProfitCalculatorState = {
    incomeReceived?: number
    materialCost?: number
    profitPercentage?: number
    ownerPayPercentage?: number
    taxPercentage?: number
    operatingExpensePercentage?: number
    realRevenue: number
    percentageRemaining: number
    profitRemaining: number
    accounts: Account[]
}

export type ProfitCalculatorAction = 
    | { type: 'SET_INCOME', payload: number }
    | { type: 'SET_MATERIAL_COST', payload: number }
    | { type: 'SET_PROFIT_PERCENTAGE', payload: number }
    | { type: 'SET_OWNER_PAY_PERCENTAGE', payload: number }
    | { type: 'SET_TAX_PERCENTAGE', payload: number }
    | { type: 'SET_OPERATING_EXPENSE_PERCENTAGE', payload: number }
    | { type: 'ADD_ACCOUNT', payload: Account }
    | { type: 'REMOVE_ACCOUNT', payload: string }
    | { type: 'SET_ACCOUNT', payload: Account }
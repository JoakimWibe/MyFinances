export interface Transaction {
    _id: string;
    title: string;
    amount: number;
    date: string;
    category: string;
    description?: string;
    type: 'income' | 'expense';
    createdAt: string;
    updatedAt: string;
}

export type Income = Transaction & { type: 'income' };
export type Expense = Transaction & { type: 'expense' };

export type NewTransaction = 
    | (Omit<Income, '_id' | 'createdAt' | 'updatedAt'> & { type: 'income' })
    | (Omit<Expense, '_id' | 'createdAt' | 'updatedAt'> & { type: 'expense' });
export interface ITransfer {
    id?: number;
    uuid?: string;
    account_holder: string;
    iban: string;
    amount: number;
    date: Date;
    note: string;
    created_at?: Date;
}


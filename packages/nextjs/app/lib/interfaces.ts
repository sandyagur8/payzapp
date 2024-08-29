export interface user_props {
    email: string;
    walletAddress: string;
    phoneNumber: string;
    isMerchant: true;
    name:string
  }

  export type Transaction = {
    id:number
    type: 'sent' | 'received'
    to?: string
    from?: string
    amount: number
    created_at: string
  }
  
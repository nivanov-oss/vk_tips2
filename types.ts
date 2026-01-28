
export enum ViewMode {
  VISITOR = 'visitor',
  ADMIN = 'admin'
}

export enum PaymentMethod {
  CARD = 'card',
  WALLET = 'wallet'
}

export interface WidgetConfig {
  paymentLink: string;
  goalAmount: number;
  currentAmount: number;
  supportersCount: number;
  title: string;
}

export interface TipRequest {
  amount: number;
  comment: string;
  method: PaymentMethod;
}

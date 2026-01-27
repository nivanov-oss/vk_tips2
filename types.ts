
export interface WidgetConfig {
  paymentLink: string;
  title: string;
  goalAmount: number;
  collectedAmount: number;
  supportersCount: number;
  description: string;
}

export enum AppRole {
  ADMIN = 'ADMIN',
  VISITOR = 'VISITOR'
}

export enum PaymentMethod {
  CARD = 'CARD',
  WALLET = 'WALLET'
}

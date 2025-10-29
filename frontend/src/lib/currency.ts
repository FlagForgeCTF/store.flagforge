// Currency conversion utilities
export const USD_TO_NPR_RATE = 140; // 1 USD = 140 NPR

export interface CurrencyDisplay {
  usd: number;
  npr: number;
}

export function convertUsdToNpr(usdAmount: number): number {
  return Math.round(usdAmount * USD_TO_NPR_RATE);
}

export function formatCurrency(amount: number, currency: 'USD' | 'NPR'): string {
  if (currency === 'USD') {
    return `$${amount.toFixed(2)}`;
  } else {
    return `Rs. ${amount.toLocaleString('en-IN')}`;
  }
}

export function getCurrencyDisplay(usdPrice: number): CurrencyDisplay {
  return {
    usd: usdPrice,
    npr: convertUsdToNpr(usdPrice)
  };
}

export function formatDualCurrency(usdPrice: number): string {
  const display = getCurrencyDisplay(usdPrice);
  return `${formatCurrency(display.usd, 'USD')} / ${formatCurrency(display.npr, 'NPR')}`;
}
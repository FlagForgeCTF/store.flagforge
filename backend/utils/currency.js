// Currency conversion utilities
export const USD_TO_NPR_RATE = process.env.USD_TO_NPR_RATE || 140;

export function convertUsdToNpr(usdAmount) {
  return Math.round(usdAmount * USD_TO_NPR_RATE);
}

export function getCurrencyDisplay(usdPrice) {
  return {
    usd: usdPrice,
    npr: convertUsdToNpr(usdPrice)
  };
}

export function formatCurrency(amount, currency) {
  if (currency === 'USD') {
    return `$${amount.toFixed(2)}`;
  } else {
    return `Rs. ${amount.toLocaleString('en-IN')}`;
  }
}

export function formatDualCurrency(usdPrice) {
  const display = getCurrencyDisplay(usdPrice);
  return `${formatCurrency(display.usd, 'USD')} / ${formatCurrency(display.npr, 'NPR')}`;
}
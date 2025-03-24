export function formatCurrency(amount, currency) {
    return new Intl.NumberFormat('es-CL', { style: 'currency', currency }).format(amount);
  }
  
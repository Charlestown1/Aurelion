import { ILLUSTRATIVE_RATE } from '../data/packages.js';
const usd = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 2 });
export const money = (n) => usd.format(n);

export function project(amount, days, rates) {
  const gain = amount * rates[days];
  return { gain, total: amount + gain, perDay: gain / days };
}

export function maturityDate(days) {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}


export function machineStats(m) {
  const frac = Math.min(1, m.startedAgo / m.days);
  const start = new Date(); start.setDate(start.getDate() - m.startedAgo);
  const mat = new Date(); mat.setDate(mat.getDate() + m.days - m.startedAgo);
  return { ...m, frac, start, mat, accrued: m.amount * ILLUSTRATIVE_RATE[m.days] * frac };
}
export const shortDate = (d) => d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

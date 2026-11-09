export const daysAgo = (n) => { const d = new Date(); d.setDate(d.getDate() - n); return d; };

export const INITIAL_AVAILABLE = 1250;

// Simulated machines in the demo account.
export const MACHINES = [
  { id: 'm1', name: 'Professional Miner', amount: 1000, days: 60, startedAgo: 20 },
  { id: 'm2', name: 'Starter Miner', amount: 100, days: 30, startedAgo: 12 },
];

export const INITIAL_TX = [
  { id: 't1', type: 'Deposit', asset: 'USDT TRC20', amount: 1350, status: 'Completed', date: daysAgo(21) },
  { id: 't2', type: 'Investment purchase', asset: 'Professional Miner', amount: 1000, status: 'Completed', date: daysAgo(20) },
  { id: 't3', type: 'Deposit', asset: 'USDT BEP20', amount: 100, status: 'Completed', date: daysAgo(12) },
  { id: 't4', type: 'Investment purchase', asset: 'Starter Miner', amount: 100, status: 'Completed', date: daysAgo(12) },
  { id: 't5', type: 'Mining earnings', asset: 'Professional Miner (simulated)', amount: 6.4, status: 'Completed', date: daysAgo(7) },
  { id: 't6', type: 'Mining earnings', asset: 'Starter Miner (simulated)', amount: 0.9, status: 'Completed', date: daysAgo(3) },
];

export const CRYPTOS = { USDT: ['TRC20', 'BEP20', 'ERC20'], Bitcoin: ['Bitcoin'], Ethereum: ['ERC20'] };
export const COUNTRIES = ['Nigeria', 'Ghana', 'Kenya', 'South Africa', 'United Kingdom', 'United States', 'Canada', 'Germany', 'United Arab Emirates', 'Other'];

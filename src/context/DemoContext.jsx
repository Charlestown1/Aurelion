import { createContext, useContext, useState } from 'react';
import { INITIAL_AVAILABLE, INITIAL_TX } from '../data/demo.js';

const Ctx = createContext(null);
export const useDemo = () => useContext(Ctx);

// Everything lives in memory only. Refreshing the page resets the demo.
export function DemoProvider({ children }) {
  const [session, setSession] = useState(false);
  const [available, setAvailable] = useState(INITIAL_AVAILABLE);
  const [txs, setTxs] = useState(INITIAL_TX);

  const addTx = (tx) => setTxs((t) => [{ id: `t${Date.now()}`, date: new Date(), status: 'Pending', ...tx }, ...t]);
  const value = {
    session, available, txs,
    enter: () => setSession(true),
    leave: () => setSession(false),
    requestDeposit: (asset, amount) => addTx({ type: 'Deposit', asset, amount }),
    requestWithdrawal: (asset, amount) => { setAvailable((a) => a - amount); addTx({ type: 'Withdrawal', asset, amount }); },
  };
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

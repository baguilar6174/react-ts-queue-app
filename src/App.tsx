import * as React from 'react';
import './style.css';

import updateAmount from './util';
import Queue from './queue';

const initialAmount = 1;
const multiplier = 5;

async function worker(amount: number, done: (result: number) => void) {
  const result = await updateAmount(amount); // API call
  done(result);
}

const updateAmountQueued = Queue(worker);

export default function App() {
  const [amount, setAmount] = React.useState<number>(initialAmount);

  return (
    <div>
      <h1>Queue</h1>
      <p>Amount: {amount}</p>
      <button onClick={handleClick}>Multiply by {multiplier}</button>
      <button onClick={handleClickWithQueue}>
        Using Queue Multiply by {multiplier}
      </button>
    </div>
  );

  async function handleClickWithQueue(): Promise<void> {
    const newAmount = amount * multiplier;
    setAmount(newAmount);
    updateAmountQueued(amount * multiplier, function callback(result) {
      setAmount(result);
    });
  }

  async function handleClick(): Promise<void> {
    /**
     * The problem here is that API calls can be resolved in any order which causes
     * the interface to not terminate in the correct state.
     */
    const newAmount = amount * multiplier;
    setAmount(newAmount); // I am assuming that the process went well
    const result = await updateAmount(newAmount); // API call
    setAmount(result); // I update the result with the API process
  }
}

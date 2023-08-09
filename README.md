# Data structure Queue

Implementation of the queue data structure, using Typescript.

<table>
  <tr>
    <td align="center" valign="center"><img src="./media/queue.png" width="100%"></td>
  </tr>
</table>

## Usage

```typescript
async function worker(amount: number, done: (result: number) => void) {
  const result = await updateAmount(amount); // For exmaple API call
  done(result);
}

const updateAmountQueued = Queue(worker);

updateAmountQueued(amount * multiplier, function callback(result) {
  // Your result in result variable
});
```

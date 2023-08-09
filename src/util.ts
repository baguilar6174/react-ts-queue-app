const awaitTimeout = (delay: number) =>
  new Promise((resolve) => setTimeout(resolve, delay));

export default async function updateAmount(amount: number): Promise<number> {
  await awaitTimeout(1000);
  return amount;
}

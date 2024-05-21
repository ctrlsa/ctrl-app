<script lang="ts">
  import { 
    Keypair,
    LAMPORTS_PER_SOL,
    PublicKey,
    SystemProgram, Transaction, sendAndConfirmTransaction, type Connection
  } from "@solana/web3.js";
    import { getContext } from "svelte";
    import toast from "svelte-french-toast";
    import { get, type Writable } from "svelte/store";

  export const data = {} as { solana: Connection };
  let amount: number;
  let to = '';
  let disabled = false;
  const solana = getContext('solana') as Connection;
  const senderKp = get(getContext('keypair')) as Keypair;
  const balancePromise = getContext('balance') as Writable<Promise<number>>;
  async function send() {
    let isValidAddress = false;
    try { isValidAddress = PublicKey.isOnCurve(to) }
    catch { isValidAddress = false }
    if (!isValidAddress)
      return toast.error('Invalid address. Please enter a valid address.');

    const tx = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: senderKp.publicKey,
        toPubkey: new PublicKey(to),
        lamports: amount * LAMPORTS_PER_SOL,
      })
    );
    disabled = true;
    toast.promise(sendAndConfirmTransaction(solana, tx, [senderKp]), {
      loading: 'Sending...',
      success: 'Confirmed!',
      error: e => e.message,
    }).finally(() => disabled = false);
  }

</script>

<div class="flex flex-col h-screen">
  <main class="grow px-2 mt-2">
    <div class="grid grid-cols-1 mt-3 gap-2">
      <input bind:value={amount} type="number" placeholder="Enter an amount" class="input w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
      <input bind:value={to} placeholder="Enter address" class="input w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
    </div>
    <div class="grid grid-cols-1 mt-3">
      {#await $balancePromise}
        loading balance...
      {:then balance}
        <div class="stats pb-2">
          <div class="stat place-items-center">
            <div class="stat-title">Balance</div>
            <div class="stat-value">{balance / LAMPORTS_PER_SOL}</div>
          </div>
        </div>
      {:catch error}
        <div class="text-red-500">{error.message}</div>
      {/await}
      <button class="btn btn-primary" on:click={send} {disabled}>Send</button>
    </div>
  </main>
</div>

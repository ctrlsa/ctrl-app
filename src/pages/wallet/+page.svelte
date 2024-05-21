<script lang="ts">
  import { ArrowUpSquare, LogOut } from "lucide-svelte";
  import { toast } from "svelte-french-toast";
  import { 
    Keypair, LAMPORTS_PER_SOL, Connection 
  } from "@solana/web3.js";
  import { mnemonicToSeed, generateMnemonic } from "bip39";

  import Button from "$lib/ui/button/button.svelte";
  import { getContext } from "svelte";
  let restoring = false;
  const solana = getContext('solana') as Connection;

  let wallet = JSON.parse(localStorage.wallet ?? 'null');
  
  async function createAccount(mnemonic = generateMnemonic()) {
    const kp = Keypair.fromSeed((await mnemonicToSeed(mnemonic)).subarray(0, 32));
    
    localStorage.setItem('wallet', JSON.stringify({ ...kp, mnemonic }));
  }

  $: kp = wallet && Keypair.fromSecretKey(new Uint8Array(Object.values(wallet._keypair.secretKey)));
  $: balancePromise = wallet && solana.getBalance((kp as Keypair).publicKey);
  $: {
    if (kp)
      solana.onAccountChange(kp.publicKey, account => 
        balancePromise = Promise.resolve(account.lamports)
      );
  }

  function restoreOrCreateAcc(isRestore?: boolean) {
    const action = isRestore ? 'restore' : 'create';
    toast.promise(createAccount(isRestore && keyInput), {
      loading: `${action[0].toUpperCase()}${action.slice(1)}ing account...`,
      success: `Account ${action}d successfully`,
      error: `Failed to ${action} account`
    }).finally(() => {
      restoring = false
      wallet = JSON.parse(localStorage.wallet ?? 'null');
    });
  }
  
  let keyInput: any;
</script>

<svelte:head>
  <title>CTRL Wallet</title>
</svelte:head>
{#if restoring}
  <div class="flex flex-col h-screen">
    <main class="grow px-2 mt-2">
      <div class="grid grid-cols-1 mt-3">
        <textarea bind:value={keyInput} class="textarea textarea-bordered textarea-md w-full h-28"></textarea>
      </div>
      <div class="grid grid-cols-1 mt-3">
        <button class="btn btn-primary" on:click={() => restoreOrCreateAcc(true)}>Restore</button>
      </div>
    </main>
  </div>
{:else if wallet}
<!-- Balance-Action Block -->
<div class="grid justify-items-center pb-3 pt-2">
  {kp.publicKey}
  <!-- Wallet Balance -->
  <div class="stats pb-2">
    <div class="stat place-items-center">
      {#await balancePromise}
        loading...
      {:then balance} 
        <div class="stat-value">{balance / LAMPORTS_PER_SOL} SOL</div>
      {/await}
    </div>
  </div>

  <!-- Action buttons -->
  <div id="actions" class="py-2">
    <Button class="btn btn-primary" href="/wallet/send">
      <ArrowUpSquare />
      Send
    </Button>
    <!-- logout -->
    <Button class="btn btn-error" on:click={() => wallet = null}>
      <LogOut />
      Logout
    </Button>
    <!-- <Button class="btn btn-secondary" on:click={receive}>
      <ArrowDownSquare />
        Receive
    </Button> -->
  </div>
</div>
{:else}
  <div class="w-full mt-7 mb-5">
    <button class="btn btn-primary mr-2" on:click={() => restoreOrCreateAcc()}>New account</button>
    <button class="btn btn-neutral" on:click={() => restoring = true}>Restore account</button>
  </div>
{/if}
<script lang="ts">
  import "../app.css";

  import { onNavigate } from "$app/navigation";
  import { Toaster } from "svelte-french-toast";
  import { Connection, Keypair } from "@solana/web3.js";
  import { setContext } from "svelte";
  import { writable } from "svelte/store";

  onNavigate((navigation) => {
    if (!document.startViewTransition) return;

    return new Promise((resolve) => {
      document.startViewTransition(async () => {
        resolve();
        await navigation.complete;
      });
    });
  });
  const solana = new Connection('https://api.devnet.solana.com', 'confirmed');

  const balancePromise = writable();
  const keypair = writable();
  let wallet = JSON.parse(localStorage.wallet ?? 'null');
  $: balancePromise.set(wallet && solana.getBalance((kp as Keypair).publicKey));
  $: kp = wallet && Keypair.fromSecretKey(new Uint8Array(Object.values(wallet._keypair.secretKey)));
  $: keypair.set(kp);
  $: {
    kp && solana.onAccountChange(kp.publicKey, account =>     
      balancePromise.set(Promise.resolve(account.lamports))
    );
  }
  
  setContext('solana', solana);
  setContext('balance', balancePromise);
  setContext('wallet', wallet);
  setContext('keypair', keypair);

</script>

<div class="container">
  <slot />
</div>
<Toaster />
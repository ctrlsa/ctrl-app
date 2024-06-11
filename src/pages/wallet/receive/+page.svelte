<script lang="ts">
  import Button from "$shared/ui/button/button.svelte";
  import type { Keypair } from "@solana/web3.js";
    import WebApp from "@twa-dev/sdk";
  import { CheckIcon, CopyIcon } from "lucide-svelte";
  import { getContext, onMount } from "svelte";
  import { get } from "svelte/store";
  import Qrcode from "qrcode";

  const senderKp = get(getContext('keypair')) as Keypair;
  let canvas: HTMLCanvasElement;
  function copy() {
    navigator.clipboard.writeText(senderKp.publicKey.toString());
    WebApp.showPopup({ message: 'Copied to clipboard!' });
  }
  onMount(() => {
    Qrcode.toCanvas(canvas, senderKp.publicKey.toString());
  });

</script>
<p class="break-all text-center">
  {senderKp.publicKey}
  <Button on:click={copy} class="btn btn-square btn-xs align-top">
    <CopyIcon />
  </Button>
</p>
<canvas class="m-auto" bind:this={canvas} />

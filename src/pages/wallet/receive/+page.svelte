<script lang="ts">
  import Button from "$shared/ui/button/button.svelte";
  import type { Keypair } from "@solana/web3.js";
  import WebApp from "@twa-dev/sdk";
  import { CopyIcon } from "lucide-svelte";
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
  <!-- svelte-ignore a11y-missing-attribute -->
  <a role="button" on:keydown={copy} tabindex="-1" on:click={copy}>{senderKp.publicKey}</a>
  <Button on:click={copy} class="btn btn-square btn-xs align-top">
    <CopyIcon />
  </Button>
</p>
<canvas on:click={copy} class="m-auto" bind:this={canvas} />

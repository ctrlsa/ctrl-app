<script lang="ts">
  import Button from "$shared/ui/button/button.svelte";
  import type { Keypair } from "@solana/web3.js";
  import WebApp from "@twa-dev/sdk";
  import { CopyIcon, Share2Icon } from "lucide-svelte";
  import { getContext, onMount } from "svelte";
  import { get } from "svelte/store";
  import Qrcode from "qrcode";
  import toast from "svelte-french-toast";

  const senderKp = get(getContext('keypair')) as Keypair;
  $: kp = senderKp.publicKey.toString();
  let canvas: HTMLCanvasElement;
  function copy() {
    navigator.clipboard.writeText(kp);
    toast.success('Copied to clipboard!');
  }
  onMount(() => Qrcode.toCanvas(canvas, kp));

</script>
<div class="break-all text-center w-2/3 m-auto">
  <canvas on:click={copy} class="m-auto" bind:this={canvas} />
  <!-- svelte-ignore a11y-missing-attribute -->
  <a role="button" on:keydown={copy} tabindex="-1" on:click={copy}>{senderKp.publicKey}</a>
</div>
<div class="flex justify-around">
  <div class="flex flex-col items-center mt-4">
    <Button on:click={copy} class="btn btn-circle align-top">
      <CopyIcon />
    </Button>
    Copy
  </div>
  
  <div class="flex flex-col items-center mt-4">
    <Button class="btn btn-circle align-top" on:click={
      () => WebApp.openTelegramLink(`https://t.me/share/url?url=${kp}`)
    }>
      <Share2Icon />
    </Button>
    Share
  </div>
</div>

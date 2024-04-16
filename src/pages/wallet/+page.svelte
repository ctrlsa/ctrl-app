<script>
  import { ArrowDownSquare, ArrowUpSquare, Repeat2 } from "lucide-svelte";

  import Button from "$lib/ui/button/button.svelte";
</script>

<svelte:head>
  <title>CTRL Wallet</title>
</svelte:head>

<!-- Balance-Action Block -->
<div class="grid justify-items-center pb-3 pt-2">
  <!-- Wallet Balance -->
  <div class="stats pb-2">
    <div class="stat place-items-center">
      <!-- Balance in chosen currency -->
      <div class="stat-value">$89,375</div>
      <!-- Balance in chosen crypto (e.g BTC) -->
      <div class="stat-title mt-1">~2.70451 BTC</div>
    </div>
  </div>

  <!-- Action buttons -->
  <div id="actions" class="py-2">
    <Button class="btn btn-primary">
      <ArrowUpSquare />
      Send
    </Button>
    <Button class="btn btn-secondary">
      <ArrowDownSquare />
      Receive
    </Button>
    <Button class="btn btn-secondary">
      <Repeat2 />
    </Button>
  </div>
</div>

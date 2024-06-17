<script>
  import { ChevronDown, ScanLine } from "lucide-svelte";
  import Button from "$lib/ui/button/button.svelte";
</script>

<nav class="navbar sticky top-0 z-10 bg-base-100">
  <div class="navbar-start">
    <div class="dropdown ml-4">
      <Button href="/wallet" class="btn btn-ghost m-0 p-0 text-2xl normal-case">
        Solana
        <ChevronDown class="text-neutral-500" />
      </Button>
    </div>
  </div>
</nav>

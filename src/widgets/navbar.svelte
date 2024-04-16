<script>
  import { ChevronDown, ScanLine } from "lucide-svelte";

  import Button from "$lib/ui/button/button.svelte";
</script>

<nav class="navbar sticky top-0 z-10 bg-base-100">
  <div class="navbar-start">
    <div class="dropdown">
      <Button href="/wallet" class="btn btn-ghost m-0 p-0 text-2xl normal-case">
        Wallet 1
        <ChevronDown class="text-neutral-500" />
      </Button>
    </div>
  </div>
  <div class="navbar-end">
    <Button class="btn btn-circle btn-ghost btn-md">
      <ScanLine class="h-7 w-7 text-primary" />
    </Button>
  </div>
</nav>

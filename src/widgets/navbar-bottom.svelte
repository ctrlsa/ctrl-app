<script>
  import { Calculator, LayoutGrid, Nfc, Wallet } from "lucide-svelte";

  import { page } from "$app/stores";
  import settingsIcon from "$lib/assets/icons/settings.svelte";
  import walletIcon from "$lib/assets/icons/wallet.svelte";

  const paths = [
    { name: walletIcon, className: "h-6 w-6", path: "/wallet" },
    { name: LayoutGrid, className: "h-7 w-7", path: "/about" },
    { name: Nfc, className: "h-7 w-7", path: "/contacts" },
    { name: settingsIcon, className: "h-8 w-8", path: "/settings" }
  ];
</script>

<nav class="container btm-nav btm-nav-md mx-auto">
  {#each paths as { name, className, path }}
    {@const active = $page.url.pathname === path ? "page" : null}
    {@const activeClass = $page.url.pathname === path ? "text-primary" : null}
    {@const activeBgClass = $page.url.pathname === path ? "bg-neutral" : null}
    <a aria-current={active} href={path} class={activeBgClass}>
      <svelte:component this={name} class="{className} {activeClass}" />
    </a>
  {/each}
</nav>

<style>
</style>

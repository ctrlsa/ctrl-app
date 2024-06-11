<script>
  import Navbar from "$widgets/navbar.svelte";
  import NavbarBottom from "$widgets/navbar-bottom.svelte";
</script>

<Navbar />
<div class="relative p-2">
  <slot />
</div>
<NavbarBottom />

<script>
  import { goto } from "$app/navigation";
  import { page } from "$app/stores";
  import WebApp from "@twa-dev/sdk";

  /*
    Redirect to Wallet page
    @TODO Think about the proper place for this type of actions
  */
  localStorage.setItem('init', WebApp.initData)
  localStorage.setItem('init_unsafe', JSON.stringify(WebApp.initDataUnsafe));
  goto(`/wallet?${new URLSearchParams($page.url.searchParams.toString())}`, { replaceState: true });
</script>

<script>
  import { goto } from "$app/navigation";

  /*
    Redirect to Wallet page
    @TODO Think about the proper place for this type of actions
  */
  goto("/wallet", { replaceState: true });
</script>

<script>
  import { fly } from "svelte/transition";
  import { alert } from "../Store/index.js";

  function closeAlert() {
    alert.set({
      text: $alert.text,
      isActive: false,
      status: $alert.status,
    });
  }

  alert.subscribe((value) => {
    if (value.isActive) {
      setTimeout(closeAlert, 2000);
    }
  });
</script>

{#if $alert.isActive}
  <div
    on:click={closeAlert}
    transition:fly={{ y: 100 }}
    class="toast {$alert.status}"
  >
    <p>{$alert.text}</p>
  </div>
{/if}

<style>
  .toast {
    background-color: var(--button);
    color: var(--textColor);
    border-radius: var(--border-radius);
    padding: 20px;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
      0 2px 4px -1px rgba(0, 0, 0, 0.06);
    position: fixed;
    bottom: 10px;
    left: 10px;
    right: 10px;
    width: clamp(330px, 55vw, 800px);
    margin: 0 auto;
    z-index: 3;
  }

  .toast p {
    text-align: center;
    margin: 0;
    max-width: 100%;
    font-size: clamp(15px, 2vw, 18px);
    font-weight: bold;
    letter-spacing: 1px;
  }
  .success {
    background-color: var(--greenColor);
    color: var(--whiteColor);
  }
  .fail {
    background-color: var(--redColor);
    color: var(--whiteColor);
  }
</style>

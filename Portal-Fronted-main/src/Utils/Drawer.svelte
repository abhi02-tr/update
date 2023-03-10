<script>
  import { fly } from "svelte/transition";
  export let close;
</script>

<div class="drawer-bg">
  <div class="drawer" transition:fly={{ y: 100, duration: 400 }}>
    <div class="heading">
      <h2>Select Package</h2>
 
    </div>
    <slot />
  </div>
  <div class="close-bg" on:click={close} />
</div>

<style>
  .drawer-bg {
    position: fixed;
    inset: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 2;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .close-bg {
    position: fixed;
    inset: 0;
    width: 100%;
    height: 100vh;
    z-index: 3;
    overflow: hidden;
    backdrop-filter: blur(5px);
  }

  .drawer {
    width: 40%;
    /* height: fit-content; */
    background-color: var(--whiteColor);

    color: var(--blackColor);
    border-radius: var(--border-radius);
    padding: 1rem;
    z-index: 5;
    position: relative;
  
  }
  .heading {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
    color: var(--clackColor);
  }



  @media only screen and (max-width: 865px) {
    .drawer-bg {
      display: flex;
      flex-direction: column;
      align-items: stretch;
      justify-content: flex-end;
    }
    .drawer {
      width: 100%;
      border-radius: 0;
    
      border-top-right-radius: var(--border-radius);
      border-top-left-radius: var(--border-radius);
    }
  }
</style>

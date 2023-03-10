<script>
  import { navigate } from "svelte-navigator";
  import { isLogin, singleState, comboEvents,alert } from "../../Store";

  $: selectSingleEvent = {};

  function registerStudent() {
    if ($singleState.name == "") {
      alert.set({
        text: "Please Select event",
        isActive: true,
        status: "fail",
      });
    } else {
    
      navigate("/confirm-registration");
    }
   
  }
</script>

{#if $isLogin}
  <div class="form-css">
    <form on:submit|preventDefault={registerStudent}>
      <label> Tech event </label>
      <select
        name="event"
        id="event"
        on:change={(e) => {
          selectSingleEvent = JSON.parse(e.target.value);

          $singleState.name = selectSingleEvent.name;
          $singleState.event_fee = selectSingleEvent.event_fee;
          $singleState.max_limit = selectSingleEvent.max_limit;
          $singleState.member = Array(selectSingleEvent.team_members - 1);
         
        }}
      >
        <option value="">Select</option>
        {#each $comboEvents.tech as event}
          <option value={JSON.stringify(event)}>{event.name}</option>
        {/each}
      </select>

      {#if selectSingleEvent.team_members > 1}
        {#each Array(selectSingleEvent.team_members - 1) as temp, i}
          <label for={`team_member ${i}`}
            >Team Member {i + 1} {`(${selectSingleEvent.name})`}</label
          >
          <input
            type="text"
            name={`team_member ${i}`}
            id={`team_member ${i}`}
            bind:value={$singleState.member[i]}
            required
          />
        {/each}
      {/if}
      <div class="button-container">
        <button class="outline-btn" on:click={() => navigate("/")}
          >Cancel</button
        >

        <button class="selected-btn" on:submit={registerStudent} type="submit"
          >Confirm</button
        >
      </div>
    </form>
  </div>


{:else}
  {navigate("/")}
{/if}



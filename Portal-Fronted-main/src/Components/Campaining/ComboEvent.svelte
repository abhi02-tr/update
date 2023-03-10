<script>
  import { navigate } from "svelte-navigator";

  import { comboEvents, comboState, alert, isLogin } from "../../Store";
  //   import Drawer from "../../Utils/Drawer.svelte";
  $: selectedEvent1 = {};
  $: selectedEvent2 = {};
  $: selectedEvent3 = {};
  function registerStudent() {
    if (
      $comboState.event1.name == "" ||
      $comboState.event2.name == "" ||
      $comboState.event3.name == ""
    ) {
      alert.set({
        text: "Please Select all events",
        isActive: true,
        status: "fail",
      });
    } else {
      navigate("/confirm-combo-registration");
    }
 
  }
</script>

{#if $isLogin}
  <div class="form-css">
    <form on:submit|preventDefault={registerStudent}>
      <label> Tech event 1</label>
      <select
        name="event-1"
        id="event-1"
        on:change={(e) => {
          selectedEvent1 = JSON.parse(e.target.value);
          $comboState.event1.name = selectedEvent1.name;
          $comboState.event1.max_limit = selectedEvent1.max_limit;
          $comboState.event1._id = selectedEvent1._id;
          $comboState.event1.member = Array(selectedEvent1.team_members - 1);
       
        }}
      >
        <option value="">Select</option>
        {#each $comboEvents.tech as event}
          <option value={JSON.stringify(event)}>{event.name}</option>
        {/each}
      </select>

      {#if selectedEvent1.team_members > 1}
        {#each Array(selectedEvent1.team_members - 1) as temp, i}
          <label for={`team_members ${i}`}
            >Team Member {i + 1} {`(${selectedEvent1.name})`}</label
          >
          <input
            type="text"
            name={`team_members ${i}`}
            id={`team_members ${i}`}
            bind:value={$comboState.event1.member[i]}
            required
          />
        {/each}
      {/if}

      <label> Tech event 2</label>
      <select
        name="event-2"
        id="event-2"
        on:change={(e) => {
          selectedEvent2 = JSON.parse(e.target.value);
          $comboState.event2.name = selectedEvent2.name;
          $comboState.event2.max_limit = selectedEvent2.max_limit;
          $comboState.event2._id = selectedEvent2._id;
          $comboState.event2.member = Array(selectedEvent2.team_members - 1);
       
        }}
      >
        <option value="">Select</option>
        {#each $comboEvents.tech as event}
          <option value={JSON.stringify(event)}>{event.name} </option>
        {/each}
      </select>

      {#if selectedEvent2.team_members > 1}
      
        {#each Array(selectedEvent2.team_members - 1) as temp, i}
          <label for={`team_member ${i}`}
            >Team Member {i + 1} {`(${selectedEvent2.name})`}</label
          >
          <input
            type="text"
            name={`team_member ${i}`}
            id={`team_member ${i}`}
            bind:value={$comboState.event2.member[i]}
            required
          />
        {/each}
      {/if}

      <label>Non Tech event </label>
      <select
        name="event-3"
        id="event-3"
        on:change={(e) => {
          selectedEvent3 = JSON.parse(e.target.value);
          $comboState.event3.name = selectedEvent3.name;

          $comboState.event3.max_limit = selectedEvent3.max_limit;
          $comboState.event3._id = selectedEvent3._id;
          $comboState.event3.member = Array(selectedEvent3.team_members - 1);
          
        }}
      >
        <option value="">Select</option>
        {#each $comboEvents.nontech as event}
          <option value={JSON.stringify(event)}>{event.name}</option>
        {/each}
      </select>

      {#if selectedEvent3.team_members > 1}
       
        {#each Array(selectedEvent3.team_members - 1) as temp, i}
          <label for={`team_member ${i}`}
            >Team Member {i + 1} {`(${selectedEvent3.name})`}</label
          >
          <input
            type="text"
            name={`team_member ${i}`}
            id={`team_member ${i}`}
            bind:value={$comboState.event3.member[i]}
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

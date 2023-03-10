<script>
  import { onMount } from "svelte";

  import { navigate } from "svelte-navigator";
  import {
    isLogin,
    user,
    fetchURL,
    alert,
    student,
    singleState,
  } from "../../Store";


  $: payment = false;
  $: eventLimit = 0;
  onMount(async () => {
    let data = await fetch(`${fetchURL}/api/get-count`, {
      method: "POST",
      credentials: "include",
      body: JSON.stringify({
        event_name: $singleState.name,
        email: $student.email,
      }),
      headers: { "Content-type": "application/json;charset=UTF-8" },
    });
    data = await data.json();
    if (data.success) {
      eventLimit = $singleState.max_limit - data.count;
    } else {
      alert.set({
        text: data.data,
        isActive: true,
        status: "fail",
      });
      navigate("/")
    }
  });

  async function registerStudent() {

    const singleRegisterButton = document.getElementById('singleRegisterButton')
    singleRegisterButton.disabled = true;
    if (payment) {
    
      if (eventLimit > 0) {
      
        const data = await fetch(`${fetchURL}/api/single-event-registration`, {
          method: "POST",
          credentials: "include",
          body: JSON.stringify({
            event: $singleState,
            student: $student,
            campaigner: $user,
            team_member: $singleState.member,
          }),
          headers: { "Content-type": "application/json;charset=UTF-8" },
        });
        const res = await data.json();
        if (res.success) {
          // confirmRegisterDrawer.set(false);
          alert.set({
            text: "Student Registered Successfully",
            isActive: true,
            status: "success",
          });
          navigate("/");
        } else {
          alert.set({
            text: "Student Registration Fail",
            isActive: true,
            status: "fail",
          });
          singleRegisterButton.disabled = false;
        }
      } else {
        alert.set({
          text: "This Event is full !! Please select Other",
          isActive: true,
          status: "fail",
        });
        singleRegisterButton.disabled = false;
      }
    } else {
      alert.set({
        text: "Please take payment first",
        isActive: true,
        status: "fail",
      });
      singleRegisterButton.disabled = false;
    }
  }
</script>

{#if $isLogin}
  <div class="form-css">
    <h2>Confirmation Page</h2>
    <div class="student-details">
      <label for="name">Name</label>
      <input type="text" name="name" id="name" bind:value={$student.name} disabled />
      <label for="email">Email</label>
      <input type="email" name="email" id="email" bind:value={$student.email} disabled />
      <label for="number">Mobile Number</label>
      <input
        type="number"
        name="number"
        id="number"
        bind:value={$student.mobile_number}
        disabled
      />
      <label for="collage">Collage</label>
      <input
        type="text"
        name="collage"
        id="collage"
        bind:value={$student.collage}
        disabled
      />
      <label for="department">Enrollment No</label>
      <input
        type="text"
        name="department"
        id="department"
        bind:value={$student.enrollment_number}
        disabled
      />
    </div>
    <div class="event-details">
      <label for="event_name"
        >Tech Event{`(${
          eventLimit > 0
            ? `Remaining slots ${eventLimit}`
            : "This Event is full"
        })`}</label
      >
      <input
        type="text"
        name="event_name"
        id="event_name"
        bind:value={$singleState.name}
        disabled
      />
      <label for="event_fee">Event Fee</label>
      <input
        type="number"
        name="event_fee"
        id="event_fee"
        bind:value={$singleState.event_fee}
        disabled
      />
      <label for="members">Total Member (including student)</label>
      <input
        type="number"
        name="members"
        id="members"
        value={$singleState?.member?.length + 1}
        disabled
      />
    </div>
    {#if $singleState?.member?.length > 0}
      {#each $singleState.member as member, i}
        <label for={`team_member ${i}`}>
          {$singleState.name} Team Member {i + 1}</label
        >
        <input
          type="text"
          name="team-member"
          id="team-member"
          bind:value={member}
          disabled
        />
      {/each}
    {/if}
    <div class="payment">
      <input
        type="checkbox"
        name="payment"
        id="payment"
        bind:checked={payment}
      />
      <label for="payment" style="display: inline;">Payment Accepted</label>
    </div>

    <form on:submit|preventDefault={registerStudent}>
      <!-- {#each Array(groupInput) as temp, i}
        <label for={`team_member ${i}`}>Team Member {i + 1}</label>
        <input
          type="text"
          name={`team_member ${i}`}
          id={`team_member ${i}`}
          bind:value={team_member[i]}
          required
        />
      {/each} -->
      <div class="button-container">
        <button class="outline-btn" on:click={() => navigate("/")}
          >Cancel</button
        >
        <button class="selected-btn" id="singleRegisterButton" on:submit={registerStudent} type="submit"
          >Register</button
        >
      </div>
    </form>
  </div>
{:else}
  {navigate("/")}
{/if}

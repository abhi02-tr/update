<script>
  import { navigate } from "svelte-navigator";
  import { onMount } from "svelte";
  import {
    isLogin,
    confirmRegisterDrawer,
    user,
    fetchURL,
    alert,
    student,
    registerEvent,
    comboState,
  } from "../../Store";

  $: groupInput = 0;

  $: payment = false;

  $: event1Limit = 0;
  $: event2Limit = 0;
  $: event3Limit = 0;

  onMount(async () => {
    if ($registerEvent.team_member - 1 > 0) {
      groupInput = $registerEvent.team_member - 1;
      team_member = Array(groupInput);
    }

    //get limit of events
    let data1 = await fetch(`${fetchURL}/api/get-count`, {
      method: "POST",
      credentials: "include",
      body: JSON.stringify({
        event_name: $comboState.event1.name,
        email: $student.email,
      }),
      headers: { "Content-type": "application/json;charset=UTF-8" },
    });
    data1 = await data1.json();

    if (data1.success) {
      event1Limit = $comboState.event1.max_limit - data1.count;
    } else {
      alert.set({
        text: data1.data,
        isActive: true,
        status: "fail",
      });
      navigate("/");
    }
    let data2 = await fetch(`${fetchURL}/api/get-count`, {
      method: "POST",
      credentials: "include",
      body: JSON.stringify({
        event_name: $comboState.event2.name,
        email: $student.email,
      }),
      headers: { "Content-type": "application/json;charset=UTF-8" },
    });
    data2 = await data2.json();
    if (data2.success) {
      event2Limit = $comboState.event2.max_limit - data2.count;
    } else {
      alert.set({
        text: data2.data,
        isActive: true,
        status: "fail",
      });
      navigate("/");
    }

    let data3 = await fetch(`${fetchURL}/api/get-count`, {
      method: "POST",
      credentials: "include",
      body: JSON.stringify({
        event_name: $comboState.event3.name,
        email: $student.email,
      }),
      headers: { "Content-type": "application/json;charset=UTF-8" },
    });
    data3 = await data3.json();
    if (data3.success) {
      event3Limit = $comboState.event3.max_limit - data3.count;
    } else {
      alert.set({
        text: data3.data,
        isActive: true,
        status: "fail",
      });
      navigate("/");
    }
  });

  async function registerStudent() {
    const comboRegisterButton = document.getElementById("comboRegisterButton");
    comboRegisterButton.disabled = true;
    //check payment
    if (payment) {
      //check event full or not
      if (event1Limit > 0 && event2Limit > 0 && event3Limit > 0) {
        const data = await fetch(`${fetchURL}/api/combo-event-registration`, {
          method: "POST",
          credentials: "include",
          body: JSON.stringify({
            student: $student,
            campaigner: $user,
            comboState: $comboState,
          }),
          headers: { "Content-type": "application/json;charset=UTF-8" },
        });
        const res = await data.json();
        if (res.success) {
          confirmRegisterDrawer.set(false);
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
          comboRegisterButton.disabled = false;
        }
      } else {
        alert.set({
          text: "Event is Full... please Select another combo Or select single one",
          isActive: true,
          status: "fail",
        });
        comboRegisterButton.disabled = false;
      }
    } else {
      alert.set({
        text: "Please take payment first",
        isActive: true,
        status: "fail",
      });
      comboRegisterButton.disabled = false;
    }
  }
</script>

{#if $isLogin}
  <div class="form-css">
    <h2>Confirmation Page</h2>
    <div class="student-details">
      <label for="name">Name</label>
      <input
        type="text"
        name="name"
        id="name"
        bind:value={$student.name}
        disabled
      />
      <label for="email">Email</label>
      <input
        type="email"
        name="email"
        id="email"
        bind:value={$student.email}
        disabled
      />
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
        >Tech Event 1{`(${
          event1Limit > 0 ? `Remaining slots ${event1Limit}` : "Event is full"
        })`}</label
      >
      <input
        type="text"
        name="event_name"
        id="event_name"
        bind:value={$comboState.event1.name}
        disabled
      />
      {#if $comboState.event1.member.length > 0}
        {#each $comboState.event1.member as member, i}
          <label for={`team_member ${i}`}>
            {$comboState.event1.name} Team Member {i + 1}</label
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

      <label for="event_name"
        >Tech Event 2{`(${
          event2Limit > 0
            ? `Remaining slots ${event2Limit}`
            : "This Event is full"
        })`}</label
      >
      <input
        type="text"
        name="event_name"
        id="event_name"
        bind:value={$comboState.event2.name}
        disabled
      />
      {#if $comboState.event2.member.length > 0}
        {#each $comboState.event2.member as member, i}
          <label for={`team_member ${i}`}>
            {$comboState.event2.name} Team Member {i + 1}</label
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

      <label for="event_name"
        >Non Tech Event{`(${
          event3Limit > 0
            ? `Remaining slots ${event3Limit}`
            : "This Event is full"
        })`}</label
      >
      <input
        type="text"
        name="event_name"
        id="event_name"
        bind:value={$comboState.event3.name}
        disabled
      />
      {#if $comboState.event3.member.length > 0}
        {#each $comboState.event3.member as member, i}
          <label for={`team_member ${i}`}>
            {$comboState.event3.name} Team Member {i + 1}</label
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
    </div>
    <form on:submit|preventDefault={registerStudent}>
      <div class="button-container">
        <button class="outline-btn" on:click={() => navigate("/")}
          >Cancel</button
        >
        <button
          class="selected-btn"
          on:submit={registerStudent}
          id="comboRegisterButton"
          type="submit">Register</button
        >
      </div>
    </form>
  </div>
{:else}
  {navigate("/")}
{/if}

<style>
  .payment {
    margin: 15px auto;
  }
</style>

<script>
  import { navigate } from "svelte-navigator";

  import {
    user,
    drawerAction,
    alert,
    isLogin,
    fetchURL,
    selectEventMode,
    isCombo,
    comboEvents,
  } from "../../Store/index.js";
  import Drawer from "../../Utils/Drawer.svelte";
  import { slide } from "svelte/transition";
  import { onMount } from "svelte";

  onMount(async () => {
    if (!$isLogin) {
      const res = await fetch(`${fetchURL}/api/check-user`, {
        method: "POST",
        credentials: "include",
      });
      const data = await res.json();

      if (data.success) {
        user.set(data.data);
        comboEvents.set({
          tech: data.techEvents,
          nontech: data.nontechEvents,
        });

        isLogin.set(true);
        selectEventMode.set(true);
        // navigate("/events");
      } else {
        isLogin.set(false);
      }
    }
  });

  let otp = "";
  let email = "";
  async function checkLogin() {
    const loginButton = document.getElementById("loginButton");
    loginButton.disabled = true;
    const data = await fetch(`${fetchURL}/api/login`, {
      method: "POST",
      credentials: "include",
      body: JSON.stringify({
        email: email,
      }),
      headers: { "Content-type": "application/json;charset=UTF-8" },
    });
    const res = await data.json();

    if (res.success) {
      user.set(res.data);
      $drawerAction.generateOtp = true;
    } else {
      navigate("/");
      alert.set({
        text: "You don't have access",
        isActive: true,
        status: "fail",
      });
      loginButton.disabled = false;
    }
  }
  async function checkVerify() {
    const verifyButton = document.getElementById('verifyButton');
    verifyButton.disabled = true;
    const data = await fetch(`${fetchURL}/api/verify-otp`, {
      method: "POST",
      credentials: "include",
      body: JSON.stringify({
        _id: $user._id,
        email,
        otp,
      }),
      headers: { "Content-type": "application/json;charset=UTF-8" },
    });
    const res = await data.json();
    console.log('res:', res)

    if (res.success) {
      comboEvents.set({
        tech: res.techEvents,
        nontech: res.nontechEvents,
      });
      console.log('comboEvents:', $comboEvents)
      isLogin.set(true);

      selectEventMode.set(true);
    } else {
      navigate("/");
      alert.set({
        text: "Wrong OTP",
        isActive: true,
        status: "fail",
      });
      verifyButton.disabled = false;
    }
  }
</script>

<div class="center">
  <div class="login">
    <form on:submit|preventDefault={checkLogin}>
      <label for="email"> Enter your email </label>
      <input type="email" name="email" id="email" bind:value={email} required />

      {#if !$drawerAction.generateOtp}
        <div class="button-container">
          <input
            type="submit"
            class="selected-btn full-width"
            id="loginButton"
            value="Submit"
          />
        </div>
      {/if}
    </form>

    {#if $drawerAction.generateOtp}
      <div transition:slide>
        <form on:submit|preventDefault={checkVerify}>
          <label for="otp"> OTP</label>
          <input type="number" name="otp" id="otp" bind:value={otp} required />
          <div class="button-container">
            <input type="submit"     value="Submit" class="selected-btn full-width" id="verifyButton" />
          </div>
        </form>
      </div>
    {/if}
  </div>
</div>

{#if $selectEventMode}
  <Drawer>
    <div class="button-container">
      <button
        class="selected-btn"
        on:click={() => {
          isCombo.set(true);
          navigate("/existing-student");
        }}>Combo Events</button
      >
      <button
        class="selected-btn"
        on:click={() => {
          isCombo.set(false);
          navigate("/existing-student");
        }}>Single Events</button
      >
    </div>
  </Drawer>
{/if}

<style>
  .center {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 90vh;
    flex-direction: column;
  }
  .login {
    background-color: white;
    border-radius: var(--border-radius);
    padding: clamp(10px, 3vw, 20px);
    width: clamp(325px, 50%, 700px);
  }
</style>

<script>
  import { navigate } from "svelte-navigator";

  import { isLogin, existingStudents, student, isCombo } from "../../Store";

  function confirmRegister(data) {
    //add participate in state
    student.set(data);
   
    navigate($isCombo ? "/combo-events" : "/events");
  }
</script>

{#if $isLogin}
  <div class="existing-students">
    <div class="heading">
      <h2 class="title">Existing student</h2>
      <button
        class="selected-btn full-width"
        on:click={() => {
          navigate("/add-student");
        }}>Add Student</button
      >
    </div>
    <div class="students-container">
      {#each $existingStudents as student}
        <div class="existing-student" on:click={() => confirmRegister(student)}>
          <label class="student_name" for={`${student.name}`}
            >{student.name}</label
          >
        </div>
      {/each}
    </div>
  </div>
{:else}
  {navigate("/")}
{/if}

<style>
  .existing-students {
    background-color: white;
    width: clamp(300px, 70%, 800px);
    margin: 20px auto;
    padding: 20px;
    border-radius: var(--border-radius);
  }
  .student_name {
    border: 1px solid var(--primaryColor);
    text-align: center;
    border-radius: var(--border-radius);
    padding: 15px 0;
    cursor: pointer;
  }
</style>

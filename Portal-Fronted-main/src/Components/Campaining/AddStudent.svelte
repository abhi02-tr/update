<script>
  import { navigate } from "svelte-navigator";

  import { alert, collages, existingStudents, isLogin } from "../../Store";

  let student = {
    name: "",
    email: "",
    mobile_number: null,
    collage: "",
    enrollment_number: "",
  };

  //load from local storage
  function addStudent() {
    let test =
      /^((\+[1-9]{1,4}[ \-]*)|(\([0-9]{2,3}\)[ \-]*)|([0-9]{2,4})[ \-]*)*?[0-9]{3,4}?[ \-]*[0-9]{3,4}?$/;

    if (
      !test.test(student.mobile_number) ||
      student.mobile_number.toString().length != 10 ||
      student.collage == ""
    ) {
      alert.set({
        text: "Please fill details properly",
        isActive: true,
        status: "fail",
      });
    } else {
      $existingStudents.unshift(student);

      localStorage.setItem(
        "existing-students",
        JSON.stringify($existingStudents)
      );

      alert.set({
        text: "Student Added Successfully",
        isActive: true,
        status: "success",
      });

      navigate("/existing-student");
    }
  }
</script>

{#if $isLogin}
  <div class="form-css">
    <h2>Add Students Here</h2>
    <form on:submit|preventDefault={addStudent}>
      <label for="name">Name</label>
      <input
        type="text"
        name="name"
        bind:value={student.name}
        id="name"
        required
      />

      <label for="email">Email</label>
      <input
        type="email"
        name="email"
        bind:value={student.email}
        id="email"
        required
      />

      <label for="number">Mobile No</label>
      <input
        type="number"
        name="number"
        bind:value={student.mobile_number}
        id="number"
        required
      />
      <label for="department">Enrollment No</label>
      <input
        type="text"
        name="department"
        bind:value={student.enrollment_number}
        id="department"
        required
      />

      <label> Collage </label>
      <select
        name="collages"
        id="collages"
        on:change={(e) => {
          student.collage = e.target.value;
        }}
      >
        <option value="">Select</option>
        {#each collages as collage}
          <option value={collage}>{collage}</option>
        {/each}
      </select>

      <div class="button-container">
        <button
          class="outline-btn"
          on:click={() => navigate("/existing-student")}>Cancel</button
        >
        <button class="selected-btn" type="submit">Add Student</button>
      </div>
    </form>
  </div>
{:else}
  {navigate("/")}
{/if}

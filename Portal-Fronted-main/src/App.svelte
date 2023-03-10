<script>
  import { Router, Route } from "svelte-navigator";
  import AddStudent from "./Components/Campaining/AddStudent.svelte";
  import CampaignEvent from "./Components/Campaining/CampaignEvent.svelte";
  import ComboEvent from "./Components/Campaining/ComboEvent.svelte";
  import ConfirmComboRegistration from "./Components/Campaining/ConfirmComboRegistration.svelte";
  import ConfirmRegistration from "./Components/Campaining/ConfirmRegistration.svelte";
  import ExistingStudent from "./Components/Campaining/ExistingStudent.svelte";
  import Header from "./Components/Campaining/Header.svelte";
  import Login from "./Components/Campaining/Login.svelte";
import NotFound from "./Utils/NotFound.svelte";
  import Toast from "./Utils/Toast.svelte";

  //to run background in run..... code there
  //pop item every 10mins
  if (localStorage.getItem("existing-students") && JSON.parse(localStorage.getItem("existing-students")).length > 0) {
    setInterval(function () {
      console.log(localStorage.getItem("existing-students"));
      let localstudent = JSON.parse(localStorage.getItem("existing-students"));
      localstudent.pop();
      localStorage.setItem("existing-students", JSON.stringify(localstudent));
      console.log(localStorage.getItem("existing-students"));
    }, 600000);
  }
</script>

<Router primary={false}>
  <div>
    <Header />
    <Route path="/" component={Login} exact />
    <Route path="/events" component={CampaignEvent} exact />
    <Route path="/combo-events" component={ComboEvent} exact />
    <Route path="/existing-student" component={ExistingStudent} exact />
    <Route path="/add-student" component={AddStudent} exact />
    <Route path="/confirm-registration" component={ConfirmRegistration} exact />
    <Route
      path="/confirm-combo-registration"
      component={ConfirmComboRegistration}
      exact
    />
    <Route path='/*' component={NotFound}/>
    <Toast />
  </div>
</Router>

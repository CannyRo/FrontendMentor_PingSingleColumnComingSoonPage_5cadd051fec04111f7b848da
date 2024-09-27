function app() {
  //Get DOM variables and container
  const formNode = document.getElementById("myForm");
  const inputNode = document.getElementById("myEmail");
  const errorNode = document.getElementById("myError");
  let message = "";
  let countError = 0;

  //Call or run the Init function
  Init();
  // Functions
  //// => Sequence of functions with listener onChange and onSubmit
  function Init() {
    console.log("App on");
    message = "";
    controlOnChange();
    controlOnSubmit();
  }
  //// => Check if an HTML element like input is empty or not
  function isEmpty(node) {
    if (
      node.value !== null &&
      node.value !== undefined &&
      node.value.trim() !== ""
    ) {
      return false;
    }
    return true;
  }
  //// => Check if a value is an emain or not
  function isEmail(value) {
    const emailRegex =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/i;
    if (value.match(emailRegex)) {
      return true;
    }
    return false;
  }
  //// => Show error by adding CSS class
  function showError(message) {
    errorNode.textContent = message;
    errorNode.classList.add("error-visible");
    inputNode.classList.add("email-error");
  }
  //// => Hide error by remove CSS class
  function cleanError() {
    inputNode.classList.contains("email-error") &&
      inputNode.classList.remove("email-error");
    errorNode.classList.contains("error-visible") &&
      errorNode.classList.remove("error-visible");
    message = "";
    countError = 0;
  }
  //// => Sequence of isEmpty(), isEmail(), cleanError()
  function controlAndShowError(node) {
    if (isEmpty(node)) {
      message = "Email Address cannot be empty";
      showError(message);
      countError++;
      return;
    }
    if (!isEmail(node.value)) {
      message = "Please provide a valid email address";
      showError(message);
      countError++;
      return;
    }
    cleanError();
  }
  //// => Run the control sequence on change
  function controlOnChange() {
    formNode.addEventListener("keyup", (e) => {
      controlAndShowError(inputNode);
    });
  }
  //// => Run the control sequence on submit
  function controlOnSubmit() {
    formNode.addEventListener("submit", (e) => {
      controlAndShowError(inputNode);
      if (countError > 0) {
        e.preventDefault();
      }
    });
  }
}
window.addEventListener("load", app);

// Assignment code here
var PasswordGenerator = {
  characterSets: {
    lowercase: "abcdefghijklmnopqrstuvwxyz",
    uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    numerals: "0123456789",
    special: " !\"#$%&'()*+,-./:;<=>?@[\]^_`{|}~"
  },
  passwordTextarea: null,
  init(passwordTextarea) {
    this.passwordTextarea = passwordTextarea;
  },
  ask() {
    var answeredYesAtLeastOnce = false;
    // this.passwordTextarea.value = "Pending...";

    alert("Generate password:\n\nYou will be asked the type of characters that make up the password. You must answer yes to at least one type of characters.\n\nFor the most secured password, you want all types of characters.");

    var yesLC = prompt("Want lower case characters in your password? Answer YES or NO.");

    var yesUC = prompt("Want upper case characters in your password? Answer YES or NO.");

    var yesNum = prompt("Want numerical characters in your password? Answer YES or NO.");

    var yesSp = prompt(`Want special characters in your password? Answer YES or NO.\n\nExample: ${this.characterSets.special}`);
    

  },
  write() {
    return "Placeholder password";
  }
}

// Get references to the #password element
var passwordTextarea = document.querySelector("#password");
PasswordGenerator.init(passwordTextarea)

// Get references to the #generate element
var generateBtn = document.querySelector("#generate");
generateBtn.addEventListener("click", PasswordGenerator.ask.bind(PasswordGenerator));

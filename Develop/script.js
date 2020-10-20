// Assignment code here
var PasswordGenerator = {
  characterSets: {
    special: " !\"#$%&'()*+,-./:;<=>?@[\]^_`{|}~",
    uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    lowercase: "abcdefghijklmnopqrstuvwxyz",
    numerals: "0123456789"
  },
  ask() {

  },
  write() {
    return "Placeholder password";
  }
}

// Get references to the #generate element
var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {
  var passwordText = document.querySelector("#password");


}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);

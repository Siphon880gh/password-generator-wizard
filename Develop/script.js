// Assignment code here
var PasswordGenerator = {
  /* Internal variables and methods */
  characterSets: {
    lowercase: "abcdefghijklmnopqrstuvwxyz",
    uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    numerals: "0123456789",
    special: " !\"#$%&'()*+,-./:;<=>?@[\]^_`{|}~"
  },
  passwordTextarea: null,
  promptYesNo: function(msg) {

    var response = "";
    do {
      response = prompt(msg);
      response+=""; // Edge case: "null"
      response = response.toLowerCase();

      if( response!=="yes" && response!=="no" )
        alert("Error: You must answer YES or NO. Please try again.");
      
    } while( response!=="yes" && response!=="no" )

    return response==="yes";
  },
  promptLengthNum: function(msg, min, max) {
    var response = "";
    do {
      response = prompt(msg);
      response = parseInt(response);
      if(isNaN(response)) response=0;

      if( response<min || response>max )
        alert(`Error: Length of password must be greater than or equal to ${min} and less than or equal to ${max}.`);

    } while( response<min || response>max )

    return response;
  },
  generatePassword: function(characterSets, userLength) {
    var notAsRandomPassword = [];
    for(var i=0; i<userLength; i++) {
      var characterSet = characterSets[i%characterSets.length]; /* TODO: Review; a MOD b returns 0 <= x < b */
      var dec = Math.random();
      var diff = characterSet.length;
      // 0 to length - 1
      var randomIndex = Math.floor( dec*(diff+1) );
      var randomChar = characterSet[randomIndex];
      notAsRandomPassword.push(randomChar);
    } // for

    return notAsRandomPassword.join("");
  },
  writePassword: function(password) {
    this.passwordTextarea.value = password;
  },

  /* Exposed methods */
  init(passwordTextarea) {
    this.passwordTextarea = passwordTextarea;
  },
  ask() {
    var yesAtLeastOnce = false;
    var characterSets = [];
    // this.passwordTextarea.value = "Pending...";

    alert("🔑 Generate password:\n\nYou will be asked the type of characters that make up the password. You must answer yes to at least one type of characters.\n\nFor the most secured password, you want all types of characters.");

    do {
      var yesLC = this.promptYesNo("Want lower case characters in your password? Answer YES or NO.");
      if(yesLC) characterSets.push(this.characterSets.lowercase);

      var yesUC = this.promptYesNo("Want upper case characters in your password? Answer YES or NO.");
      if(yesUC) characterSets.push(this.characterSets.uppercase);

      var yesNum = this.promptYesNo("Want numerical characters in your password? Answer YES or NO.");
      if(yesNum) characterSets.push(this.characterSets.numerals);

      var yesSp = this.promptYesNo(`Want special characters in your password? Answer YES or NO.\n\nExample: ${this.characterSets.special}`);
      if(yesSp) characterSets.push(this.characterSets.special);
      
      yesAtLeastOnce = yesLC || yesUC || yesNum || yesSp;
      if( !yesAtLeastOnce )
        alert("Error: You must answer YES to one of the character types. Please try again.");

    } while( !yesAtLeastOnce );

    var userLength = this.promptLengthNum("How long do you want your password? Enter a numerical value.", 8, 128);
    var password = this.generatePassword(characterSets, userLength);
    this.writePassword(password);

  } // ask
} // PasswordGenerator

// Get references to the #password element
var passwordTextarea = document.querySelector("#password");
PasswordGenerator.init(passwordTextarea)

// Get references to the #generate element
var generateBtn = document.querySelector("#generate");

// TODO: Review; Tricky point with objects; onclick changes the this-context to the event.target, so change the this-context back to the object
generateBtn.addEventListener("click", PasswordGenerator.ask.bind(PasswordGenerator));

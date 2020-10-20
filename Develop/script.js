 /**
 * PasswordGenerator
 * @class
 * @classdesc 
 *            PasswordGenerator generates a random password after prompting and validating user responses on password criteria:
 *                1. lowercase
 *                2. uppercase
 *                3. numerals
 *                4. special characters
 * 
 *            The code uses the exposed methods of PasswordGenerator in this order:
 *                1. init() with the DOM that will get written with the password
 *                2. prompt() asks user the criteria and password length (must be greater or equal than 8 and less than or equal to 128). 
 *                3. Responses are validated. If the response is inappropriate, then let user know, and keep asking until valid response.
 * 
 *            PasswordGenerator is a static class that does not have to be instantiated with the new operator. 
 *            The object has internal variables and methods that the exposed methods use.
 *            The internal variables store the different character sets to generate the password and also the DOM to write the password to.
 *  
 */
var PasswordGenerator = {
  /* Internal variables and methods */

  /**
   * @property {Object[]} characterSets - List of character sets the user can choose
   * @property {string} characterSets[].lowercase - Lowercase characters set to generate password with
   * @property {string} characterSets[].uppercase - Uppercase characters set to generate password with
   * @property {string} characterSets[].numerals - Numeral characters set to generate password with
   * @property {string} characterSets[].special - Special characters set to generate password with
   * 
   */
  characterSets: {
    lowercase: "abcdefghijklmnopqrstuvwxyz",
    uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    numerals: "0123456789",
    special: " !\"#$%&'()*+,-./:;<=>?@[\]^_`{|}~"
  },

  /**
   * @property {passwordTextarea} - store textarea from document.querySelector(...)
   */
  passwordTextarea: null,

  /**
   * Ask user yes or no for the password's character type criteria
   * @method promptYesNo
   * @param {string} msg Prompt message asking for Yes or No response
   * @returns {boolean} Returns true or false for the character type 
   */
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

  /**
   * Ask user for desired password length
   * @method promptLengthNum
   * @param {string} msg Prompt message asking for desired password length
   * @param {number} min Min password length for validating
   * @param {number} max Max password length for validating
   * @returns {number} Returns acceptable password length that's between min and max after prompting and validating 
   */
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
  /**
   * Generate password using the selected character sets
   * @generator
   * @method generatePassword
   * @param {string[]} characterSets Character sets the user replied yes to
   * @param {number} userLength Length user replied with
   * @yields {string} Random password
   */
  generatePassword: function(characterSets, userLength) {
    var notAsRandomPassword = "";
    for(var i=0; i<userLength; i++) {
      var characterSet = characterSets[i%characterSets.length]; /* TODO: Review; a MOD b returns 0 <= x < b */
      var dec = Math.random();
      var diff = characterSet.length;
      // 0 to length - 1
      var randomIndex = Math.floor( dec*diff );
      var randomChar = characterSet[randomIndex];
      notAsRandomPassword+=randomChar;
    } // for

    var randomPassword = notAsRandomPassword .split("")
                                             .sort( () => Math.random() - 0.5 )
                                             .join("");
                                             
    return randomPassword;
  },

  /**
   * 
   * Write password to textarea
   * @method writePassword
   */
  writePassword: function(password) {
    this.passwordTextarea.value = password;
  },

  /* Exposed methods */

  /**
   * Init PasswordGenerator by saving the textarea from document.querySelector
   * @method init
   * @param {element} passwordTextarea 
   */
  init(passwordTextarea) {
    this.passwordTextarea = passwordTextarea;
  },


  /**
   * Ask user with multiple prompts on desired character sets and password length
   * @method ask
   * @this PasswordGenerator - If PasswordGenerator.ask is called from an onclick event, make sure to rebind the this-context with .bind()
   */
  ask() {
    var yesAtLeastOnce = false;
    var characterSets = [];

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

// Init Password Generator
PasswordGenerator.init(passwordTextarea)

// Get references to the #generate element
var generateBtn = document.querySelector("#generate");

// TODO: Review; Tricky point with objects; onclick changes the this-context to the event.target, so change the this-context back to the object
generateBtn.addEventListener("click", PasswordGenerator.ask.bind(PasswordGenerator));

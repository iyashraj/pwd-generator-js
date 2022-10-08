lengthSlider = document.querySelector(".pass-length input");

generateBtn = document.querySelector(".generate-btn");

passwordInput = document.querySelector(".input-box input")

options = document.querySelectorAll(".option input");

passIndicator = document.querySelector(".pass-indicator")

copyPwd = document.querySelector(".input-box span")

const characters = {
  lowercase: "abcdefghijklmnopqrstuvwxyz",
  uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  numbers: "0123456789",
  symbols: "^!$%&|[](){}:;.,*+-#@<>~",
};
const generatePwd = () => {
  let staticPwd = "";
  passLength = lengthSlider.value;
  randomPwd = "";
  excludeDuplicate = false;
  options.forEach((option) => {
    if (option.checked) {
        if(option.id !== "exe-duplicate" && option.id !== "spaces"){
            staticPwd += characters[option.id];
        } else if(option.id === "spaces"){
            staticPwd += ` ${staticPwd} `
        } else{
            excludeDuplicate = true;
        }
    }
  });

  for (let i = 0; i < passLength; i++) {
    let randomChar = staticPwd[Math.floor(Math.random() * staticPwd.length)]
    if(excludeDuplicate){
        !randomPwd.includes(randomChar) || randomChar == " " ? randomPwd += randomChar : i--;
    } else{
        randomPwd += randomChar;
    }
  }
  passwordInput.value = randomPwd;
};

const updatePassIndicator = () =>{
    passIndicator.id = lengthSlider.value <= 8 ? "weak" : lengthSlider.value <= 16? "medium" : "strong";
}
const updateSlider = () => {
  //passing slider value
  document.querySelector(".pass-length span").innerText = lengthSlider.value;
  generatePwd();
  updatePassIndicator();
};

updateSlider();

const pwdCopied = () => {
    navigator.clipboard.writeText(passwordInput.value)
    copyPwd.innerText = "copied";
    setTimeout(()=>{
        copyPwd.innerText = "copy"
    }, 1500)
}
copyPwd.addEventListener("click", pwdCopied)
lengthSlider.addEventListener("input", updateSlider);
generateBtn.addEventListener("click", generatePwd);

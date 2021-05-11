var pswd1;
var pswd2;
var validText;
function registration_init() {
  pswd1 = document.getElementById("password");
  pswd2 = document.getElementById("password-check");
  validText = document.getElementById("validText");
  setPlaceholder();
}
function login_init(){
  setPlaceholder();
}
function setPlaceholder(){
  const inputs = document.getElementsByTagName("input");
  for(let i = 0; i < inputs.length; i++){
    let str = inputs[i].placeholder;
    inputs[i].onfocus = (e) => (e.target.placeholder = '');
    inputs[i].onblur = (e) => (e.target.placeholder = str);
  }
}
function pswdCheck() {
  return pswd1.value === pswd2.value;
}
function keyCheck() {
  let str;
  if (pswdCheck()) {
    str = "비밀번호가 일치합니다.";
    validText.style.color = "green";
  } else {
    str = "비밀번호가 일치하지 않습니다.";
    validText.style.color = "red";
  }
  validText.innerHTML = str;
}
function submitCheck() {
  if (pswdCheck()) {
    document.getElementById("FormRegistration").submit();
    return true;
  } else {
    alert("비밀번호가 일치하지 않습니다.");
    pswd1.select();
    return false;
  }
}
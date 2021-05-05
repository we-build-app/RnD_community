var pswd1;
var pswd2;
var validText;
function registration_init() {
  pswd1 = document.getElementById("password");
  pswd2 = document.getElementById("password-check");
  validText = document.getElementById("validText");
}
function pswdCheck() {
  if (pswd1.value != pswd2.value) {
    return false;
  }
  return true;
}
function keyCheck() {
  var str;
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
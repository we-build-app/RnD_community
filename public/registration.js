var pswd1;
var pswd2;
var validText;

async function registration_init() {

  pswd1 = document.getElementById("password");
  pswd2 = document.getElementById("password-check");
  validText = document.getElementById("validText");
  setPlaceholder();
}
async function login_init(){
  setPlaceholder();
}
async function setPlaceholder(){
  const inputs = document.getElementsByTagName("input");
  for(let i = 0; i < inputs.length; i++){
    let str = inputs[i].placeholder;
    inputs[i].onfocus = (e) => (e.target.placeholder = '');
    inputs[i].onblur = (e) => (e.target.placeholder = str);
  }
}
async function pswdCheck() {
  return pswd1.value === pswd2.value;
}
async function keyCheck() {
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
async function submitCheck() {
    if (pswdCheck()) {
    const form = document.getElementById("FormRegistration");
    const email = form.email.value;
    const pw = form.password.value;
    try{
      const res = await axios.post('/users', {email, pw});
      const user = res.data;

      console.log('user');
      alert(user.User_id + ' ' + user.User_name + ' ');
    }catch(e){
      console.log('asdfasdfasdf');
    }
    return true;
  } else {
    alert("비밀번호가 일치하지 않습니다.");
    pswd1.select();
    return false;
  }
}
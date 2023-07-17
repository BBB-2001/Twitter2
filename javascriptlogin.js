$(document).ready(function () {
  const section = $("<section></section>");
  section.attr("id", "");
  section.addClass("section pb-1");

  const container = $("<div></div>");
  container.addClass("container justify-content-center text-center");
  container.css("background-color", "#f8f9fa");

  const form = $("<form></form>"); // Düzeltme: form elementi ekleyin
  form.addClass("form d-inline-block pl-5 pr-5");
  const register = $("<div></div>");
  register.addClass("register");
  register.text("KAYIT OL");

  const nameDiv = $("<div></div>");
  nameDiv.addClass("nameDiv text-start");
  nameDiv.text("Ad");

  const name = $("<input></input>");
  name.addClass("name");
  name.attr("id", "nameval");
  name.attr("name", "name"); // Düzeltme: name attribute ekleyin
  name.attr("placeholder", "Ad");

  const userNameDiv = $("<div></div>");
  userNameDiv.addClass("userNameDiv text-start");
  userNameDiv.text("Kullanıcı Adı");

  const userName = $("<input></input>");
  userName.addClass("userName");
  userName.attr("id", "userNameval");
  userName.attr("name", "username"); // Düzeltme: name attribute ekleyin
  userName.attr("placeholder", "Kullanıcı Adı");

  const passwordDiv = $("<div></div>");
  passwordDiv.addClass("passwordDiv text-start");
  passwordDiv.text("Şifre");

  const password = $("<input></input>");
  password.addClass("password");
  password.attr("id", "passwordval");
  password.attr("name", "password"); // Düzeltme: name attribute ekleyin
  password.attr("type", "password");
  password.attr("placeholder", "Şifre");

  const confirmPasswordDiv = $("<div></div>");
  confirmPasswordDiv.addClass("confirmPasswordDiv text-start");
  confirmPasswordDiv.text("Şifreyi Doğrula");

  const confirmPassword = $("<input></input>");
  confirmPassword.addClass("confirmPassword");
  confirmPassword.attr("id", "confirmPasswordval");
  confirmPassword.attr("name", "confirmPassword"); // Düzeltme: name attribute ekleyin
  confirmPassword.attr("type", "password");
  confirmPassword.attr("placeholder", "Şifreyi Doğrula");

  const registerBtnDiv = $("<div></div>");
  registerBtnDiv.addClass("registerBtnDiv");

  const registerBtn = $("<button></button>");
  registerBtn.attr("type", "submit");
  registerBtn.addClass("btn btn-primary btn-sm float-end");
  registerBtn.text("Kayıt Ol");

  form.on("submit", function (event) {
    // Düzeltme: submit olayını form üzerinde dinleyin
    event.preventDefault();

    const nameval = $("#nameval").val();
    const userNameval = $("#userNameval").val();
    const passwordval = $("#passwordval").val();
    const confirmPasswordval = $("#confirmPasswordval").val();

    if (
      nameval === "" ||
      userNameval === "" ||
      passwordval === "" ||
      confirmPasswordval === ""
    ) {
      alert("Boş kısım olamaz!!!");
    } else {
      if (passwordval === confirmPasswordval) {
        const data = {
          name: nameval,
          username: userNameval,
          password: passwordval,
        };

        $.post("http://192.168.1.18:3001/register", data)
          .done(function (response) {
            console.log(response);
            alert("Kayıt işlemi başarıyla tamamlandı.");
          })
          .fail(function () {
            alert("Kayıt işlemi başarısız oldu.");
          });
      } else {
        alert("Şifreler eşleşmiyor");
      }
    }
  });
  form.append(register);
  form.append(nameDiv);
  form.append(name);
  form.append(userNameDiv);
  form.append(userName);
  form.append(passwordDiv);
  form.append(password);
  form.append(confirmPasswordDiv);
  form.append(confirmPassword);
  form.append(registerBtnDiv);
  form.append(registerBtn);

  container.append(form);
  section.append(container);

  const loginContainer = $("<div></div>");
  loginContainer.addClass("container justify-content-center text-center");
  loginContainer.css("background-color", "#f8f9fa");

  const loginForm = $("<form></form>");
  loginForm.attr("id", "loginForm");
  loginForm.addClass("form");

  const loginTitle = $("<h2></h2>");
  loginTitle.text("Giriş Yap");

  const loginDiv = $("<div></div>");
  loginDiv.addClass("loginDiv ");
  loginDiv.text("Kullanıcı Adı:");

  const loginInput = $("<input></input>");
  loginInput.attr("type", "name");
  loginInput.attr("id", "loginuserNameval");
  loginInput.attr("name", "Kullanıcı Adı");

  const loginPasswordDiv = $("<div></div>");
  loginPasswordDiv.addClass("loginPasswordLabel ");
  loginPasswordDiv.text("Şifre:");

  const loginPasswordInput = $("<input></input>");
  loginPasswordInput.attr("type", "password");
  loginPasswordInput.attr("id", "loginpasswordval");
  loginPasswordInput.attr("name", "password");

  const loginButton = $("<button></button>");
  loginButton.addClass(
    "btn btn-primary btn-sm justify-content-center text-center"
  );
  loginButton.text("Giriş Yap");
  loginButton.on("click", function () {
    const loginuserNameval = $("#loginuserNameval");
    const loginpasswordval = $("#loginpasswordval");

    if (loginuserNameval === "" || loginpasswordval === "") {
      alert("Boş kısım olamaz!!!");
    } else {
      {
        const data = {
          username: loginuserNameval.val(),
          password: loginpasswordval.val(),
        };
        console.log(data);

        $.post("http://192.168.1.18:3001/login", data)
          .done(function (response) {
            console.log(response);
            alert("Giriş Yapıldı");
          })
          .fail(function () {
            alert("Giriş başarısız oldu.");
          });
      }
    }
  });

  loginForm.append(loginTitle);
  loginForm.append(loginDiv);
  loginForm.append(loginInput);
  loginForm.append(loginPasswordDiv);
  loginForm.append(loginPasswordInput);
  loginForm.append(loginButton);

  let activeForm = register;

  section.append(activeForm);
  $("body").append(section);

  const toggleButton = $("<button></button>");
  toggleButton.addClass(
    "btn btn-primary btn-sm justify-content-center text-center"
  );
  toggleButton.text("Giriş Yap");

  toggleButton.on("click", function () {
    if (activeForm === register) {
      activeForm = loginForm;
      toggleButton.text("Kayıt Ol");
    } else {
      activeForm = register;
      toggleButton.text("Giriş Yap");
    }

    section.empty();
    section.append(activeForm);
  });
  loginContainer.append(loginForm);
  $("body").append(toggleButton);
});

$(document).ready(function () {
  const section = $("<section></section>");
  section.attr("id", "");
  section.addClass("section pb-1");

  const container = $("<div></div>");
  container.addClass("container justify-content-center text-center");
  container.css("background-color", "#f8f9fa");

  const registerForm = createRegisterForm();

  section.append(container);
  container.append(registerForm);
  $("body").append(section);

  const toggleButton = $("<button></button>");
  toggleButton.addClass(
    "btn btn-primary btn-sm justify-content-center text-center"
  );
  toggleButton.text("Giriş Yap");

  toggleButton.on("click", function () {
    window.location.href = "login.html";
  });

  $("body").append(toggleButton);

  function createRegisterForm() {
    const form = $("<form></form>");
    form.addClass("form d-inline-block pl-5 pr-5");

    const register = $("<div></div>");
    register.addClass("register ");
    register.text("KAYIT OL");

    const nameDiv = $("<div></div>");
    nameDiv.addClass("nameDiv text-start");
    nameDiv.text("Ad:");

    const name = $("<input></input>");
    name.addClass("name");
    name.attr("id", "nameval");
    name.attr("name", "name");
    name.attr("placeholder", "Ad");

    const userNameDiv = $("<div></div>");
    userNameDiv.addClass("userNameDiv text-start");
    userNameDiv.text("Kullanıcı Adı:");

    const userName = $("<input></input>");
    userName.addClass("userName");
    userName.attr("id", "userNameval");
    userName.attr("name", "username");
    userName.attr("placeholder", "Kullanıcı Adı");

    const passwordDiv = $("<div></div>");
    passwordDiv.addClass("passwordDiv text-start");
    passwordDiv.text("Şifre:");

    const password = $("<input></input>");
    password.addClass("password");
    password.attr("id", "passwordval");
    password.attr("name", "password");
    password.attr("type", "password");
    password.attr("placeholder", "Şifre");

    const confirmPasswordDiv = $("<div></div>");
    confirmPasswordDiv.addClass("confirmPasswordDiv text-start");
    confirmPasswordDiv.text("Şifreyi Doğrula:");

    const confirmPassword = $("<input></input>");
    confirmPassword.addClass("confirmPassword");
    confirmPassword.attr("id", "confirmPasswordval");
    confirmPassword.attr("name", "confirmPassword");
    confirmPassword.attr("type", "password");
    confirmPassword.attr("placeholder", "Şifreyi Doğrula");

    const registerBtnDiv = $("<div></div>");
    registerBtnDiv.addClass("registerBtnDiv");

    const registerBtn = $("<button></button>");
    registerBtn.attr("type", "submit");
    registerBtn.addClass("btn btn-primary btn-sm float-end");
    registerBtn.text("Kayıt Ol");

    form.on("submit", function (event) {
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

          $.post("http://192.168.1.37:3001/register", data)
            .done(function (response) {
              console.log(response);
              alert("Kayıt işlemi başarıyla tamamlandı.");
              localStorage.setItem("token", response.token);
              localStorage.setItem("user", JSON.stringify(response.user));
              window.location.href = "index.html";
            })
            .fail(function () {
              alert("Kayıt işlemi başarısız oldu.");
            });
        } else {
          alert("Şifreler eşleşmiyor");
        }
      }
    });

    register.append(nameDiv);
    register.append(name);
    register.append(userNameDiv);
    register.append(userName);
    register.append(passwordDiv);
    register.append(password);
    register.append(confirmPasswordDiv);
    register.append(confirmPassword);
    register.append(registerBtnDiv);
    registerBtnDiv.append(registerBtn);

    form.append(register);

    return form;
  }
});

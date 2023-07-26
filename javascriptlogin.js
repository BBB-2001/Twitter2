$(document).ready(function () {
  const section = $("<section></section>");
  section.attr("id", "");
  section.addClass("section pb-1");

  const container = $("<div></div>");
  container.addClass(" justify-content-center text-center");
  container.css("background-color", "#f8f9fa");

  const loginForm = createLoginForm();

  section.append(container);
  container.append(loginForm);
  $("body").append(section);

  const toggleButton = $("<button></button>");
  toggleButton.addClass(
    "btn btn-primary btn-sm justify-content-center text-center"
  );
  toggleButton.text("Kayıt");

  toggleButton.on("click", function () {
    window.location.href = "register.html";
  });

  $("body").append(toggleButton);
});

function createLoginForm() {
  const form = $("<form></form>");
  form.attr("id", "loginForm");
  form.addClass("d-inline-block");
  form.addClass("form");

  const loginTitle = $("<h2></h2>");
  loginTitle.text("Giriş Yap");

  const loginDiv = $("<div></div>");
  loginDiv.addClass("loginDiv text-start");
  loginDiv.text("Kullanıcı Adı:");

  const loginInput = $("<input></input>");
  loginInput.attr("type", "name");
  loginInput.attr("id", "loginuserNameval");
  loginInput.attr("name", "Kullanıcı Adı");

  const loginPasswordDiv = $("<div></div>");
  loginPasswordDiv.addClass("loginPasswordLabel text-start");
  loginPasswordDiv.text("Şifre:");

  const loginPasswordInput = $("<input></input>");
  loginPasswordInput.attr("type", "password");
  loginPasswordInput.attr("id", "loginpasswordval");
  loginPasswordInput.attr("name", "password");

  const loginButtonDiv = $("<div></div>");
  loginButtonDiv.addClass("loginButtonDiv");

  const loginButton = $("<button></button>");
  loginButton.attr("type", "submit");
  loginButton.addClass(
    "btn btn-primary btn-sm justify-content-center text-center d-block float-end"
  );
  loginButton.text("Giriş Yap");

  form.on("submit", function (event) {
    event.preventDefault();
    console.log("event", event);
    const loginuserNameval = $("#loginuserNameval");
    const loginpasswordval = $("#loginpasswordval");

    if (loginuserNameval === "" || loginpasswordval === "") {
      alert("Boş kısım olamaz!!!");
    } else {
      const data = {
        username: loginuserNameval.val(),
        password: loginpasswordval.val(),
      };
      console.log("data", data);
      $.post("http://192.168.1.37:3001/login", data)
        .done(function (response) {
          console.log(response);
          localStorage.setItem("token", response.token);
          localStorage.setItem("user", JSON.stringify(response.user));

          window.location.href = "index.html";
        })
        .fail(function () {
          alert("Giriş başarısız oldu.");
        });
    }
  });

  form.append(loginTitle);
  form.append(loginDiv);
  form.append(loginInput);
  form.append(loginPasswordDiv);
  form.append(loginPasswordInput);
  form.append(loginButtonDiv);
  form.append(loginButton);

  return form;
}

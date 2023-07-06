$(document).ready(function () {
  const form = $("form");
  const div = $("#textid");
  const button1 = $("#button-1");
  const input = $("#item");
  var itemsArray = localStorage.getItem("items")
    ? JSON.parse(localStorage.getItem("items"))
    : [];
  localStorage.setItem("items", JSON.stringify(itemsArray));
  const data = JSON.parse(localStorage.getItem("items"));

  var myArray = [
    {
      name: "Baran Barış Bal",
      profilePic: "image/blank-profile-picture-973460_960_720.webp",
      date: "",
      text: "",
      comment: "",
      like: "",
    },
  ];

  itemsArray = $.map(myArray, function (item, index) {
    localStorage.setItem("name" + index, item.name);
    localStorage.setItem("Profilepic" + index, item.profilePic);
    localStorage.setItem("name" + index, item.text);
    localStorage.setItem("date" + index, item.date);
    localStorage.setItem("comment" + index, item.comment);
    localStorage.setItem("like" + index, item.like);

    return item;
  });

  const pMaker = (text) => {
    const p = $("<p></p>");
    p.text(text);
    div.append(p);
  };

  form.on("submit", function (e) {
    e.preventDefault();

    itemsArray.push(input.val());
    localStorage.setItem("items", JSON.stringify(itemsArray));
    pMaker(input.val());
    input.val("");
  });

  data.forEach((item) => pMaker(item));

  const pdMaker = (text) => {
    const p = $("#DateTime");
    p.text(text);
    div.append(p);
  };

  $.fn.dateTime = function () {
    var date = new Date().toLocaleString("");
    this.text(date);
  };

  $("#close").click(function () {
    $("#section").hide();
    localStorage.clear();
    while (div.firstChild) {
      div.removeChild(div.firstChild);
    }
    itemsArray = [];
  });
});

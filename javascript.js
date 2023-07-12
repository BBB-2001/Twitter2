$(document).ready(function () {
  const form = $("form");
  const div = $("#textid");
  const button1 = $("#button-1");
  const input = $("#item");
  var itemsArray = localStorage.getItem("items")
    ? JSON.parse(localStorage.getItem("items"))
    : [];
  if (itemsArray.length === 0)
    localStorage.setItem("items", JSON.stringify(itemsArray));

  itemsArray.forEach((index) => {
    sectionHTML(index, index.id, index.likeId);
    // sectionComment(
    //   index.id,
    //   index.comments,
    //   index.comId,
    //   index.comment,
    //   index.comtext,
    //   index.comdate,
    //   index.comLikeId
    // );
  });

  form.on("submit", function (e) {
    e.preventDefault();
    // id generation
    const id = idGen.getId();
    const likeId = idGen.getId();
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hour = date.getHours();
    const minute = date.getMinutes();

    const tweet = {
      id,
      likeId,
      name: "Baran Barış Bal",
      profilePic: "image/blank-profile-picture-973460_960_720.webp",
      date: [day, "/", month, "/", year, "  ", hour, ":", minute],

      text: input.val(),
      comments: [],
      like: 0,
    };
    if (tweet.text !== "") {
      itemsArray.push(tweet);
      localStorage.setItem("items", JSON.stringify(itemsArray));
      input.val("");
      sectionHTML(tweet, id, likeId);
    }
  });

  function sectionHTML(tweet, id, likeId) {
    const section = $("<section></section>");
    section.attr("id", `${id}`);
    section.css("background-color", "#eee");
    section.addClass("container");

    const divContainer = $("<div></div>");
    divContainer.addClass("container col-lg-12 my-5 py-5");

    function sectionComment(
      id,
      comments,
      comId,
      comment,
      comtext,
      comdate,
      comLikeId
    ) {
      console.log(comments);
      const divCommentText = $("<div></div>");
      divCommentText.attr("id", `${comId}`);
      divCommentText.addClass("comment-text container col-lg-12 my-5 py-5 ");
      divCommentText.css("background-color", "#f8f9fa");

      const spanClose = $("<span></span>");
      spanClose.attr("id", `span`);
      spanClose.addClass("float-end");
      spanClose.css("cursor", "pointer");
      spanClose.text("X");
      spanClose.on("click", function () {
        let postId = $(this).parent("div").attr("id");

        let items = JSON.parse(localStorage.getItem("items")) || [];

        let updatedItems = items.filter(function (item) {
          console.log(item.id, typeof item.id);
          console.log(postId, typeof postId);
          return item.id !== +postId;
        });
        console.log(updatedItems);
        itemsArray = updatedItems;
        localStorage.setItem("items", JSON.stringify(updatedItems));
        $(this).closest("div").remove();
      });

      const divRow = $("<div></div>");
      divRow.addClass("row d-flex justify-content-center");

      const divCol = $("<div></div>");
      divCol.addClass("col-md-12 col-lg-10 col-xl-8");

      const divProfile = $("<div></div>");
      divProfile.addClass("profile");

      const divProfileBody = $("<div></div>");
      divProfileBody.addClass("profile-body");

      const divFlex = $("<div></div>");
      divFlex.addClass("d-flex flex-start align-items-center");

      const imgAvatar = $("<img>");
      imgAvatar.attr("src", tweet.profilePic);
      imgAvatar.attr("alt", "avatar");
      imgAvatar.attr("width", "60");
      imgAvatar.attr("height", "60");
      imgAvatar.addClass("rounded-circle shadow-1-strong me-3");

      const divProfileInfo = $("<div></div>");
      const h6Name = $("<h6></h6>");
      h6Name.addClass("fw-bold text-primary mb-1");
      h6Name.html(tweet.name);
      const divDateTime = $("<div></div>");
      divDateTime.attr("id", "DateTime");
      divDateTime.addClass("text-muted small mb-0");
      divDateTime.html(comments);

      divProfileInfo.append(h6Name);
      divProfileInfo.append(divDateTime);

      divFlex.append(imgAvatar);
      divFlex.append(divProfileInfo);

      const pText = $("<p></p>");
      pText.attr("id", "textid");
      pText.addClass("mt-3 mb-4 pb-2");
      pText.html(comment.comtext);

      const divSmall = $("<div></div>");
      divSmall.addClass("small d-flex justify-content-start ");

      const linkLike = $("<a></a>");
      linkLike.attr("href", "#!");
      linkLike.attr("id", `${comLikeId}`);
      linkLike.addClass("d-flex align-items-center me-3");
      linkLike.on("click", function () {
        let likeId = $(this).attr("id");

        const tweet = itemsArray.find((item) => item.likeId === +likeId);

        if (tweet) {
          tweet.like++;
          $(pLike).text("Like: " + tweet.like);

          localStorage.setItem("items", JSON.stringify(itemsArray));
        }
      });

      const iLike = $("<i></i>");
      iLike.addClass("far fa-thumbs-up me-2");

      const pLike = $("<p></p>");
      pLike.addClass("like mb-0");
      pLike.text("Like: ");
      pLike.html("Like: " + tweet.like);

      linkLike.append(iLike);
      linkLike.append(pLike);

      divSmall.append(linkLike);

      divProfileBody.append(divFlex);
      divProfileBody.append(pText);
      divProfileBody.append(divSmall);

      const divCardFooter = $("<div></div>");
      divCardFooter.addClass("card-footer py-3 border-0 mr-3");
      divCardFooter.css("background-color", "#f8f9fa");

      const divFooterFlex = $("<div></div>");
      divFooterFlex.addClass("d-flex flex-start w-100 mr-3");

      const imgFooterAvatar = $("<img>");
      imgFooterAvatar.attr("src", tweet.profilePic);
      imgFooterAvatar.attr("alt", "avatar");
      imgFooterAvatar.attr("width", "40");
      imgFooterAvatar.attr("height", "40");
      imgFooterAvatar.addClass("rounded-circle shadow-1-strong me-2");

      divProfile.append(divProfileBody);
      divProfile.append(divCardFooter);

      divCol.append(divProfile);

      divRow.append(divCol);

      divCommentText.append(spanClose);
      divCommentText.append(divRow);

      // section select
      // divComment append to section
      const parentSection = $(`#${id}`);
      parentSection.append(divCommentText);
    }

    const spanClose = $("<span></span>");
    spanClose.attr("id", `span`);
    spanClose.addClass("float-end");
    spanClose.css("cursor", "pointer");
    spanClose.text("X");
    spanClose.on("click", function () {
      let postId = $(this).parent("div").parent("section").attr("id");

      let items = JSON.parse(localStorage.getItem("items")) || [];

      let updatedItems = items.filter(function (item) {
        console.log(item.id, typeof item.id);
        console.log(postId, typeof postId);
        return item.id !== +postId;
      });
      console.log(updatedItems);
      itemsArray = updatedItems;
      localStorage.setItem("items", JSON.stringify(updatedItems));
      $(this).closest("section").remove();
    });

    const divRow = $("<div></div>");
    divRow.addClass("row d-flex justify-content-center");

    const divCol = $("<div></div>");
    divCol.addClass("col-md-12 col-lg-10 col-xl-8");

    const divProfile = $("<div></div>");
    divProfile.addClass("profile");

    const divProfileBody = $("<div></div>");
    divProfileBody.addClass("profile-body");

    const divFlex = $("<div></div>");
    divFlex.addClass("d-flex flex-start align-items-center");

    const imgAvatar = $("<img>");
    imgAvatar.attr("src", tweet.profilePic);
    imgAvatar.attr("alt", "avatar");
    imgAvatar.attr("width", "60");
    imgAvatar.attr("height", "60");
    imgAvatar.addClass("rounded-circle shadow-1-strong me-3");

    const divProfileInfo = $("<div></div>");
    const h6Name = $("<h6></h6>");
    h6Name.addClass("fw-bold text-primary mb-1");
    h6Name.html(tweet.name);
    const divDateTime = $("<div></div>");
    divDateTime.attr("id", "DateTime");
    divDateTime.addClass("text-muted small mb-0");
    divDateTime.html(tweet.date);

    divProfileInfo.append(h6Name);
    divProfileInfo.append(divDateTime);

    divFlex.append(imgAvatar);
    divFlex.append(divProfileInfo);

    const pText = $("<p></p>");
    pText.attr("id", "textid");
    pText.addClass("mt-3 mb-4 pb-2");
    pText.html(tweet.text);

    const divSmall = $("<div></div>");
    divSmall.addClass("small d-flex justify-content-start ");

    const linkLike = $("<a></a>");
    linkLike.attr("href", "#!");
    linkLike.attr("id", `${likeId}`);
    linkLike.addClass("d-flex align-items-center me-3");
    linkLike.on("click", function () {
      let likeId = $(this).attr("id");

      const tweet = itemsArray.find((item) => item.likeId === +likeId);

      if (tweet) {
        tweet.like++;
        $(pLike).text("Like: " + tweet.like);

        localStorage.setItem("items", JSON.stringify(itemsArray));
      }
    });

    const iLike = $("<i></i>");
    iLike.addClass("far fa-thumbs-up me-2");

    const pLike = $("<p></p>");
    pLike.addClass("like mb-0");
    pLike.text("Like: ");
    pLike.html("Like: " + tweet.like);

    linkLike.append(iLike);
    linkLike.append(pLike);

    divSmall.append(linkLike);

    divProfileBody.append(divFlex);
    divProfileBody.append(pText);
    divProfileBody.append(divSmall);

    const divCardFooter = $("<div></div>");
    divCardFooter.addClass("card-footer py-3 border-0 mr-3");
    divCardFooter.css("background-color", "#f8f9fa");

    const divFooterFlex = $("<div></div>");
    divFooterFlex.addClass("d-flex flex-start w-100 mr-3");

    const imgFooterAvatar = $("<img>");
    imgFooterAvatar.attr("src", tweet.profilePic);
    imgFooterAvatar.attr("alt", "avatar");
    imgFooterAvatar.attr("width", "40");
    imgFooterAvatar.attr("height", "40");
    imgFooterAvatar.addClass("rounded-circle shadow-1-strong me-2");

    const divTextarea = $("<div></div>");
    divTextarea.addClass("form-outline w-100 mr-3");

    const textareaComment = $("<textarea></textarea>");
    textareaComment.attr("id", "textAreaExample");
    textareaComment.addClass("form-control mr-3");
    textareaComment.attr("rows", "4");
    textareaComment.attr("style", "background: #fff; resize: none");
    textareaComment.attr("placeholder", "Yorum");

    const labelComment = $("<label></label>");
    labelComment.addClass("form-label");
    labelComment.attr("for", "textAreaExample");

    divTextarea.append(textareaComment);
    divTextarea.append(labelComment);

    divFooterFlex.append(imgFooterAvatar);
    divFooterFlex.append(divTextarea);

    const divFooterButtons = $("<div></div>");
    divFooterButtons.addClass("float-end mt-2 pt-1");

    const btnShare = $("<button></button>");
    btnShare.attr("type", "button");
    btnShare.attr("id", ``);
    btnShare.addClass("btn btn-primary btn-sm");
    btnShare.text("Paylaş");
    btnShare.on("click", function (comments) {
      const textareaValue = $("#textAreaExample").val();
      const comId = idGen.getId();
      const comLikeId = idGen.getId();
      const date = new Date();
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();
      const hour = date.getHours();
      const minute = date.getMinutes();
      const comment = {
        comId,
        comtext: textareaValue,
        comdate: [day, "/", month, "/", year, "  ", hour, ":", minute],
        comLikeId,
        comlike: 0,
      };

      const tweet = itemsArray.find((item) => item.id === +id);
      itemsArray.find((item) => console.log(item.id));
      console.log(+id);

      // if (tweet) {
      //   tweet.comments.push(comment);
      //   localStorage.setItem("items", JSON.stringify(itemsArray));
      //   console.log("Yorum paylaşıldı: ", comment);
      // }
      if (comment.comtext !== "") {
        console.log(tweet);
        tweet.comments.push(comment);
        localStorage.setItem("items", JSON.stringify(itemsArray));
        textareaComment.val("");
        console.log("Yorum paylaşıldı: ", comment);

        sectionComment(
          id,
          comments,
          comment.comId,
          comment.comtext,
          comment.comLikeId
        );
      }
    });

    const btnCancel = $("<button></button>");
    btnCancel.attr("type", "button");
    btnCancel.addClass("btn btn-outline-primary btn-sm");
    btnCancel.text("İptal");

    divFooterButtons.append(btnShare);
    divFooterButtons.append(btnCancel);

    divCardFooter.append(divFooterFlex);
    divCardFooter.append(divFooterButtons);

    divProfile.append(divProfileBody);
    divProfile.append(divCardFooter);

    divCol.append(divProfile);

    divRow.append(divCol);

    divContainer.append(spanClose);
    divContainer.append(divRow);

    section.append(divContainer);

    $("#tweets").prepend(section);
  }
});

function Generator() {}

Generator.prototype.rand = Math.floor(Math.random() * 26) + Date.now();

Generator.prototype.getId = function () {
  return this.rand++;
};
var idGen = new Generator();

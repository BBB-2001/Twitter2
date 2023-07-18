$(document).ready(function () {
  const token = localStorage.getItem("token");
  console.log(token);

  if (!token) {
    window.location.href = "login.html";
  }

  const form = $("form");
  const div = $("#textid");
  const button1 = $("#button-1");
  const data = {
    post,
  };
  const input = $.post("http://192.168.1.18:3001/tweets", data)
    .done(function (response) {})
    .fail(function () {
      alert("Giriş başarısız oldu.");
    });
  const itemsArray = $();

  const res = $.ajax({
    url: "http://192.168.1.18:3001/authenticated",
    method: "GET",
    beforeSend: function (xhr) {
      xhr.setRequestHeader("Authorization", `bearer ${token}`);
    },
    success: function (response) {
      console.log(response);

      if (response.user) {
        $.ajax({
          url: "http://192.168.1.18:3001/tweets",
          method: "GET",
          headers: {
            Authorization: `bearer ${token}`,
          },
          success: function (response) {
            const tweets = response.posts;
            tweets.forEach((tweet) => {
              const processedTweet = {
                id: tweet.id,
                likeId: tweet.comments.id,
                name: tweet.user,
                profilePic: tweet.porofile_photo,
                date: created_at,
                text: tweet.text,
                comments: tweet.comments,
                like: tweet.like_count,
              };
              sectionHTML(processedTweet);
              tweet.comments.forEach((item) => {
                const comment = {
                  id: tweet.id,
                  comId: item.id,
                  name: item.user,
                  profilePic: item.porofile_photo,
                  date: created_at,
                  text: item.text,
                  comtext: item.comments,
                  like: item.like_count,
                };
                sectionComment(
                  tweet.id,
                  item.comId,
                  item.comLike,
                  item.comtext,
                  item.comdate,
                  item.comLikeId,
                  item.profilePic,
                  item.name
                );
              });
            });

            console.log(response);
          },
          error: function (error) {
            // İstek başarısız olduğunda yapılacak işlemler
          },
        });
      } else {
        window.location.href = "login.html";
      }
    },
    error: function (error) {
      window.location.href = "login.html";
    },
  });

  form.on("submit", function (e) {
    e.preventDefault();

    // Tweet metni ve diğer gerekli bilgilerin alınması
    var tweetText = input.val();
    var tweetId = tweet.id; // tweet id'si
    var tweetLikeId = tweet.like; // tweet like id'si

    if (tweetText !== "") {
      // Yapılacak işlemler (örneğin, verilerin kaydedilmesi veya gösterilmesi)
      var tweet = {
        text: tweetText,
        id: tweetId,
        likeId: tweetLikeId,
      };

      input.val("");
      sectionHTML(tweet, tweetId, tweetLikeId);
    }
  });

  // Sayfa yenilendiğinde verileri yükle
  $(document).ready(function () {
    // localStorage'dan verilerin alınması ve gerekli işlemlerin yapılması (örneğin, sectionHTML() çağrısı)
  });

  // Sayfa yenilendiğinde verileri yükle
});

function sectionComment(
  id,
  comId,
  comLike,
  comtext,
  comdate,
  comLikeId,
  profilePic,
  name
) {
  const divCommentText = $("<div></div>");
  divCommentText.attr("id", `${comId}`);
  divCommentText.addClass("comment-text container col-lg-12 pt-3 mb-3");
  divCommentText.css("background-color", "#f8f9fa");

  const spanClose = $("<span></span>");
  spanClose.attr("id", "span");
  spanClose.addClass("float-end");
  spanClose.css("cursor", "pointer");
  spanClose.text("X");
  spanClose.on("click", function () {
    let commentId = $(this).parent("div").attr("id");

    let items = JSON.parse(localStorage.getItem("items"));

    let updatedItems = items.map(function (item) {
      // {console.log(item.id, typeof item.id);
      // console.log(postId, typeof postId);}

      if (item.id === +id) {
        item.comments = item.comments.filter(
          (comment) => comment.comId !== +commentId
        );
        $(`#${comId}`).remove(); // DOM'dan yorumu kaldır
      }
      return item;
    });

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
  imgAvatar.attr("src", profilePic);
  imgAvatar.attr("alt", "avatar");
  imgAvatar.attr("width", "30");
  imgAvatar.attr("height", "30");
  imgAvatar.addClass("rounded-circle shadow-1-strong me-3");

  const divProfileInfo = $("<div></div>");
  const h6Name = $("<h9></h9>");
  h6Name.addClass("fw-bold text-primary mb-1");
  h6Name.html(name);
  const divDateTime = $("<div></div>");
  divDateTime.attr("id", "DateTime");
  divDateTime.addClass("text-muted small mb-0");
  divDateTime.html(comdate);

  divProfileInfo.append(h6Name);
  divProfileInfo.append(divDateTime);

  divFlex.append(imgAvatar);
  divFlex.append(divProfileInfo);

  const pText = $("<p></p>");
  pText.attr("id", "textid");
  pText.addClass("mt-3 mb-4 pb-2 text-break");
  pText.html(comtext);

  const divSmall = $("<div></div>");
  divSmall.addClass("small d-flex justify-content-start ");

  const linkLike = $("<a></a>");
  linkLike.attr("href", "#!");
  linkLike.attr("id", `${comLikeId}`);
  linkLike.addClass("d-flex align-items-center me-3");
  linkLike.on("click", function () {
    let items = JSON.parse(localStorage.getItem("items"));

    let updatedItems = items.map(function (item) {
      let updatedComments = item.comments.map(function (comment) {
        if (comment.comLikeId === +comLikeId) {
          comment.comLike++;
          $(pLike).text("Like: " + comment.comLike);
        }
        return comment;
      });

      return {
        ...item,
        comments: updatedComments,
      };
    });

    localStorage.setItem("items", JSON.stringify(updatedItems));
  });

  const iLike = $("<i></i>");
  iLike.addClass("far fa-thumbs-up me-2");

  const pLike = $("<p></p>");
  pLike.addClass("comlike mb-0");
  pLike.text("Like: ");
  pLike.html("Like: " + comLike);

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
  imgFooterAvatar.attr("src", profilePic);
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

function sectionHTML(tweet, id, likeId) {
  const section = $("<section></section>");
  section.attr("id", `${id}`);
  section.css("background-color", "#eee");
  section.addClass("container pb-1");

  const divContainer = $("<div></div>");
  divContainer.addClass("container col-lg-12 my-3 py-3");

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
  h6Name.addClass("fw-bold text-primary mb-1 d-flex ");
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
  pText.addClass("mt-3 mb-4 pb-2 text-break");
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
  btnShare.on("click", function () {
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
      comLike: 0,
      name: "Baran Barış Bal",
      profilePic: "image/blank-profile-picture-973460_960_720.webp",
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

        comment.comId,
        comment.comLike,
        comment.comtext,
        comment.comdate,
        comment.comLikeId,
        comment.profilePic,
        comment.name
      );
    }
  });

  divFooterButtons.append(btnShare);

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

function Generator() {}

Generator.prototype.rand = Math.floor(Math.random() * 26) + Date.now();

Generator.prototype.getId = function () {
  return this.rand++;
};
var idGen = new Generator();

$(window).on("load", function () {
  var itemsArray = localStorage.getItem("items")
    ? JSON.parse(localStorage.getItem("items"))
    : [];

  itemsArray.forEach(function (item) {
    item.comments.forEach(function (comment) {
      var commentLike = localStorage.getItem(
        `commentLike_${comment.comLikeId}`
      );
      if (commentLike !== null) {
        comment.comLike = parseInt(commentLike);
        $(`#${comment.comId} .like`).text("Like: " + comment.comLike);
      }
    });
  });
});

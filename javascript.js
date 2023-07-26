const token = localStorage.getItem("token");
var loggedInUser = null;
let arr = [];
$(document).ready(function () {
  if (!token) {
    window.location.href = "login.html";
  }

  const form = $("form");
  const div = $("#textid");
  const button1 = $("#button-1");
  const input = $("#item");
  const itemsArray = [];

  var user = null;

  const res = $.ajax({
    url: "http://192.168.1.37:3001/authenticated",
    method: "GET",
    beforeSend: function (xhr) {
      xhr.setRequestHeader("Authorization", `bearer ${token}`);
    },
    success: function (response) {
      if (response.user) {
        loggedInUser = response.user;
        $.ajax({
          url: "http://192.168.1.37:3001/tweets",
          method: "GET",
          headers: {
            Authorization: `bearer ${token}`,
          },
          success: function (response) {
            const tweets = response.posts;

            tweets.reverse();

            tweets.forEach((tweet, index) => {
              const processedTweet = {
                id: tweet.post.post_id,
                user: tweet.post.post_user,
                is_liked: tweet.post.is_liked,
                name: tweet.post.user.username,
                profilePic: "image/blank-profile-picture-973460_960_720.webp",
                date: tweet.post.created_at,
                text: tweet.post.post_text,
                comments: tweet.post.comments,
                like: tweet.post.like_count,
              };

              arr = [...arr, processedTweet];
              sectionHTML(
                loggedInUser,
                processedTweet,
                tweet.post.post_id,
                tweet.post.like_count,
                index
              );

              tweet.post.comments.forEach((item) => {
                const processedComment = {
                  id: tweet.post.post_id,
                  user: item.user.id,
                  comId: item.comment_id,
                  comtext: item.comment_text,
                  comdate: item.created_at,
                  profilePic: "image/blank-profile-picture-973460_960_720.webp",
                  name: item.user.username,
                };

                sectionComment(
                  loggedInUser,
                  processedComment,
                  tweet.post.post_id,
                  item.comment_id,
                  item.comment_text,
                  item.created_at,
                  "image/blank-profile-picture-973460_960_720.webp",
                  item.username
                );
              });
            });
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
    const data = {
      post_text: input.val(),
    };
    $.ajax({
      url: "http://192.168.1.37:3001/tweets",
      method: "POST",
      data: data,
      beforeSend: function (xhr) {
        xhr.setRequestHeader("Authorization", `bearer ${token}`);
      },
      success: function (response) {
        console.log(response);
        const processedTweet = {
          id: response.post.post_id,
          user: response.post.post_user,
          is_liked: false,
          name: response.post.username,
          profilePic: "image/blank-profile-picture-973460_960_720.webp",
          date: response.post.created_at,
          text: response.post.post_text,
          comments: response.post.comments,
          like: response.post.like_count,
        };
        console.log(processedTweet);
        if (input.val() !== "") {
          console.log(input);
          input.val("");
          sectionHTML(
            loggedInUser,
            processedTweet,
            response.post.post_id,
            response.post.like_count
          );
        }
        console.log("Veri başarıyla gönderildi");
      },
      error: function (xhr, status, error) {
        console.error("Veri gönderme hatası:", error);
      },
    });
  });
});
$("#logout").click(function () {
  logout();
  console.log("Veri silindi.");
});
function logout() {
  localStorage.removeItem("token");

  location.reload();
}

function sectionComment(
  loggedInUser,
  comment,
  id,
  comId,
  comtext,
  comdate,
  profilePic,
  name
) {
  const divCommentText = $("<div></div>");
  divCommentText.attr("id", `${comId}`);
  divCommentText.addClass("comment-text container col-lg-12 pt-3 mb-3");
  divCommentText.css("background-color", "#f8f9fa");

  let spanClose = null;
  if (comment.user === loggedInUser.id) {
    spanClose = $("<span></span>");
    spanClose.attr("id", "span");
    spanClose.addClass("float-end");
    spanClose.css("cursor", "pointer");
    spanClose.text("X");
    spanClose.on("click", function (e) {
      e.preventDefault();
      const token = localStorage.getItem("token");
      $.ajax({
        url: `http://192.168.1.37:3001/comments/${comId}`,
        method: "DELETE",
        beforeSend: function (xhr) {
          xhr.setRequestHeader("Authorization", `bearer ${token}`);
        },
        success: function (response) {
          console.log("Veri başarıyla silindi");
        },
        error: function (xhr, status, error) {
          console.error("Veri silme hatası:", error);
        },
      });
      $(this).closest("div").remove();
    });
  }

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
  h6Name.html(comment.name);
  const divDateTime = $("<div></div>");
  divDateTime.attr("id", "DateTime");
  divDateTime.addClass("text-muted small mb-0");
  divDateTime.html(moment(comment.comdate).startOf("hour").fromNow());

  divProfileInfo.append(h6Name);
  divProfileInfo.append(divDateTime);

  divFlex.append(imgAvatar);
  divFlex.append(divProfileInfo);

  const pText = $("<p></p>");
  pText.attr("id", "textid");
  pText.addClass("mt-3 mb-4 pb-2 text-break");
  pText.html(comment.comtext);

  const divSmall = $("<div></div>");
  divSmall.addClass("small d-flex justify-content-start ");

  const linkLike = $("<a></a>");
  linkLike.attr("href", "#!");
  linkLike.attr("id", "");
  linkLike.addClass("d-flex align-items-center me-3");

  const iLike = $("<i></i>");

  const pLike = $("<p></p>");
  pLike.addClass("comlike mb-0");

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
  imgFooterAvatar.attr("src", comment.profilePic);
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

function sectionHTML(loggedInUser, processedTweet, id, likeId, index) {
  const section = $("<section></section>");
  section.attr("id", `${id}`);
  section.css("background-color", "");
  section.addClass(" pb-1");

  const divContainer = $("<div></div>");
  divContainer.addClass("container col-lg-12 my-3 py-3");

  let spanClose = null;
  if (processedTweet.user === loggedInUser.id) {
    spanClose = $("<span></span>");
    spanClose.attr("id", `span`);
    spanClose.addClass("float-end");
    spanClose.css("cursor", "pointer");
    spanClose.text("X");
    spanClose.on("click", function (e) {
      e.preventDefault();
      const token = localStorage.getItem("token");

      $.ajax({
        url: `http://192.168.1.37:3001/tweets/${id}`,
        method: "DELETE",
        beforeSend: function (xhr) {
          xhr.setRequestHeader("Authorization", `bearer ${token}`);
        },
        success: function (response) {
          console.log("Veri başarıyla silindi");
        },
        error: function (xhr, status, error) {
          console.error("Veri silme hatası:", error);
        },
      });
      $(this).closest("section").remove();
    });
  }

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
  imgAvatar.attr("src", processedTweet.profilePic);
  imgAvatar.attr("alt", "avatar");
  imgAvatar.attr("width", "60");
  imgAvatar.attr("height", "60");
  imgAvatar.addClass("rounded-circle shadow-1-strong me-3");

  const divProfileInfo = $("<div></div>");
  const h6Name = $("<h6></h6>");
  h6Name.addClass("fw-bold text-primary mb-1 d-flex ");
  h6Name.html(processedTweet.name);
  const divDateTime = $("<div></div>");
  divDateTime.attr("id", "DateTime");
  divDateTime.addClass("text-muted small mb-0");
  divDateTime.html(moment(processedTweet.date).endOf("hour").fromNow());

  divProfileInfo.append(h6Name);
  divProfileInfo.append(divDateTime);

  divFlex.append(imgAvatar);
  divFlex.append(divProfileInfo);

  const pText = $("<p></p>");
  pText.attr("id", "textid");
  pText.addClass("mt-3 mb-4 pb-2 text-break");
  pText.html(processedTweet.text);

  const divSmall = $("<div></div>");
  divSmall.addClass("small d-flex justify-content-start ");

  const linkLike = $("<a></a>");
  linkLike.attr("href", "#!");
  linkLike.attr("id", `${likeId}`);
  linkLike.addClass("d-flex align-items-center me-3");
  linkLike.on("click", function () {
    getLikeUnlike(
      processedTweet.id,
      processedTweet.is_liked,
      processedTweet.like,
      pLike,
      index
    );
  });

  const iLike = $("<i></i>");
  iLike.addClass("far fa-thumbs-up me-2");

  const pLike = $("<p></p>");
  pLike.addClass("like mb-0");
  pLike.text("Like: ");
  pLike.html("Like: " + processedTweet.like);

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
  imgFooterAvatar.attr("src", processedTweet.profilePic);
  imgFooterAvatar.attr("alt", "avatar");
  imgFooterAvatar.attr("width", "40");
  imgFooterAvatar.attr("height", "40");
  imgFooterAvatar.addClass("rounded-circle shadow-1-strong me-2");

  const divTextarea = $("<div></div>");
  divTextarea.addClass("form-outline w-100 mr-3");

  const textareaComment = $("<textarea></textarea>");
  textareaComment.attr("id", `textAreaExample-${id}`);
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
  btnShare.addClass("tweetBox_tweetButton");
  btnShare.text("Yanıtla");
  btnShare.on("click", function () {
    const token = localStorage.getItem("token");
    const textareaValue = $(`#textAreaExample-${id}`);
    console.log(textareaValue);
    const data = {
      comment_text: textareaValue.val(),
      post_id: id,
    };
    $.ajax({
      url: `http://192.168.1.37:3001/comments`,
      method: "POST",
      data: data,
      beforeSend: function (xhr) {
        xhr.setRequestHeader("Authorization", `bearer ${token}`);
      },
      success: function (response) {
        console.log(response);
        const comment = {
          id: response.comment.post_id,
          user: response.comment.comment_user,
          comId: response.comment.comment_id,
          comtext: response.comment.comment_text,
          comdate: response.comment.created_at,
          profilePic: "image/blank-profile-picture-973460_960_720.webp",
          name: response.comment.username,
        };
        console.log(comment);

        if (textareaValue.val() !== "") {
          sectionComment(
            loggedInUser,
            comment,
            id,
            comment.comId,
            comment.comtext,
            comment.date,
            comment.profilePic,
            comment.name
          );
          textareaValue.val("");
          console.log(textareaValue);
        }
        console.log("Veri başarıyla gönderildi");
      },
      error: function (xhr, status, error) {
        console.error("Veri gönderme hatası:", error);
      },
    });
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

function getLikeUnlike(id, is_liked, like, pLike, index) {
  const token = localStorage.getItem("token");
  if (!token) {
    console.error("Token not found!");
    return;
  }
  console.log(arr[index]);
  if (arr[index].is_liked === true) {
    $.ajax({
      url: `http://192.168.1.37:3001/likes/${id}`,
      type: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },

      success: function (data) {
        console.log("Like removed successfully");
        arr[index].is_liked = false;
        arr[index].like--;
        pLike.html("Like: " + arr[index].like);
      },
      error: function (error) {
        console.error("Error removing like:", error);
      },
    });
  } else {
    $.ajax({
      url: `http://192.168.1.37:3001/likes/${id}`,
      type: "POST",
      beforeSend: function (xhr) {
        xhr.setRequestHeader("Authorization", `bearer ${token}`);
      },
      success: function (data) {
        console.log("Liked successfully", data);

        arr[index].like++;
        pLike.html("Like: " + arr[index].like);
        arr[index].is_liked = true;
      },
      error: function (error) {
        console.error("Error fetching liked users:", error);
      },
    });
  }
}

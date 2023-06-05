$(document).ready(function() {
  // Comment counter
  let commentCounter = 0;

  // Submit comment
  $("#submit-comment").click(function() {
    const displayName = $("#display-name").val().trim();
    const commentText = $("#comment-text").val().trim();

    if (displayName === "" || commentText === "") {
      return;
    }

    const comment = createComment(displayName, commentText, commentCounter);
    $("#comments").prepend(comment);

    // Increment comment counter
    commentCounter++;

    // Clear input fields
    $("#display-name").val("");
    $("#comment-text").val("");
  });

  // Delete comment
  $(document).on("click", ".delete-comment", function() {
    $(this).closest(".comment").remove();
  });

  // Edit comment
  $(document).on("click", ".edit-comment", function() {
    const comment = $(this).closest(".comment");
    const commentText = comment.find(".comment-text");

    const currentText = commentText.text();
    const editTextarea = $("<textarea>").addClass("edit-textarea").val(currentText);
    commentText.replaceWith(editTextarea);

    const editActions = $("<div>").addClass("edit-actions");
    const saveButton = $("<button>").addClass("save-button").text("Save");
    const cancelButton = $("<button>").addClass("cancel-button").text("Cancel");
    editActions.append(saveButton, cancelButton);
    comment.append(editActions);

    saveButton.click(function() {
      const newText = editTextarea.val().trim();
      if (newText !== "") {
        commentText.text(newText);
      }
      editTextarea.replaceWith(commentText);
      editActions.remove();
    });

    cancelButton.click(function() {
      editTextarea.replaceWith(commentText);
      editActions.remove();
    });
  });

  // Helper function to create a comment HTML element
  function createComment(displayName, commentText, commentId) {
    const comment = $("<div>").addClass("comment");
    const userPicture = $("<div>").addClass("user-picture");
    const userImage = $("<img>").attr("src", "simple-round-user-icon-or-person-icon-vector-46949107.jpg" ).attr("alt", "User Picture");
    const commentContent = $("<div>").addClass("comment-content");
    const displayNameElement = $("<div>").addClass("display-name").text(displayName);
    const commentTextElement = $("<div>").addClass("comment-text").text(commentText);
    const actions = $("<div>").addClass("actions");
    const editButton = $("<button>").addClass("edit-comment").text("Edit");
    const deleteButton = $("<button>").addClass("delete-comment").text("Delete");

    userPicture.append(userImage);
    commentContent.append(displayNameElement, commentTextElement);
    actions.append(editButton, deleteButton);
    comment.append(userPicture, commentContent, actions);

    comment.attr("data-comment-id", commentId);

    return comment;
  }
});

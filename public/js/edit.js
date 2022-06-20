let post_id = window.location.toString().split("/")[
  window.location.toString().split("/").length - 1
];
post_id = post_id.split("?")[0];

const editFormHandler = async function (event) {
  event.preventDefault();

  console.log(post_id);

  const title = document.querySelector('input[name="post-title"]').value;
  const body = document.querySelector('input[name="post-body"]').value;

  await fetch(`/api/post/${post_id}`, {
    method: "PUT",
    body: JSON.stringify({
      title,
      body,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  document.location.replace("/dashboard");
};

const deleteClickHandler = async function () {
  await fetch(`/api/post/${post_id}`, {
    method: "DELETE",
  });

  document.location.replace("/dashboard");
};

document
  .querySelector("#edit-post-form")
  .addEventListener("submit", editFormHandler);
document
  .querySelector("#delete-btn")
  .addEventListener("click", deleteClickHandler);
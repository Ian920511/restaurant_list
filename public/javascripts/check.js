const deleteCheck = document.querySelector(".to-delete");

deleteCheck.addEventListener("click", (event) => {
  if (event.target.classList.contains("btn-danger")) {
    alert("Are you sure to delete the restaurant?");
  }
});

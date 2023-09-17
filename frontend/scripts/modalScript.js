
// Get modal and close button elements
const modal = document.getElementById("infoModal");
const closeModal = document.getElementById("closeModal");

// Get the "Info" button element
const infoButton = document.getElementById("infoButton");

// Show the modal when the "Info" button is clicked
infoButton.addEventListener("click", () => {
  modal.style.display = "block";
});

// Close the modal when the close button is clicked
closeModal.addEventListener("click", () => {
  modal.style.display = "none";
});

// Close the modal if the user clicks outside of it
window.addEventListener("click", (event) => {
  if (event.target === modal) {
    modal.style.display = "none";
  }
});
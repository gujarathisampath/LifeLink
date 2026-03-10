const genderSelect = document.getElementById("gender");
const femaleFields = document.getElementById("femaleFields");

genderSelect.addEventListener("change", () => {
  if (genderSelect.value === "female") {
    femaleFields.classList.remove("hidden");
  } else {
    femaleFields.classList.add("hidden");
  }
});

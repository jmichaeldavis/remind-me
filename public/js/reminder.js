const createReminder = document.getElementById("create-reminder");

function getSelectedCheckboxes() {
  event.preventDefault();
  const checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
  const selectedCheckboxes = [];

  checkboxes.forEach(function (checkbox) {
    selectedCheckboxes.push(checkbox.value);
  });
  const reminderTitle = document.getElementById("post-name").value.trim();
  const reminderBody = document.getElementById("post-desc").value.trim();
  const monthString = `${selectedCheckboxes}`;

  const reminderData = {
    task_title: reminderTitle,
    task_description: reminderBody,
    months: monthString,
  };

  fetch("/api/reminders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(reminderData),
  })
    .then((response) => {
      document.location.replace("/");
      console.log(response);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
  console.log(reminderData);
  return;
}

const delButtonHandler = async (event) => {
  if (event.target.hasAttribute("data-id")) {
    const id = event.target.getAttribute("data-id");

    const response = await fetch(`/api/reminders/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      document.location.replace("/");
    } else {
      alert("Failed to delete reminder");
    }
  }
};

createReminder.addEventListener("click", getSelectedCheckboxes);

document.querySelector(".reminder-list").addEventListener("click", delButtonHandler);

const createReminder = document.getElementById("create-reminder");
const newReminderBtn = document.getElementById("addReminder");
const closeReminderBtn = document.getElementById("closeButton");
// const deleteBtn = document.getElementById("delete-btn");
// const reminderId = deleteBtn.getAttribute('data-id');
// const addDeleteEvent = function (button) {
//     for (var i = 0; i < button.length; i++) {
//         button[i].addEventListener('click', deleteReminder,
//         )
//     }
// };

function getSelectedCheckboxes(event) {
    event.preventDefault();
    const checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
    const selectedCheckboxes = [];
    closeForm()
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
            console.log(response);
            // response.json())

        })
        .catch((error) => {
            console.error("Error:", error);
        });
    console.log(reminderData);
    // console.log(selectedCheckboxes);
    // console.log(monthString);
    showNewReminderBtn();
    window.location.reload();
    return;
}

// TEMP= "0 0 8 1 `${monthsSelected}` *"

function hideNewReminderBtn() {
    newReminderBtn.style.display = "none"
}

function showNewReminderBtn() {
    newReminderBtn.style.display = "block"
}

function openForm() {
    document.getElementById("myReminder").style.display = "block";
    hideNewReminderBtn();
}

function closeForm() {
    document.getElementById("myReminder").style.display = "none";
    showNewReminderBtn();
}

function returnHomePage() {
    console.log('this is working');
    document.location.replace('/');
}

const deleteReminder = function () {
    // fetch(`/api/reminders/${reminderId}`, {
    //     method: "DELETE",
    // })
    //     .then((response) => {
    //         console.log(response);
    //         // response.json())

    //     })
    //     .catch((error) => {
    //         console.error("Error:", error);
    //     });

    // returnHomePage();
    // return;
    console.log("test")
}

createReminder.addEventListener("click", getSelectedCheckboxes);

newReminderBtn.addEventListener("click", openForm);

closeReminderBtn.addEventListener("click", closeForm);

// deleteBtn.addEventListener("click", deleteReminder);
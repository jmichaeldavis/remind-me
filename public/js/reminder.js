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
    const monthString = `0 0 8 1 ${selectedCheckboxes} *`

    const reminderData = {
        task_title: reminderTitle,
        task_description: reminderBody,
        months: monthString
    };

    fetch('/api/reminders', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(reminderData)
    })
    .then((response) => {
        console.log(response);
        // response.json())
    })
    .catch((error) => {
        console.error('Error:', error);
    });
    console.log(reminderData);
    // console.log(selectedCheckboxes);
    // console.log(monthString);
    return selectedCheckboxes;
  }

  

// TEMP= "0 0 8 1 `${monthsSelected}` *"


createReminder.addEventListener("click", getSelectedCheckboxes);

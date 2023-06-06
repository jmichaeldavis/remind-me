
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

document.querySelector(".delete-btn").addEventListener("click", delButtonHandler);
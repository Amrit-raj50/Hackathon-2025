// ======== ADD NEW ROW BUTTON =========
const newRowBtn = document.createElement("button");
newRowBtn.id = "newRow";
newRowBtn.textContent = "+ Add Row";
newRowBtn.style.cssText = `
  background-color: #006FEE;
  color: white;
  border: none;
  padding: 10px 20px;
  margin: 20px;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
`;

// Add the button above the table container
document.querySelector(".end").prepend(newRowBtn);

// ======== NEW ROW FUNCTIONALITY =========
newRowBtn.addEventListener("click", () => {
  const table = document.querySelector(".tab");

  // Create a new row
  const newRow = document.createElement("tr");

  for (let i = 0; i < 8; i++) {
    const td = document.createElement("td");
    const input = document.createElement("input");
    input.type = "text";
    input.className = "inp";
    td.appendChild(input);
    newRow.appendChild(td);
  }

  // Append the new row to the existing table
  table.appendChild(newRow);

  // Show popup using your existing function with Upload/New button color
  showPopup("New Row Added ✅", "#006FEE");
});

function showPopup(message) {
    const popup = document.getElementById('popupMsg');
    popup.textContent = message;
    popup.classList.add('show');
    setTimeout(() => {
        popup.classList.remove('show');
    }, 2000);
}

document.addEventListener('DOMContentLoaded', function() {
    const addRowBtn = document.getElementById('addRowBtn');
    if (addRowBtn) {
        addRowBtn.addEventListener('click', function() {
            showPopup('Row added successfully!');
            // ...your code to actually add a row...
        });
    }
});
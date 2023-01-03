const cardTemplate = document.querySelector("[card-template]");
const cardSection = document.querySelector("[card-section]");
const input = document.getElementById("search");

let users = [];

input.addEventListener("input", (e) => {
  const valToLowerText = e.target.value.toLowerCase();

  console.log(users);
  users.forEach((user) => {
    const isVisible =
      user.name.toLowerCase().includes(valToLowerText) ||
      user.email.toLowerCase().includes(valToLowerText);

    user.element.classList.toggle("hide", !isVisible);
  });
});

fetch("https://jsonplaceholder.typicode.com/users")
  .then((res) => res.json())
  .then((data) => {
    users = data.map((item) => {
      const cardData = cardTemplate.content.cloneNode(true).children[0];
      const header = cardData.querySelector("[heading]");
      const email = cardData.querySelector("[email]");
      header.textContent = item.name;
      email.textContent = item.email;

      cardSection.append(cardData);

      return { name: item.name, email: item.email, element: cardData };
    });
  });

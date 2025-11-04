document.getElementById("contactForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const message = document.getElementById("message").value;

  const res = await fetch("http://localhost:5000/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, message }),
  });

  const data = await res.json();
  const responseMsg = document.getElementById("responseMessage");

  if (res.ok) {
    responseMsg.textContent = data.success;
  } else {
    responseMsg.textContent = data.error;
  }

  e.target.reset();
});

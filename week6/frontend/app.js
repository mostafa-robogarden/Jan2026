// frontend_clean/app.js
const API_BASE = "http://localhost:3000";

const output = document.getElementById("output");
const employeesDiv = document.getElementById("employees");

function show(obj) {
  output.textContent = JSON.stringify(obj, null, 2);
}

async function api(path, options = {}) {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { "Content-Type": "application/json", ...(options.headers || {}) },
    ...options,
  });

  const text = await res.text();
  let data;
  try { data = JSON.parse(text); } catch { data = { raw: text }; }

  if (!res.ok) throw { status: res.status, data };
  return data;
}

function renderEmployees(users) {
  if (!Array.isArray(users) || users.length === 0) {
    employeesDiv.innerHTML = "<p class='muted'>No employees yet.</p>";
    return;
  }

  const rows = users.map(u => `
    <tr>
      <td>${u.username}</td>
      <td>${u.role ?? ""}</td>
      <td>${u.created_on ? new Date(u.created_on).toLocaleString() : ""}</td>
    </tr>
  `).join("");

  employeesDiv.innerHTML = `
    <table>
      <thead>
        <tr><th>Username</th><th>Role</th><th>Created</th></tr>
      </thead>
      <tbody>${rows}</tbody>
    </table>
  `;
}

document.getElementById("btnLoad").addEventListener("click", async () => {
  try {
    const users = await api("/employees");
    renderEmployees(users);
    show(users);
  } catch (err) {
    show(err);
  }
});

document.getElementById("btnCreate").addEventListener("click", async () => {
  try {
    const username = document.getElementById("createUsername").value.trim();
    const password = document.getElementById("createPassword").value;
    const role = document.getElementById("createRole").value;

    const created = await api("/employees", {
      method: "POST",
      body: JSON.stringify({ username, password, role }),
    });

    show(created);

    const users = await api("/employees");
    renderEmployees(users);
  } catch (err) {
    show(err);
  }
});

document.getElementById("btnLogin").addEventListener("click", async () => {
  try {
    const username = document.getElementById("loginUsername").value.trim();
    const password = document.getElementById("loginPassword").value;

    const result = await api("/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
    });

    show(result);
  } catch (err) {
    show(err);
  }
});

(async () => {
  try {
    const users = await api("/employees");
    renderEmployees(users);
    show(users);
  } catch (err) {
    show(err);
  }
})();

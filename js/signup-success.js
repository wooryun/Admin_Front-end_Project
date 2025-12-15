const summaryEl = document.getElementById("signupSummary");
const darkModeToggle = document.getElementById("darkModeToggle");
const THEME_KEY = "preferredTheme";

const applyTheme = (mode) => {
  if (mode === "dark") {
    document.body.classList.add("dark-mode");
    if (darkModeToggle) darkModeToggle.textContent = "라이트 모드";
  } else {
    document.body.classList.remove("dark-mode");
    if (darkModeToggle) darkModeToggle.textContent = "다크 모드";
  }
};

applyTheme(localStorage.getItem(THEME_KEY) || "light");

if (darkModeToggle) {
  darkModeToggle.addEventListener("click", () => {
    const next = document.body.classList.contains("dark-mode") ? "light" : "dark";
    localStorage.setItem(THEME_KEY, next);
    applyTheme(next);
  });
}

const data = localStorage.getItem("signupData");
if (data && summaryEl) {
  const { id, name, phone, gender, email } = JSON.parse(data);
  const items = [
    `아이디: ${id || "-"}`,
    `이름: ${name || "-"}`,
    `전화번호: ${phone || "-"}`,
    `성별: ${gender || "-"}`,
    `이메일: ${email || "-"}`,
  ];
  summaryEl.innerHTML = items.map((item) => `<li>${item}</li>`).join("");
}
localStorage.removeItem("signupData");

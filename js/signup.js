const signupForm = document.getElementById("signupForm");
const darkModeToggle = document.getElementById("darkModeToggle");
const THEME_KEY = "preferredTheme";

const validators = {
  id: (value) => /^[a-zA-Z0-9]{4,12}$/.test(value),
  password: (value) =>
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_\-+=\[\]{};':"\\|,.<>/?]).{8,30}$/.test(
      value
    ),
  phone: (value) => /^01[016789]-?\d{3,4}-?\d{4}$/.test(value),
};

const normalizePhone = (value) => value.replace(/[^0-9]/g, "");

if (signupForm) {
  signupForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(signupForm);
    const id = formData.get("id").trim();
    const password = formData.get("password");
    const passwordConfirm = formData.get("passwordConfirm");
    const name = formData.get("name").trim();
    const phoneRaw = formData.get("phone").trim();
    const phone = normalizePhone(phoneRaw);
    const email = formData.get("email").trim();
    const gender = formData.get("gender") === "female" ? "여자" : "남자";

    const errors = [];
    if (!validators.id(id)) {
      errors.push("아이디는 영문/숫자 4~12자로 입력해주세요.");
    }
    if (!validators.password(password)) {
      errors.push("비밀번호는 영문, 숫자, 특수문자를 포함한 8~30자여야 합니다.");
    }
    if (password !== passwordConfirm) {
      errors.push("비밀번호 확인이 일치하지 않습니다.");
    }
    if (!validators.phone(phone)) {
      errors.push("전화번호 형식이 올바르지 않습니다. 예) 01012345678");
    }
    if (!email) {
      errors.push("이메일을 입력해주세요.");
    }

    if (errors.length > 0) {
      alert(errors.join("\n"));
      return;
    }

    const summaryData = { id, name, phone, gender, email };
    localStorage.setItem("signupData", JSON.stringify(summaryData));

    window.location.href = "signup-success.html";
  });
}

const applyTheme = (mode) => {
  if (!darkModeToggle) return;
  if (mode === "dark") {
    document.body.classList.add("dark-mode");
    darkModeToggle.textContent = "라이트 모드";
  } else {
    document.body.classList.remove("dark-mode");
    darkModeToggle.textContent = "다크 모드";
  }
};

applyTheme(localStorage.getItem(THEME_KEY) || "light");

if (darkModeToggle) {
  darkModeToggle.addEventListener("click", () => {
    const nextTheme = document.body.classList.contains("dark-mode")
      ? "light"
      : "dark";
    localStorage.setItem(THEME_KEY, nextTheme);
    applyTheme(nextTheme);
  });
}

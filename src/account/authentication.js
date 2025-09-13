// регистрация - вход
document.addEventListener("DOMContentLoaded", () => {
    const authModal = document.getElementById('authModal');
    const authClose = document.getElementById('authClose');
    const tabs = document.querySelectorAll('.tab-btn');
    const authTitle = document.getElementById('authTitle');
    const switchLink = document.getElementById('switchLink');
    const switchMessage = document.getElementById('switchMessage');
    const loginBtn = document.getElementById('loginBtn');
    const regBtn = document.getElementById('regBtn');
  
    let mode = "register";
    let tab = "email";
  
    function updateForms() {
        document.querySelectorAll('.auth-form').forEach(f => f.style.display = "none");
        if (mode === "register" && tab === "email") document.getElementById('registerEmail').style.display = "flex";
        if (mode === "register" && tab === "phone") document.getElementById('registerPhone').style.display = "flex";
        if (mode === "login" && tab === "email") document.getElementById('loginEmail').style.display = "flex";
        if (mode === "login" && tab === "phone") document.getElementById('loginPhone').style.display = "flex";
      
        authTitle.textContent = mode === "register" ? "Регистрация" : "Войти";
        switchMessage.textContent = mode === "register" ? "УЖЕ ЕСТЬ АККАУНТ?" : "НЕТ АККАУНТА?";
        switchLink.textContent = mode === "register" ? "ВОЙТИ" : "ЗАРЕГИСТРИРОВАТЬСЯ";
      }
      
  
    // Табы
    tabs.forEach(t => {
      t.addEventListener('click', () => {
        tabs.forEach(btn => btn.classList.remove('active'));
        t.classList.add('active');
        tab = t.dataset.tab;
        updateForms();
      });
    });
  
    // Переключение Вход / Регистрация
    switchLink.addEventListener('click', e => {
      e.preventDefault();
      mode = (mode === "register") ? "login" : "register";
      updateForms();
    });
  
    // Закрыть модалку
    authClose.addEventListener('click', () => authModal.classList.remove('active'));
    authModal.addEventListener('click', e => { if (e.target === authModal) authModal.classList.remove('active'); });
  
    // Кнопки из шапки
    loginBtn?.addEventListener('click', () => {
      mode = "login";
      authModal.classList.add('active');
      updateForms();
    });
  
    regBtn?.addEventListener('click', () => {
      mode = "register";
      authModal.classList.add('active');
      updateForms();
    });
  });

// формат ввода +7 по полям
document.addEventListener("DOMContentLoaded", () => {
  function maskPhone(input) {
    input.addEventListener('input', () => {
      let value = input.value.replace(/\D/g, ''); // только цифры
      if (value.startsWith("7")) {
        value = value.slice(1); // первая "7" уже есть в шаблоне
      }

      let result = "+7 (";
      if (value.length > 0) result += value.substring(0, 3);
      if (value.length >= 3) result += ") " + value.substring(3, 6);
      if (value.length >= 6) result += "-" + value.substring(6, 8);
      if (value.length >= 8) result += "-" + value.substring(8, 10);

      input.value = result;
    });

    input.addEventListener('focus', () => {
      if (input.value === "") {
        input.value = "+7 (";
      }
    });

    input.addEventListener('blur', () => {
      if (input.value === "+7 (") {
        input.value = ""; // очищаем, если ничего не ввели
      }
    });
  }

  document.querySelectorAll('.phone-input').forEach(maskPhone);
});

// двухшаговые формы (сначала email/телефон, потом пароль)
document.addEventListener("DOMContentLoaded", () => {
    const errorModal = document.getElementById('errorModal');
    const errorMessage = document.getElementById('errorMessage');
    const errorClose = document.getElementById('errorClose');
    const errorOk = document.getElementById('errorOk');
  
    function showError(msg) {
      errorMessage.textContent = msg;
      errorModal.classList.add("active");
    }
  
    function hideError() {
      errorModal.classList.remove("active");
    }
  
    errorClose.addEventListener("click", hideError);
    errorOk.addEventListener("click", hideError);
    errorModal.addEventListener("click", e => {
      if (e.target === errorModal) hideError();
    });
  
    // Валидация форм
    document.querySelectorAll('.auth-form').forEach(form => {
      const step1 = form.querySelector('.step-1');
      const step2 = form.querySelector('.step-2');
      const nextBtn = form.querySelector('.next-btn');
  
      if (nextBtn && step1 && step2) {
        nextBtn.addEventListener('click', () => {
          const input = step1.querySelector('input');
          const emailPattern = /^[a-zA-Z0-9._-]+@(gmail\.com|mail\.ru|yahoo\.com)$/;
  
          if (input && input.type === "email") {
            if (input.value.trim() !== "" && emailPattern.test(input.value)) {
              step1.style.display = "none";
              step2.style.display = "flex";
            } else {
              input.focus();
              showError("Введите корректный e-mail (gmail.com, mail.ru или yahoo.com)");
            }
          } else if (input && input.type === "tel") {
            if (input.value.trim().length > 10) {
              step1.style.display = "none";
              step2.style.display = "flex";
            } else {
              input.focus();
              showError("Введите корректный номер телефона");
            }
          }
        });
      }
    });
  });
  
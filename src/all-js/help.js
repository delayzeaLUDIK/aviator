document.addEventListener("DOMContentLoaded", () => {
    const supportBtn = document.querySelector('.nav-item'); // твоя кнопка Поддержка
    const supportModal = document.getElementById('supportModal');
    const supportClose = document.getElementById('supportClose');
  
    supportBtn.addEventListener('click', () => {
      supportModal.classList.add('active');
    });
  
    supportClose.addEventListener('click', () => {
      supportModal.classList.remove('active');
    });
  
    supportModal.addEventListener('click', e => {
      if (e.target === supportModal) supportModal.classList.remove('active');
    });
  });
  
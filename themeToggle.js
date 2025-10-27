document.addEventListener('DOMContentLoaded', () => {
  const toggleBtn = document.getElementById('themeToggle');
  const body = document.body;

  if (localStorage.getItem('theme') === 'dark') {
    body.classList.add('dark-mode');
    toggleBtn.textContent = "☀️";
  }

  toggleBtn.addEventListener('click', () => {
    body.classList.toggle('dark-mode');

    if (body.classList.contains('dark-mode')) {
      localStorage.setItem('theme', 'dark');
      toggleBtn.textContent = "☀️";
    } else {
      localStorage.setItem('theme', 'light');
      toggleBtn.textContent = "🌙";
    }
  });

  const menuItems = document.querySelectorAll('#mainNavbar a');
  let currentIndex = 0;

  if (menuItems.length > 0) {
    menuItems[currentIndex].setAttribute('tabindex', '0');
    menuItems[currentIndex].focus();
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') {
      menuItems[currentIndex].setAttribute('tabindex', '-1');
      currentIndex = (currentIndex + 1) % menuItems.length;
      menuItems[currentIndex].setAttribute('tabindex', '0');
      menuItems[currentIndex].focus();
    } else if (e.key === 'ArrowLeft') {
      menuItems[currentIndex].setAttribute('tabindex', '-1');
      currentIndex = (currentIndex - 1 + menuItems.length) % menuItems.length;
      menuItems[currentIndex].setAttribute('tabindex', '0');
      menuItems[currentIndex].focus();
    }
  });
});

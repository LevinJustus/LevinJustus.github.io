(() => {
  'use strict';
  const root = document.documentElement;
  const languageButton = document.getElementById('language');
  const themeButton = document.getElementById('theme');
  const read = key => { try { return localStorage.getItem(key); } catch { return null; } };
  const save = (key, value) => { try { localStorage.setItem(key, value); } catch {} };
  function language(value) {
    const lang = value === 'zh' ? 'zh' : 'en';
    root.lang = lang === 'zh' ? 'zh-CN' : 'en';
    document.querySelectorAll('[data-en][data-zh]').forEach(node => { node.textContent = node.dataset[lang]; });
    languageButton.textContent = lang === 'en' ? '中' : 'EN';
    languageButton.setAttribute('aria-label', lang === 'en' ? 'Switch to Chinese' : 'Switch to English');
    document.querySelector('nav').setAttribute('aria-label', lang === 'en' ? 'Main navigation' : '主要导航');
    save('yz-language', lang);
  }
  function theme(value) {
    const dark = value === 'dark';
    root.dataset.theme = dark ? 'dark' : 'light';
    themeButton.firstElementChild.textContent = dark ? '☀' : '☾';
    themeButton.setAttribute('aria-label', dark ? 'Switch to light theme' : 'Switch to dark theme');
    themeButton.setAttribute('aria-pressed', String(dark));
    document.querySelector('meta[name="theme-color"]').content = dark ? '#17181c' : '#faf9f7';
    save('yz-theme', root.dataset.theme);
  }
  language(read('yz-language'));
  theme(read('yz-theme') || 'light');
  languageButton.addEventListener('click', () => language(root.lang === 'en' ? 'zh' : 'en'));
  themeButton.addEventListener('click', () => theme(root.dataset.theme === 'dark' ? 'light' : 'dark'));
})();

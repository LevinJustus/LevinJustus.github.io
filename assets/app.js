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
    document.querySelector('meta[name="theme-color"]').content = dark ? '#15171b' : '#faf9f7';
    save('yz-theme-v2', root.dataset.theme);
  }
  language(read('yz-language'));
  theme(read('yz-theme-v2') || 'dark');
  document.querySelectorAll('.visual-toggle').forEach(button => {
    let pinned = false;
    const caption = button.closest('.work-media').querySelector('.image-caption');
    const overviewCaption = {en: caption.dataset.en, zh: caption.dataset.zh};
    const show = value => {
      button.classList.toggle('is-pinned', value);
      button.setAttribute('aria-pressed', String(value));
      button.querySelector('.overview-image').setAttribute('aria-hidden', String(value));
      button.querySelector('.method-image').setAttribute('aria-hidden', String(!value));
      caption.dataset.en = value ? 'Method overview' : overviewCaption.en;
      caption.dataset.zh = value ? '方法流程' : overviewCaption.zh;
      caption.textContent = root.lang === 'en' ? caption.dataset.en : caption.dataset.zh;
    };
    button.addEventListener('pointerenter', event => {
      if (event.pointerType === 'mouse') show(true);
    });
    button.addEventListener('pointerleave', event => {
      if (event.pointerType === 'mouse') show(pinned);
    });
    button.addEventListener('click', () => {
      pinned = !button.classList.contains('is-pinned');
      show(pinned);
    });
  });
  document.querySelectorAll('.contribution').forEach(details => {
    details.addEventListener('toggle', () => {
      const label = details.querySelector('.summary-end');
      label.dataset.en = details.open ? 'Close' : 'Explore';
      label.dataset.zh = details.open ? '收起' : '展开';
      label.textContent = root.lang === 'en' ? label.dataset.en : label.dataset.zh;
    });
  });
  const navLinks = [...document.querySelectorAll('nav a[href^="#"]')];
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        navLinks.forEach(link => {
          const active = link.hash === '#' + entry.target.id;
          link.classList.toggle('active', active);
          if (active) link.setAttribute('aria-current', 'location');
          else link.removeAttribute('aria-current');
        });
      });
    }, {rootMargin: '-15% 0px -55% 0px'});
    navLinks.forEach(link => {
      const section = document.querySelector(link.hash);
      if (section) observer.observe(section);
    });
  }
  languageButton.addEventListener('click', () => language(root.lang === 'en' ? 'zh' : 'en'));
  themeButton.addEventListener('click', () => theme(root.dataset.theme === 'dark' ? 'light' : 'dark'));
})();

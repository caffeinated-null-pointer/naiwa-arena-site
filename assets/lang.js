// 中英切换：只在本机记住选择，不联网、不追踪
(function () {
  var root = document.documentElement;
  var KEY = 'site-lang';
  var saved = null;
  try { saved = localStorage.getItem(KEY); } catch (e) {}
  var guess = (navigator.language || 'zh').toLowerCase().indexOf('zh') === 0 ? 'zh' : 'en';
  var titles = { zh: document.title, en: root.getAttribute('data-title-en') || document.title };

  function apply(lang) {
    root.setAttribute('data-lang', lang);
    root.setAttribute('lang', lang === 'en' ? 'en' : 'zh-CN');
    document.title = titles[lang];
    var btn = document.querySelector('.lang');
    if (btn) {
      btn.textContent = lang === 'en' ? '中文' : 'EN';
      btn.setAttribute('aria-label', lang === 'en' ? '切换到中文' : 'Switch to English');
    }
  }

  apply(saved === 'zh' || saved === 'en' ? saved : guess);

  document.addEventListener('DOMContentLoaded', function () {
    apply(root.getAttribute('data-lang'));
    var btn = document.querySelector('.lang');
    if (!btn) return;
    btn.addEventListener('click', function () {
      var next = root.getAttribute('data-lang') === 'en' ? 'zh' : 'en';
      try { localStorage.setItem(KEY, next); } catch (e) {}
      apply(next);
    });
  });
})();

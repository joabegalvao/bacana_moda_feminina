/* Bacana Moda Feminina
   Interações da página. Tudo aqui é melhoria progressiva: sem JavaScript,
   os links levam à seção de lojas e todos os looks ficam visíveis. */

(function () {
  'use strict';

  var root = document.documentElement;
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  /* Mensagens enviadas ao WhatsApp. Edite aqui para mudar o texto. */
  var MESSAGES = {
    general: 'Olá! Vi o site da Bacana e quero conhecer as peças.',
    look: 'Olá! Vi o look {look} no site da Bacana e quero saber cores e tamanhos disponíveis.'
  };

  /* ---------- Menu (celular e tablet) ---------- */

  function initMenu() {
    var toggle = document.querySelector('[data-menu-toggle]');
    var menu = document.querySelector('[data-menu]');
    if (!toggle || !menu) return;

    function setOpen(open) {
      toggle.setAttribute('aria-expanded', String(open));
      menu.classList.toggle('is-open', open);
    }

    function isOpen() {
      return toggle.getAttribute('aria-expanded') === 'true';
    }

    toggle.addEventListener('click', function () {
      setOpen(!isOpen());
    });

    menu.addEventListener('click', function (event) {
      if (event.target.closest('a')) setOpen(false);
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && isOpen()) {
        setOpen(false);
        toggle.focus();
      }
    });

    document.addEventListener('click', function (event) {
      if (isOpen() && !event.target.closest('[data-header]')) setOpen(false);
    });

    window.matchMedia('(min-width: 900px)').addEventListener('change', function (event) {
      if (event.matches) setOpen(false);
    });
  }

  /* ---------- Seletor de loja ---------- */

  function initStorePicker() {
    var dialog = document.querySelector('[data-picker]');
    var triggers = document.querySelectorAll('[data-store-picker]');
    if (!dialog || typeof dialog.showModal !== 'function') return;

    var lookLine = dialog.querySelector('[data-picker-look]');
    var lookName = lookLine ? lookLine.querySelector('strong') : null;
    var links = dialog.querySelectorAll('[data-phone]');

    function open(look) {
      var message = look ? MESSAGES.look.replace('{look}', look) : MESSAGES.general;

      links.forEach(function (link) {
        link.href = 'https://wa.me/' + link.dataset.phone + '?text=' + encodeURIComponent(message);
      });

      if (lookLine && lookName) {
        lookName.textContent = look || '';
        lookLine.hidden = !look;
      }

      dialog.showModal();
    }

    triggers.forEach(function (trigger) {
      trigger.addEventListener('click', function (event) {
        event.preventDefault();
        open(trigger.dataset.look);
      });
    });

    // Fecha ao clicar fora do painel
    dialog.addEventListener('click', function (event) {
      if (event.target === dialog) dialog.close();
    });

    // Fecha depois de escolher uma loja
    links.forEach(function (link) {
      link.addEventListener('click', function () {
        dialog.close();
      });
    });
  }

  /* ---------- Abas dos looks ---------- */

  function initTabs() {
    var tablist = document.querySelector('[data-tabs]');
    if (!tablist) return;

    var tabs = Array.prototype.slice.call(tablist.querySelectorAll('[role="tab"]'));
    var panels = tabs.map(function (tab) {
      return document.getElementById(tab.getAttribute('aria-controls'));
    });

    panels.forEach(function (panel, index) {
      panel.setAttribute('role', 'tabpanel');
      panel.setAttribute('aria-labelledby', tabs[index].id);
    });

    function select(index, options) {
      tabs.forEach(function (tab, i) {
        var active = i === index;
        tab.setAttribute('aria-selected', String(active));
        tab.tabIndex = active ? 0 : -1;
        panels[i].hidden = !active;
        panels[i].classList.remove('is-entering');
      });

      if (options && options.animate) {
        // reinicia a animação de entrada
        void panels[index].offsetWidth;
        panels[index].classList.add('is-entering');
      }
      if (options && options.focus) tabs[index].focus();
    }

    tabs.forEach(function (tab, index) {
      tab.addEventListener('click', function () {
        select(index, { animate: true });
      });

      tab.addEventListener('keydown', function (event) {
        var next = null;
        if (event.key === 'ArrowRight' || event.key === 'ArrowDown') next = (index + 1) % tabs.length;
        if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') next = (index - 1 + tabs.length) % tabs.length;
        if (event.key === 'Home') next = 0;
        if (event.key === 'End') next = tabs.length - 1;
        if (next === null) return;
        event.preventDefault();
        select(next, { animate: true, focus: true });
      });
    });

    tablist.hidden = false;
    select(0);
  }

  /* ---------- Revelação na rolagem ---------- */

  function initReveal() {
    var items = document.querySelectorAll('[data-reveal]');
    if (!items.length || reduceMotion.matches || !('IntersectionObserver' in window)) return;

    root.classList.add('motion-ok');

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });

    items.forEach(function (item) {
      observer.observe(item);
    });
  }

  /* ---------- Barra fixa no celular ---------- */

  function initStickyCta() {
    var bar = document.querySelector('[data-sticky-cta]');
    var hero = document.querySelector('.hero__actions');
    var stores = document.getElementById('lojas');
    var footer = document.querySelector('.footer');
    if (!bar || !hero || !('IntersectionObserver' in window)) return;

    bar.hidden = false;

    var state = { pastHero: false, nearContact: {} };

    function update() {
      var near = Object.keys(state.nearContact).some(function (key) {
        return state.nearContact[key];
      });
      var visible = state.pastHero && !near;
      bar.classList.toggle('is-visible', visible);
      // fora da tela, a barra também sai da navegação por teclado
      bar.querySelector('a').tabIndex = visible ? 0 : -1;
    }

    new IntersectionObserver(function (entries) {
      var entry = entries[0];
      state.pastHero = !entry.isIntersecting && entry.boundingClientRect.top < 0;
      update();
    }).observe(hero);

    var contactObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        state.nearContact[entry.target.id || entry.target.className] = entry.isIntersecting;
      });
      update();
    });

    [stores, document.querySelector('.closing'), footer].forEach(function (element) {
      if (element) contactObserver.observe(element);
    });

    update();
  }

  initMenu();
  initStorePicker();
  initTabs();
  initReveal();
  initStickyCta();
})();

'use strict';
(() => {
  const start = ['Готовые промпты и шаблоны для персонажей, сцен и озвучки', 'Одно творческое задание каждую неделю', 'Новые материалы каждый месяц'];
  const club = [...start, '4 разбора ИИ-роликов в месяц', 'Закрытый Telegram-чат участников', 'Один общий разбор работ в месяц'];
  const practice = [...club, 'Обратная связь по 2 твоим роликам в месяц', 'Рекомендации по промптам, сценам и монтажу'];
  const products = {
    guide: {title: 'Гайд по нейросетям', price: 500, contents: ['Запросы к ИИ', 'Изображения и персонажи', 'Цифровое руководство для самостоятельного изучения']},
    course: {title: 'Обучение созданию мультфильмов', price: 3000, contents: ['Сценарий и создание персонажей', 'Анимация, озвучка и монтаж ИИ-видео', 'Материалы для самостоятельного обучения; клуб приобретается отдельно']},
    start: {title: 'KotikMult Клуб · Старт', price: 500, contents: start},
    club: {title: 'KotikMult Клуб · Клуб', price: 1000, contents: club},
    practice: {title: 'KotikMult Клуб · Практика', price: 2000, contents: practice},
    author: {title: 'KotikMult Клуб · С автором', price: 3000, contents: [...club, 'Обратная связь по 4 твоим роликам в месяц', 'Рекомендации по промптам, сценам и монтажу', 'Одна личная консультация на 30 минут в месяц']}
  };
  const select = document.getElementById('product');
  const requested = new URLSearchParams(location.search).get('product');
  if (Object.hasOwn(products, requested)) select.value = requested;
  function updateSummary() {
    const product = products[select.value];
    document.getElementById('summaryTitle').textContent = product.title;
    document.getElementById('productPrice').textContent = product.price.toLocaleString('ru-RU') + ' ₽';
    document.getElementById('productContents').replaceChildren(...product.contents.map(text => {
      const li = document.createElement('li');
      li.textContent = text;
      return li;
    }));
    const url = new URL(location.href);
    url.searchParams.set('product', select.value);
    history.replaceState(null, '', url);
  }
  select.addEventListener('change', updateSummary);
  updateSummary();
  const details = document.getElementById('detailsPanel');
  const payment = document.getElementById('paymentPanel');
  document.getElementById('checkoutForm').addEventListener('submit', event => {
    event.preventDefault();
    if (!event.currentTarget.reportValidity()) return;
    details.hidden = true;
    payment.hidden = false;
    document.getElementById('detailsStep').removeAttribute('aria-current');
    document.getElementById('paymentStep').setAttribute('aria-current', 'step');
    document.getElementById('paymentTitle').focus();
    payment.scrollIntoView({block: 'start'});
  });
  document.getElementById('backToDetails').addEventListener('click', () => {
    payment.hidden = true;
    details.hidden = false;
    document.getElementById('paymentStep').removeAttribute('aria-current');
    document.getElementById('detailsStep').setAttribute('aria-current', 'step');
    select.focus();
  });
  // Keep the form inert without JavaScript: no native GET can leak contact data.
  document.getElementById('checkoutFields').disabled = false;
})();

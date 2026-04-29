/** Единый текст при проблемах с сетью (показываем пользователю) */
var POKER_NET_ERR =
  "Нет связи с сервером. Проверьте интернет и попробуйте снова или перезайдите в приложение.";

/** Таймаут одного HTTP-запроса (мс): обрывает зависшие соединения без смены Wi-Fi/LTE. */
var POKER_FETCH_TIMEOUT_MS = 20000;

/**
 * fetch с таймаутом (AbortController). Не дублирует signal из init - перезапись signal.
 */
function pokerFetchWithTimeout(url, init, timeoutMs) {
  var ms = timeoutMs != null && timeoutMs > 0 ? timeoutMs : POKER_FETCH_TIMEOUT_MS;
  var ac = new AbortController();
  var timer = setTimeout(function () {
    try {
      ac.abort();
    } catch (eAb) {}
  }, ms);
  var baseInit = init || {};
  var merged = {};
  var k;
  for (k in baseInit) {
    if (Object.prototype.hasOwnProperty.call(baseInit, k)) merged[k] = baseInit[k];
  }
  merged.signal = ac.signal;
  return fetch(url, merged).finally(function () {
    try {
      clearTimeout(timer);
    } catch (eCl) {}
  });
}

/**
 * Повтор при сетевой ошибке / таймауте / abort (1 попытка + повторы).
 * Успешный HTTP-ответ не разбирается - возвращается как у fetch.
 */
function pokerFetchRetry(url, init, opts) {
  opts = opts || {};
  var timeoutMs = opts.timeoutMs != null && opts.timeoutMs > 0 ? opts.timeoutMs : POKER_FETCH_TIMEOUT_MS;
  var maxAttempts = opts.maxAttempts != null && opts.maxAttempts > 0 ? opts.maxAttempts : 3;
  var retryDelayMs = opts.retryDelayMs != null && opts.retryDelayMs >= 0 ? opts.retryDelayMs : 650;
  function sleep(d) {
    return new Promise(function (resolve) {
      setTimeout(resolve, d);
    });
  }
  function run(attemptIndex) {
    return pokerFetchWithTimeout(url, init, timeoutMs).catch(function (err) {
      if (attemptIndex + 1 < maxAttempts) {
        return sleep(retryDelayMs * (attemptIndex + 1)).then(function () {
          return run(attemptIndex + 1);
        });
      }
      return Promise.reject(err);
    });
  }
  return run(0);
}

'use strict';
const SUBSCRIBERS_KEY = 'poker_app:table_subscription_push_subscribers';
function createService({getAccount, isBlocked, preferences, sendPush}) {
  async function status(user) {
    const accountId = await getAccount('tg_'+user);
    if (!accountId) return {subscribed:false,ready:false,error:'Откройте клубное приложение и войдите через этот Telegram-аккаунт. Если аккаунт уже есть, привяжите к нему этот Telegram. Затем вернитесь сюда и нажмите «Включить».'};
    if (await isBlocked(accountId)) return {accountId,subscribed:false,ready:false,error:'Доступ к аккаунту ограничен. Обратитесь к администратору клуба.'};
    const current = await preferences.status(accountId);
    const ready = current.notificationsEnabled && current.hasSubscription && current.pushConfigured;
    const error = !current.pushConfigured ? 'Пуши временно недоступны. Попробуйте позже.' : !ready ? 'Откройте профиль в установленном клубном приложении, включите пуш-уведомления и разрешите уведомления на устройстве. Затем вернитесь сюда и нажмите «Включить».' : '';
    return {...current,accountId,ready,error};
  }
  async function set(user,enabled) {
    const current = await status(user);
    if (enabled && !current.ready) return {ok:false,error:current.error};
    if (!current.accountId) return {ok:false,error:current.error};
    return preferences.setSubscription(current.accountId,enabled);
  }
  async function notify(user,{title,body,eventId}) {
    const current = await status(user);
    if (!current.ready || !current.subscribed) return 0;
    return sendPush(current.accountId,{title,body,kind:'table_subscription',tag:eventId,openUrl:'./?startapp=profile',dedupeKey:eventId,dedupeTtlSeconds:86400});
  }
  return {status,set,notify};
}
function defaultService() {
  const push = require('./chat-webpush-notify');
  const preferences = require('./raffle-tournament-push').createTournamentPushService({redisPipeline:require('./redis').pipeline,disabledKey:push.CHAT_PUSH_DISABLED,subscriptionPrefix:push.CHAT_PUSH_SUB_PREFIX,pushConfigured:()=>push.readVapidEnv().pushConfigured,subscribersKey:SUBSCRIBERS_KEY});
  return createService({getAccount:require('./account-id').getDtIdByUserId,isBlocked:async id=>(await require('./app-user-blocks').isAppUserBlocked(id)).blocked,preferences,sendPush:push.sendToMemberDevices});
}
module.exports = {createService,defaultService,SUBSCRIBERS_KEY};

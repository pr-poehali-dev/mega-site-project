export type Language = 'ru' | 'en';

interface Translations {
  [key: string]: {
    ru: string;
    en: string;
  };
}

export const translations: Translations = {
  title: {
    ru: 'МЕГА САЙТ',
    en: 'MEGA SITE',
  },
  online: {
    ru: 'Онлайн',
    en: 'Online',
  },
  balance: {
    ru: 'Баланс',
    en: 'Balance',
  },
  donate: {
    ru: 'Донат',
    en: 'Donate',
  },
  status: {
    ru: 'Статус',
    en: 'Status',
  },
  click: {
    ru: 'КЛИК',
    en: 'CLICK',
  },
  perClick: {
    ru: 'за клик',
    en: 'per click',
  },
  business: {
    ru: 'Бизнес',
    en: 'Business',
  },
  casino: {
    ru: 'Казино',
    en: 'Casino',
  },
  profile: {
    ru: 'Профиль',
    en: 'Profile',
  },
  settings: {
    ru: 'Настройки',
    en: 'Settings',
  },
  language: {
    ru: 'Язык',
    en: 'Language',
  },
  russian: {
    ru: 'Русский',
    en: 'Russian',
  },
  english: {
    ru: 'Английский',
    en: 'English',
  },
  accumulatedProfit: {
    ru: 'Накопленная прибыль',
    en: 'Accumulated Profit',
  },
  collectProfit: {
    ru: 'Забрать прибыль',
    en: 'Collect Profit',
  },
  bought: {
    ru: 'Куплено',
    en: 'Bought',
  },
  owned: {
    ru: 'В собственности',
    en: 'Owned',
  },
  buyFor: {
    ru: 'Купить за',
    en: 'Buy for',
  },
  coinsPerSec: {
    ru: 'монет/сек',
    en: 'coins/sec',
  },
  casinoTitle: {
    ru: 'Казино',
    en: 'Casino',
  },
  casinoInfo: {
    ru: 'Шанс выигрыша: 40% | Выплата: ×1.5',
    en: 'Win Chance: 40% | Payout: ×1.5',
  },
  bet: {
    ru: 'Ставка',
    en: 'Bet',
  },
  donateAmount: {
    ru: 'доната',
    en: 'donate',
  },
  buy: {
    ru: 'Купить',
    en: 'Buy',
  },
  caseTitle: {
    ru: 'Кейс',
    en: 'Case',
  },
  caseDescription: {
    ru: 'Машины, привилегии, деньги, донат',
    en: 'Cars, privileges, money, donate',
  },
  openFor: {
    ru: 'Открыть за',
    en: 'Open for',
  },
  currentStatus: {
    ru: 'Текущий статус',
    en: 'Current Status',
  },
  incomePerClick: {
    ru: 'Доход за клик',
    en: 'Income per Click',
  },
  businessesOwned: {
    ru: 'Бизнесов в собственности',
    en: 'Businesses Owned',
  },
  privilegeSystem: {
    ru: 'Система привилегий:',
    en: 'Privilege System:',
  },
  clickToast: {
    ru: 'Клик!',
    en: 'Click!',
  },
  waitToast: {
    ru: 'Подождите',
    en: 'Wait',
  },
  tooFastToast: {
    ru: 'Слишком быстро! Подождите секунду',
    en: 'Too fast! Wait a second',
  },
  newPrivilege: {
    ru: 'Новая привилегия!',
    en: 'New Privilege!',
  },
  youGotStatus: {
    ru: 'Вы получили статус',
    en: 'You got status',
  },
  error: {
    ru: 'Ошибка',
    en: 'Error',
  },
  alreadyOwned: {
    ru: 'У вас уже есть этот бизнес',
    en: 'You already own this business',
  },
  insufficientFunds: {
    ru: 'Недостаточно средств',
    en: 'Insufficient Funds',
  },
  need: {
    ru: 'Нужно',
    en: 'Need',
  },
  coins: {
    ru: 'монет',
    en: 'coins',
  },
  purchaseSuccess: {
    ru: 'Покупка успешна!',
    en: 'Purchase Successful!',
  },
  noProfit: {
    ru: 'Нет прибыли',
    en: 'No Profit',
  },
  profitNotAccumulated: {
    ru: 'Прибыль пока не накопилась',
    en: 'Profit not accumulated yet',
  },
  profitCollected: {
    ru: 'Прибыль собрана!',
    en: 'Profit Collected!',
  },
  win: {
    ru: 'Выигрыш!',
    en: 'Win!',
  },
  loss: {
    ru: 'Проигрыш',
    en: 'Loss',
  },
  privilege_hobo: {
    ru: '🎖️ Бомж',
    en: '🎖️ Hobo',
  },
  privilege_rich: {
    ru: '💰 Богач',
    en: '💰 Rich',
  },
  privilege_millionaire: {
    ru: '🏦 Миллионер',
    en: '🏦 Millionaire',
  },
  privilege_billionaire: {
    ru: '🚀 Миллиардер',
    en: '🚀 Billionaire',
  },
  privilege_cheater: {
    ru: '⚡ Читер',
    en: '⚡ Cheater',
  },
  privilege_vip: {
    ru: '👑 VIP',
    en: '👑 VIP',
  },
  privilege_hacker: {
    ru: '🎯 Хакер',
    en: '🎯 Hacker',
  },
  privilege_god: {
    ru: '🌟 Бог',
    en: '🌟 God',
  },
  business_1: {
    ru: '24/7 бизнес',
    en: '24/7 Business',
  },
  business_2: {
    ru: 'Офис',
    en: 'Office',
  },
  business_3: {
    ru: 'Компания ООО "Миллиардеры"',
    en: 'Billionaires LLC Company',
  },
  business_4: {
    ru: 'Арбитраж команда',
    en: 'Arbitrage Team',
  },
  business_5: {
    ru: 'Лучшая работа',
    en: 'Best Job',
  },
};

export const t = (key: string, lang: Language): string => {
  return translations[key]?.[lang] || key;
};

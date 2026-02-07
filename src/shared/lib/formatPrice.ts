const numberLocaleByLanguage: Record<string, string> = {
  uz: 'uz-UZ',
  ru: 'ru-RU',
  en: 'en-US'
};

export const formatPrice = (price: number, language: string) => {
  const locale = numberLocaleByLanguage[language] || 'uz-UZ';
  return new Intl.NumberFormat(locale).format(price) + ' so\'m';
};

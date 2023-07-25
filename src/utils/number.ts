enum LOCALE_CURRENCIES {
  'id-ID' = 'IDR',
}

interface HelperCurrencyObject {
  price: string | number
  fractionDigit?: number
  locales?: keyof typeof LOCALE_CURRENCIES
}

export const helperCurrency = (currencyObject: HelperCurrencyObject) => {
  const { price, fractionDigit = 0, locales = 'id-ID' } = currencyObject

  return new Intl.NumberFormat(locales, {
    style: 'currency',
    currency: LOCALE_CURRENCIES[locales],
    minimumFractionDigits: Number(fractionDigit),
    maximumFractionDigits: Number(fractionDigit),
  }).format(Number(price))
}

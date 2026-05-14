export const defaultLocale = 'en' as const;
export const locales = ['en', 'de'] as const;
export type Locale = (typeof locales)[number];

/** Configuration for creating locale-aware utilities */
export interface I18nConfig {
  /** The default locale (no URL prefix added) */
  defaultLocale: string;
  /** All supported locales */
  locales: readonly string[];
}

/** Function that generates locale-prefixed paths */
export type LocalePathFn = (path: string, locale: string) => string;

/**
 * Create a configured localePath function.
 *
 * Use this when your app has different locales than the default (en/de).
 * This avoids modifying shared code when adding new locales.
 *
 * @example
 * ```typescript
 * // For Croatian locale
 * const localePath = createLocalePath({
 *   defaultLocale: 'hr',
 *   locales: ['hr'],
 * });
 *
 * localePath('/contact', 'hr')  // → '/contact'
 * ```
 */
export function createLocalePath(config: I18nConfig): LocalePathFn {
  return (path: string, locale: string): string => {
    const clean = path.startsWith('/') ? path : `/${path}`;
    if (locale === config.defaultLocale) return clean;
    return `/${locale}${clean}`;
  };
}

/** Type-safe translation dictionary */
export type Translations = Record<string, string>;

/**
 * Get locale from URL pathname.
 * Returns the locale prefix if present, otherwise the default locale.
 */
export function getLocaleFromPath(pathname: string): Locale {
  const segment = pathname.split('/')[1];
  if (locales.includes(segment as Locale)) {
    return segment as Locale;
  }
  return defaultLocale;
}

/**
 * Build a locale-prefixed path.
 * For the default locale, no prefix is added (clean URLs).
 */
export const localePath = createLocalePath({ defaultLocale, locales });

/**
 * Get the alternate path for switching locale.
 * Strips current locale prefix (if any) and adds the new one.
 */
export function switchLocalePath(pathname: string, newLocale: Locale): string {
  const currentLocale = getLocaleFromPath(pathname);
  let basePath = pathname;

  // Strip current locale prefix
  if (currentLocale !== defaultLocale) {
    basePath = pathname.replace(`/${currentLocale}`, '') || '/';
  }

  return localePath(basePath, newLocale);
}

/**
 * Create a typed translation helper.
 * Usage: const t = useTranslations(translations.de);
 */
export function useTranslations(dict: Translations) {
  return (key: string): string => {
    return dict[key] ?? key;
  };
}

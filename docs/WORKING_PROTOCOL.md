# Рабочий протокол - Akuna Mini-App v2

## 📊 Статус-таблица

| Компонент | Статус | URL | Последняя проверка |
|-----------|--------|-----|-------------------|
| **API Health** | ✅ Работает | `/api/health` | 2025-10-14 14:18 |
| **Dashboard** | ✅ Работает | `/dashboard` | 2025-10-14 14:18 |
| **Mini-App** | ✅ Работает | `/miniapp` | 2025-10-14 14:18 |
| **Root Redirect** | ✅ Работает | `/` → `/dashboard` | 2025-10-14 14:18 |

## 🔧 Техническая конфигурация

### Production URL
- **Основной:** `https://akuna-miniapp-v2.vercel.app`
- **Альтернативный:** `https://akuna-miniapp-v2-aleksandr-ivashchenkos-projects.vercel.app`

### Заголовки безопасности
- **CSP:** `frame-ancestors 'self' https://*.telegram.org https://web.telegram.org https://*.t.me`
- **Cache-Control:** `no-store, no-cache, must-revalidate, proxy-revalidate`
- **X-Content-Type-Options:** `nosniff`
- **Referrer-Policy:** `strict-origin-when-cross-origin`

### Мониторинг
- **Smoke Tests:** Автоматически после каждого деплоя
- **Production Monitor:** Каждые 5 минут
- **Incident Response:** Автоматическое создание GitHub Issues

## ✅ Чек-лист приёмки

### Основные маршруты
- [x] `/api/health` → 200 OK, JSON `{"ok":true}`
- [x] `/dashboard` → 200 OK, HTML с CSP заголовками
- [x] `/miniapp` → 200 OK, HTML с Telegram WebView поддержкой
- [x] `/` → 307 Redirect на `/dashboard`

### Заголовки безопасности
- [x] CSP настроен для Telegram WebView
- [x] No-cache заголовки для критичных путей
- [x] X-Content-Type-Options: nosniff
- [x] Referrer-Policy настроен

### Мониторинг
- [x] GitHub Actions smoke tests настроены
- [x] Cron мониторинг каждые 5 минут
- [x] Автоматическое создание incident issues
- [x] Логирование всех проверок

### Telegram WebView совместимость
- [x] CSP frame-ancestors включает Telegram домены
- [x] Отсутствуют блокирующие X-Frame-Options
- [x] Поддержка unsafe-inline для стилей и скриптов
- [x] Правильные connect-src для API вызовов

## 🚨 Процедуры инцидентов

### При сбое smoke tests
1. Проверить статус деплоя в Vercel Dashboard
2. Проверить логи сборки
3. Убедиться в корректности Git коммита
4. При необходимости - откат к предыдущей версии

### При сбое production monitor
1. Автоматически создается GitHub Issue с меткой "incident"
2. Проверить доступность Vercel инфраструктуры
3. Проверить DNS и доменную конфигурацию
4. Уведомить команду через созданный Issue

### При проблемах с Telegram WebView
1. Проверить CSP заголовки
2. Убедиться в отсутствии X-Frame-Options
3. Проверить поддержку unsafe-inline
4. Тестировать в реальном Telegram WebView

## 📈 Метрики и мониторинг

### Smoke Tests
- **Триггеры:** Push в main, deployment_status: success
- **Проверки:** 4 маршрута с полной валидацией
- **Критерии:** HTTP статус, content-type, заголовки безопасности

### Production Monitor
- **Частота:** Каждые 5 минут
- **Проверки:** /api/health, /dashboard, /miniapp
- **Пороги:** 5xx статусы, >10s response time
- **Уведомления:** GitHub Issues с детальной информацией

## 🔄 Процедуры обновления

### Деплой новой версии
1. Push в main ветку
2. Автоматический деплой через Vercel
3. Запуск smoke tests
4. Мониторинг через production monitor

### Откат версии
1. Выбрать стабильную версию в Vercel Dashboard
2. Promote to production
3. Проверить smoke tests
4. Убедиться в работе всех маршрутов

## 📞 Контакты и эскалация

- **GitHub Issues:** Автоматическое создание при инцидентах
- **Vercel Dashboard:** Мониторинг деплоев и производительности
- **Telegram WebView:** Тестирование в реальной среде

---

**Последнее обновление:** 2025-10-14 14:20  
**Версия протокола:** 1.0  
**Статус:** Production Ready ✅


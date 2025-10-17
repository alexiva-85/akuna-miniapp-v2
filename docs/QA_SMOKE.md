# QA Smoke Tests

## **UI Smoke Tests**

### **Dashboard UI Check**
```bash
# Проверка, что /dashboard не показывает loading screen
curl -s https://www.akuna-ex.online/dashboard | grep -q "Loading Dashboard" && echo "❌ FAIL: Dashboard shows loading screen" || echo "✅ PASS: Dashboard renders content"

# Проверка наличия основного контента
curl -s https://www.akuna-ex.online/dashboard | grep -q "Alivia de Franz" && echo "✅ PASS: User info present" || echo "❌ FAIL: User info missing"

# Проверка наличия кнопок
curl -s https://www.akuna-ex.online/dashboard | grep -q "Deposit" && echo "✅ PASS: Deposit button present" || echo "❌ FAIL: Deposit button missing"
```

### **CSS Loading Check**
```bash
# Проверка размера CSS файла
CSS_SIZE=$(curl -sI https://www.akuna-ex.online/_next/static/chunks/*.css | grep -i content-length | cut -d' ' -f2)
if [ "$CSS_SIZE" -gt 10000 ]; then
  echo "✅ PASS: CSS file size OK ($CSS_SIZE bytes)"
else
  echo "❌ FAIL: CSS file too small ($CSS_SIZE bytes)"
fi
```

### **Theme Provider Check**
```bash
# Проверка наличия dark theme классов
curl -s https://www.akuna-ex.online/dashboard | grep -q "class=\"dark\"" && echo "✅ PASS: Dark theme applied" || echo "❌ FAIL: Dark theme missing"
```

## **API Smoke Tests**

### **Health Check**
```bash
curl -s https://www.akuna-ex.online/api/health | jq -r '.ok' | grep -q "true" && echo "✅ PASS: Health API OK" || echo "❌ FAIL: Health API failed"
```

### **Mini-App Check**
```bash
curl -sI https://www.akuna-ex.online/miniapp | grep -q "200 OK" && echo "✅ PASS: Mini-app accessible" || echo "❌ FAIL: Mini-app not accessible"
```

## **Automated Smoke Test Script**

```bash
#!/bin/bash
# ui-smoke-test.sh

echo "🧪 Running UI Smoke Tests..."

# Dashboard UI Check
echo "📱 Testing Dashboard UI..."
if curl -s https://www.akuna-ex.online/dashboard | grep -q "Loading Dashboard"; then
  echo "❌ FAIL: Dashboard shows loading screen"
  exit 1
else
  echo "✅ PASS: Dashboard renders content"
fi

# CSS Check
echo "🎨 Testing CSS loading..."
CSS_SIZE=$(curl -sI https://www.akuna-ex.online/_next/static/chunks/*.css | grep -i content-length | cut -d' ' -f2)
if [ "$CSS_SIZE" -lt 10000 ]; then
  echo "❌ FAIL: CSS file too small ($CSS_SIZE bytes)"
  exit 1
else
  echo "✅ PASS: CSS file size OK ($CSS_SIZE bytes)"
fi

# Theme Check
echo "🌙 Testing dark theme..."
if ! curl -s https://www.akuna-ex.online/dashboard | grep -q "class=\"dark\""; then
  echo "❌ FAIL: Dark theme missing"
  exit 1
else
  echo "✅ PASS: Dark theme applied"
fi

echo "🎉 All UI smoke tests passed!"
```

## **CI/CD Integration**

### **GitHub Actions**
```yaml
name: UI Smoke Tests
on:
  deployment_status:
    types: [success]

jobs:
  ui-smoke:
    runs-on: ubuntu-latest
    steps:
      - name: Run UI Smoke Tests
        run: |
          chmod +x scripts/ui-smoke-test.sh
          ./scripts/ui-smoke-test.sh
```

### **Vercel Integration**
```json
{
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "framework": "nextjs",
  "functions": {
    "app/api/health/route.ts": {
      "runtime": "nodejs18.x"
    }
  }
}
```

## **Monitoring**

### **Production Monitoring**
- **Uptime:** Every 5 minutes
- **UI Health:** Dashboard content check
- **CSS Loading:** File size and accessibility
- **Theme Application:** Dark mode verification

### **Alerts**
- Dashboard shows loading screen > 30 seconds
- CSS file size < 10KB
- Dark theme classes missing
- Health API returns non-200 status





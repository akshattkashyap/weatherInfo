## WeatherInfo

Minimal weather lookup (city → current temp + feels-like) built with React, TypeScript, Vite, Tailwind.

### Features
- City search
- Temperature, feels-like, delta
- Tier badge (hot/warm/mild/cool/cold)
- Dark mode toggle (persistent)
- Lightweight UI components + skeleton loading

### Setup
```bash
npm install
npm dev
```
Visit: http://localhost:5173

### Environment
Create `.env`:
```
VITE_WEATHER_API_KEY=YOUR_OPENWEATHERMAP_KEY
```

### Key Files
`WeatherCard.tsx`, `useweatherInfo.ts`, `useDarkMode.ts`, `palette.ts`, `utils.ts (cn)`

### Scripts (optional additions)
```jsonc
{
  "typecheck": "tsc --noEmit",
  "lint": "eslint . --ext .ts,.tsx"
}
```

### Notes
`WeatherCard` intentionally has only 4 props. Data sourced from OpenWeatherMap.

### License
MIT

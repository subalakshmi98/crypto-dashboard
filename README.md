# Crypto Data Dashboard

A **real-time cryptocurrency dashboard** built with **React + TypeScript** that visualizes live crypto market data using **REST APIs and WebSocket streams**.
The application displays a **candlestick chart and order book**, similar to a simplified crypto exchange interface.

This project demonstrates handling **real-time data streams, caching strategies, responsive UI, and state management**.

---

# Project Overview

The dashboard consumes data from a provided **Node.js mock backend** that exposes:

### REST APIs

Used for **initial historical data**

* `GET /api/candles/:pair`
* `GET /api/orderbook/:pair`

### WebSocket

Used for **real-time updates**

```
ws://localhost:3001
```

Clients subscribe using:

```json
{
  "type": "subscribe",
  "pair": "BTC-USDT",
  "stream": "all"
}
```

Supported streams:

* `candles`
* `orderbook`
* `all`

---

# Features

## Crypto Pair Selection

Users can switch between supported trading pairs:

* BTC-USDT
* ETH-USDT
* XRP-USDT

Switching pairs dynamically updates the chart and order book.

---

## Real-time Candle Chart

The candlestick chart displays:

* Historical candle data from REST API
* Real-time candle updates via WebSocket
* Zoom and pan interactions
* Timeframe switching (1m / 5m / 15m)

The chart is implemented using **TradingView Lightweight Charts**.

---

## Real-time Order Book

The order book is divided into:

### Asks (Sell Orders)

Displayed in **red**

### Bids (Buy Orders)

Displayed in **green**

Each row shows:

| Field  | Description               |
| ------ | ------------------------- |
| Price  | Order price               |
| Amount | Order quantity            |
| Total  | Running cumulative amount |

The **mid-price** between the best bid and best ask is displayed prominently.

---

## Stream Filtering

Users can select which data to display:

* Candles only
* Order book only
* Both streams

The WebSocket connection **remains active** and the UI filters the data.

---

## Timeframe Switching

Users can switch between:

* 1 minute candles
* 5 minute candles
* 15 minute candles

If the backend does not provide aggregated candles, **client-side aggregation** converts 1m candles into higher timeframes.

---

## Client-side Caching

Historical candle data is cached to avoid redundant API calls when switching pairs.

Cache keys follow:

```
PAIR + TIMEFRAME
Example:
BTC-USDT-1m
BTC-USDT-5m
```

This improves performance and responsiveness.

---

# Tech Stack

| Technology            | Purpose                     |
| --------------------- | --------------------------- |
| React                 | UI framework                |
| TypeScript            | Static typing               |
| Zustand               | State management            |
| TailwindCSS           | Styling                     |
| Lightweight-charts    | Candlestick chart rendering |
| WebSocket API         | Real-time data streaming    |
| Jest                  | Unit testing                |
| React Testing Library | Component testing           |

---

# Project Structure

```
crypto-dashboard
│
├ README.md
├ package.json
├ jest.config.js
├ tsconfig.json
├ tsconfig.test.json
│
├ src
│
│ ├ App.tsx
│ ├ main.tsx
│ ├ setupTests.ts
│
│ ├ app
│ │ └ store.ts
│
│ ├ types
│ │ └ market.ts
│
│ ├ services
│ │ ├ api.ts
│ │ └ socket.ts
│
│ ├ utils
│ │ └ aggregateCandles.ts
│
│ ├ components
│ │ ├ CandleChart.tsx
│ │ ├ OrderBook.tsx
│ │ ├ PairSelector.tsx
│ │ ├ StreamSelector.tsx
│ │ ├ TimeframeSelector.tsx
│ │ └ Loader.tsx
│
│ ├ __tests__
│ │
│ │ ├ store
│ │ │ └ store.test.ts
│ │
│ │ ├ api
│ │ │ └ api.test.ts
│ │
│ │ ├ utils
│ │ │ └ aggregateCandles.test.ts
│ │
│ │ ├ components
│ │ │ ├ OrderBook.test.tsx
│ │ │ ├ PairSelector.test.tsx
│ │ │ ├ TimeframeSelector.test.tsx
│ │
│ │ └ App.test.tsx
│
│ └ __mocks__
│   └ lightweight-charts.ts
```

---

# Installation

Clone the repository:

```
git clone https://github.com/your-username/crypto-dashboard.git
```

Navigate to the project directory:

```
cd crypto-dashboard
```

Install dependencies:

```
npm install
```

---

# Running the Application

Start the frontend:

```
npm run dev
```

The application runs at:

```
http://localhost:5173
```

Ensure the **mock backend server** is running on:

start the backend:

```
node server.js
```

The application runs at:

```
http://localhost:3001
```

---

# Running Tests

Execute unit tests:

```
npm run test
```

Tests cover:

* Zustand store logic
* API requests
* Candle aggregation utility
* React components
* App rendering

---

# Error Handling

The application handles:

* API request failures
* WebSocket connection issues
* missing data responses

Loading indicators are displayed while fetching data.

---

# Performance Considerations

Several optimizations are implemented:

* client-side candle caching
* minimal WebSocket reconnections
* lightweight global state management
* chart rendering optimizations

---

# Bonus Features Implemented

The following enhancements were implemented:

* responsive layout for mobile and desktop
* zoom and pan chart interactions
* timeframe switching
* client-side candle aggregation
* unit testing
* WebSocket streaming

---

# Future Improvements

Possible enhancements include:

* volume bars on the chart
* order book depth visualization
* technical indicators
* WebSocket reconnection strategy
* persistent cache with localStorage


import { useEffect, useRef } from "react";
import {
  createChart,
  CandlestickSeries,
  type UTCTimestamp,
} from "lightweight-charts";
import { useMarketStore } from "../app/store";

export default function CandleChart() {
  const ref = useRef<HTMLDivElement>(null);

  const candles = useMarketStore((s) => s.candles);

  useEffect(() => {
    if (!ref.current) return;

    const chart = createChart(ref.current, {
      height: 350,
      width: ref.current.clientWidth,

      layout: {
        background: { color: "#ffffff" },
        textColor: "#000000",
      },

      grid: {
        vertLines: { color: "#e5e7eb" },
        horzLines: { color: "#e5e7eb" },
      },

      rightPriceScale: {
        autoScale: true,
      },

      timeScale: {
        timeVisible: true,
        secondsVisible: false,
      },

      handleScroll: {
        mouseWheel: true,
        pressedMouseMove: true,
      },

      handleScale: {
        axisPressedMouseMove: true,
        mouseWheel: true,
        pinch: true,
      },
    });

    const series = chart.addSeries(CandlestickSeries, {
      upColor: "#22c55e",
      downColor: "#ef4444",
      borderVisible: false,
      wickUpColor: "#22c55e",
      wickDownColor: "#ef4444",
    });

    const formatted = candles.map((c) => ({
      time: Math.floor(c.time / 1000) as UTCTimestamp,
      open: c.open,
      high: c.high,
      low: c.low,
      close: c.close,
    }));

    series.setData(formatted);

    chart.timeScale().fitContent();

    const resizeObserver = new ResizeObserver((entries) => {
      if (!entries.length) return;

      chart.applyOptions({
        width: entries[0].contentRect.width,
      });
    });

    resizeObserver.observe(ref.current);

    return () => {
      resizeObserver.disconnect();
      chart.remove();
    };
  }, [candles]);

  return <div ref={ref} className="w-full h-[350px]" />;
}
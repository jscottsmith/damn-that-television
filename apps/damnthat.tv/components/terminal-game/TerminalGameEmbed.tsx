"use client";

import {
  DEFAULT_CELL_ASPECT_RATIO,
  runGame,
  XtermTerminal,
  type GameController,
} from "@damnthat/damn-tv";
import { FitAddon } from "@xterm/addon-fit";
import { Terminal } from "@xterm/xterm";
import { useEffect, useRef } from "react";

import "@xterm/xterm/css/xterm.css";

/** Measure rendered cell height ÷ width from the xterm canvas (not the glyph probe). */
function measureCellAspect(container: HTMLElement, terminal: Terminal): number {
  const canvas = container.querySelector(
    ".xterm-screen canvas",
  ) as HTMLCanvasElement | null;
  if (canvas && terminal.cols > 0 && terminal.rows > 0) {
    const { width, height } = canvas.getBoundingClientRect();
    const cellW = width / terminal.cols;
    const cellH = height / terminal.rows;
    if (cellW > 0 && cellH > 0) {
      // Monospace cells are taller than wide; guard against inverted glyph metrics.
      const aspect = cellH / cellW;
      return aspect >= 1 ? aspect : 1 / aspect;
    }
  }

  return DEFAULT_CELL_ASPECT_RATIO;
}

export function TerminalGameEmbed() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let disposed = false;
    let controller: GameController | null = null;

    const terminal = new Terminal({
      cursorBlink: false,
      fontFamily:
        '"IBM Plex Mono", "JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
      fontSize: 16,
      lineHeight: 1,
      theme: {
        background: "#0a0a0f",
        foreground: "#f5f5f5",
        cursor: "#6574ff",
      },
      scrollback: 0,
    });

    const fitAddon = new FitAddon();
    terminal.loadAddon(fitAddon);
    terminal.open(container);

    const syncCellAspect = () => {
      if (disposed || !controller) return;
      controller.setCellAspectRatio(measureCellAspect(container, terminal));
    };

    const fitTerminal = () => {
      if (
        disposed ||
        container.clientWidth === 0 ||
        container.clientHeight === 0
      ) {
        return false;
      }
      fitAddon.fit();
      syncCellAspect();
      return terminal.cols >= 2 && terminal.rows >= 1;
    };

    const startGame = () => {
      if (disposed || controller || !fitTerminal()) return;
      controller = runGame(new XtermTerminal(terminal), {
        theme: "neon",
        targetFps: 60,
        cellAspectRatio: measureCellAspect(container, terminal),
      });
    };

    const resizeObserver = new ResizeObserver(() => {
      if (controller) {
        fitTerminal();
      } else {
        startGame();
      }
    });
    resizeObserver.observe(container);

    const rafId = requestAnimationFrame(() => {
      requestAnimationFrame(startGame);
    });

    const handleResize = () => fitTerminal();
    window.addEventListener("resize", handleResize);

    const focusTerminal = () => terminal.focus();
    container.addEventListener("click", focusTerminal);
    focusTerminal();

    return () => {
      disposed = true;
      cancelAnimationFrame(rafId);
      resizeObserver.disconnect();
      window.removeEventListener("resize", handleResize);
      container.removeEventListener("click", focusTerminal);

      // xterm queues viewport sync on a macrotask; defer disposal so the
      // renderer is still alive when that callback runs (React strict mode).
      window.setTimeout(() => {
        controller?.destroy();
        terminal.dispose();
      }, 0);
    };
  }, []);

  return (
    <div className="box-border h-dvh w-full">
      <div ref={containerRef} className="h-full w-full overflow-hidden" />
    </div>
  );
}

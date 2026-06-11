"use client";

import { runGame, XtermTerminal, type GameController } from "@damnthat/damn-tv";
import { FitAddon } from "@xterm/addon-fit";
import { Terminal } from "@xterm/xterm";
import { useEffect, useRef } from "react";

import "@xterm/xterm/css/xterm.css";

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
        "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
      fontSize: 16,
      lineHeight: 1.1,
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

    const fitTerminal = () => {
      if (
        disposed ||
        container.clientWidth === 0 ||
        container.clientHeight === 0
      ) {
        return false;
      }
      fitAddon.fit();
      return terminal.cols >= 2 && terminal.rows >= 1;
    };

    const startGame = () => {
      if (disposed || controller || !fitTerminal()) return;
      controller = runGame(new XtermTerminal(terminal), {
        theme: "neon",
        targetFps: 60,
      });
    };

    const resizeObserver = new ResizeObserver(() => startGame());
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

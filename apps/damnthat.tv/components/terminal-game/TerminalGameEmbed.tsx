"use client";

import { runGame, XtermTerminal } from "@damnthat/damn-tv";
import { FitAddon } from "@xterm/addon-fit";
import { Terminal } from "@xterm/xterm";
import { useEffect, useRef } from "react";

import "@xterm/xterm/css/xterm.css";

export function TerminalGameEmbed() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const terminal = new Terminal({
      cursorBlink: false,
      fontFamily:
        "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
      fontSize: 14,
      lineHeight: 1.1,
      theme: {
        background: "#0a0a0f",
        foreground: "#f5f5f5",
        cursor: "#6574ff",
      },
      allowProposedApi: true,
    });

    const fitAddon = new FitAddon();
    terminal.loadAddon(fitAddon);
    terminal.open(container);
    fitAddon.fit();

    const xtermAdapter = new XtermTerminal(terminal);
    const controller = runGame(xtermAdapter, { theme: "club", targetFps: 60 });

    const handleResize = () => fitAddon.fit();
    window.addEventListener("resize", handleResize);

    const focusTerminal = () => terminal.focus();
    container.addEventListener("click", focusTerminal);
    focusTerminal();

    return () => {
      window.removeEventListener("resize", handleResize);
      container.removeEventListener("click", focusTerminal);
      controller.destroy();
      terminal.dispose();
    };
  }, []);

  return (
    <div className="box-border h-dvh w-full">
      <div ref={containerRef} className="h-full w-full overflow-hidden" />
    </div>
  );
}

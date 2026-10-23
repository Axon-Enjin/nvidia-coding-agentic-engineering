import { useEffect, useRef, type CSSProperties } from "react";

const TRAIL_SIZE = 10;
const TRAIL_RESPONSE_MS = 24;
const TRAIL_IDLE_MS = 110;

/** Decorative pointer feedback. The native cursor remains the precise pointer. */
export function MarketingPointer() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = root.current;
    if (!node || typeof matchMedia !== "function") return;
    const media = matchMedia(
      "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
    );
    const pixels = Array.from(
      node.querySelectorAll<HTMLElement>(".pointer-pixel"),
    );
    let disconnect = () => {};

    function connect() {
      disconnect();
      if (!media.matches) return;
      let frame = 0;
      let previousTime = 0;
      let targetX = 0;
      let targetY = 0;
      let initialized = false;
      let idleTimer = 0;
      const trail = pixels.map(() => ({ x: 0, y: 0 }));

      function hide() {
        cancelAnimationFrame(frame);
        window.clearTimeout(idleTimer);
        frame = 0;
        idleTimer = 0;
        previousTime = 0;
        initialized = false;
        node!.removeAttribute("data-moving");
      }

      function suspend() {
        cancelAnimationFrame(frame);
        window.clearTimeout(idleTimer);
        frame = 0;
        idleTimer = 0;
        previousTime = 0;
        node!.removeAttribute("data-moving");
      }

      function render(time: number) {
        const elapsed = previousTime ? Math.min(time - previousTime, 48) : 16.7;
        previousTime = time;
        const trailAmount = 1 - Math.exp(-elapsed / TRAIL_RESPONSE_MS);

        let leadX = targetX;
        let leadY = targetY;
        let unsettled = 0;
        for (let index = 0; index < trail.length; index += 1) {
          const point = trail[index];
          point.x += (leadX - point.x) * trailAmount;
          point.y += (leadY - point.y) * trailAmount;
          unsettled += Math.abs(leadX - point.x) + Math.abs(leadY - point.y);
          pixels[index].style.transform = `translate3d(${point.x}px, ${point.y}px, 0) scale(${1 - index * 0.045})`;
          leadX = point.x;
          leadY = point.y;
        }

        if (unsettled > 0.5) {
          frame = requestAnimationFrame(render);
        } else {
          frame = 0;
          previousTime = 0;
        }
      }

      function move(event: PointerEvent) {
        if (event.pointerType !== "mouse") return hide();
        const element = event.target as Element | null;
        if (
          event.buttons !== 0 ||
          element?.closest(
            "input, textarea, select, pre, code, [contenteditable='true']",
          ) ||
          document.getSelection()?.isCollapsed === false
        )
          return hide();
        if (!element?.closest(".signal-site")) return hide();

        const tone = element.closest<HTMLElement>("[data-pointer-tone]")
          ?.dataset.pointerTone;
        node!.dataset.tone = tone === "blue" ? "blue" : "lime";

        targetX = event.clientX;
        targetY = event.clientY;
        if (!initialized) {
          trail.forEach((point, index) => {
            point.x = targetX;
            point.y = targetY;
            pixels[index].style.transform = `translate3d(${targetX}px, ${targetY}px, 0) scale(${1 - index * 0.045})`;
          });
          initialized = true;
        }

        node!.setAttribute("data-moving", "");
        window.clearTimeout(idleTimer);
        idleTimer = window.setTimeout(() => {
          node!.removeAttribute("data-moving");
          idleTimer = 0;
        }, TRAIL_IDLE_MS);
        if (!frame) frame = requestAnimationFrame(render);
      }

      function leave(event: PointerEvent) {
        if (!event.relatedTarget) hide();
      }
      function visibility() {
        if (document.hidden) hide();
      }

      document.addEventListener("pointermove", move, { passive: true });
      document.addEventListener("pointerdown", hide, { passive: true });
      document.addEventListener("pointerout", leave, { passive: true });
      document.addEventListener("keydown", hide, true);
      document.addEventListener("visibilitychange", visibility);
      window.addEventListener("blur", hide);
      window.addEventListener("scroll", suspend, { passive: true });

      disconnect = () => {
        hide();
        document.removeEventListener("pointermove", move);
        document.removeEventListener("pointerdown", hide);
        document.removeEventListener("pointerout", leave);
        document.removeEventListener("keydown", hide, true);
        document.removeEventListener("visibilitychange", visibility);
        window.removeEventListener("blur", hide);
        window.removeEventListener("scroll", suspend);
      };
    }

    connect();
    media.addEventListener("change", connect);
    return () => {
      disconnect();
      media.removeEventListener("change", connect);
    };
  }, []);

  return (
    <div className="marketing-pointer" ref={root} aria-hidden="true">
      {Array.from({ length: TRAIL_SIZE }, (_, index) => {
        const style = {
          "--trail-opacity": Math.max(0.12, 0.68 - index * 0.058),
        } as CSSProperties;
        return <i className="pointer-pixel" key={index} style={style} />;
      })}
    </div>
  );
}

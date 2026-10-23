import { useEffect, type RefObject } from "react";

// A document-local visual cache; this never stores product or workflow state.
const presentedDocuments = new WeakSet<Document>();

function startedInWorkbench(document: Document, window: Window): boolean {
  const navigation = window.performance.getEntriesByType("navigation")[0] as
    PerformanceNavigationTiming | undefined;
  const initialUrl = new URL(
    navigation?.name || document.URL,
    document.baseURI,
  );
  return initialUrl.searchParams.get("view") === "workbench";
}

export function useLandingEntrance(root: RefObject<HTMLElement | null>): void {
  useEffect(() => {
    const element = root.current;
    const document = element?.ownerDocument;
    const window = document?.defaultView;
    if (!element || !document || !window) return;
    if (presentedDocuments.has(document)) return;

    if (
      startedInWorkbench(document, window) ||
      typeof element.animate !== "function" ||
      typeof window.matchMedia !== "function"
    ) {
      presentedDocuments.add(document);
      return;
    }

    const motionPreference = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );
    const lines = Array.from(
      element.querySelectorAll<HTMLElement>("[data-intro-line]"),
    ).slice(0, 2);
    const proofPlate =
      element.querySelector<HTMLElement>(".boundary-scene");

    if (
      motionPreference.matches ||
      document.hidden ||
      !lines.length ||
      typeof motionPreference.addEventListener !== "function"
    ) {
      presentedDocuments.add(document);
      return;
    }

    let frame: number | null = null;
    let stopped = false;
    const animations: Animation[] = [];

    function removeListeners() {
      document!.removeEventListener("keydown", cancelForKeyboard, true);
      motionPreference.removeEventListener("change", changeMotionPreference);
    }

    function stopEntrance() {
      stopped = true;
      if (frame !== null) {
        window!.cancelAnimationFrame(frame);
        frame = null;
      }
      // No filled end styles: cancel always reveals the authored resting CSS.
      animations.forEach((animation) => animation.cancel());
      removeListeners();
    }

    function cancelForKeyboard() {
      presentedDocuments.add(document!);
      stopEntrance();
    }

    function changeMotionPreference(event: MediaQueryListEvent) {
      if (event.matches) {
        presentedDocuments.add(document!);
        stopEntrance();
      }
    }

    document.addEventListener("keydown", cancelForKeyboard, {
      capture: true,
      passive: true,
    });
    motionPreference.addEventListener("change", changeMotionPreference);

    // Deferring consumption until this frame lets Strict Mode's first cleanup
    // cancel the scheduled pass without swallowing the real presentation.
    frame = window.requestAnimationFrame(() => {
      frame = null;
      if (stopped) return;
      if (presentedDocuments.has(document)) {
        stopEntrance();
        return;
      }
      presentedDocuments.add(document);

      if (
        !element.isConnected ||
        motionPreference.matches ||
        document.activeElement?.matches(":focus-visible")
      ) {
        stopEntrance();
        return;
      }

      const easing =
        window
          .getComputedStyle(element)
          .getPropertyValue("--ease-out")
          .trim() || "cubic-bezier(0.23, 1, 0.32, 1)";

      // Copy is readable before enhancement and throughout the short arrival.
      // The masks belong to the markup; this hook never hides or splits text.
      try {
        const track = (animation: Animation) => {
          animations.push(animation);
          animation.onfinish = () => {
            if (animations.every((item) => item.playState === "finished")) {
              stopEntrance();
            }
          };
        };

        lines.forEach((line, index) => {
          track(
            line.animate(
              [
                { transform: "translateY(18px)", opacity: 0.65 },
                { transform: "translateY(0)", opacity: 1 },
              ],
              {
                duration: 650,
                delay: index * 80,
                easing,
                fill: "backwards",
              },
            ),
          );
        });

        if (proofPlate) {
          track(
            proofPlate.animate(
              [
                {
                  clipPath: "inset(0 8% 0 0)",
                  transform: "translateX(16px)",
                  opacity: 0.72,
                },
                {
                  clipPath: "inset(0)",
                  transform: "translateX(0)",
                  opacity: 1,
                },
              ],
              {
                duration: 760,
                delay: 140,
                easing,
                fill: "backwards",
              },
            ),
          );
        }
      } catch {
        // Unsupported enhancement leaves the native, visible content intact.
        stopEntrance();
      }
    });

    return () => {
      // Real unmounts consume even a not-yet-started entrance. Strict Mode's
      // simulated cleanup leaves this same DOM element connected.
      if (!element.isConnected) presentedDocuments.add(document);
      stopEntrance();
    };
  }, [root]);
}

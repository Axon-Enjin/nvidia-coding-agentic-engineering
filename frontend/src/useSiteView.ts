import { useEffect, useRef, useState } from "react";

type SiteView = "landing" | "workbench";
type Launcher = { id: string; href: string; index: number };
type PendingNavigation = { hash: string; focus: boolean };

function readView(): SiteView {
  return new URL(window.location.href).searchParams.get("view") === "workbench"
    ? "workbench"
    : "landing";
}

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function focusElement(target: HTMLElement) {
  if (!target.matches("a[href], button, input, select, textarea, [tabindex]")) {
    target.tabIndex = -1;
  }
  target.focus({ preventScroll: true });
}

function moveToLandingDestination(
  hash: string,
  focus: boolean,
  smooth: boolean,
) {
  const behavior: ScrollBehavior =
    smooth && !prefersReducedMotion() ? "smooth" : "auto";

  if (!hash || hash === "#top") {
    if (focus) {
      const heading = document.querySelector<HTMLElement>("#hero-title");
      if (heading) focusElement(heading);
    }
    window.scrollTo({ top: 0, behavior });
    return;
  }

  const id = decodeURIComponent(hash.slice(1));
  const target = document.getElementById(id);
  if (!target) return;
  if (focus) focusElement(target);
  target.scrollIntoView({ behavior, block: "start" });
}

export function useSiteView() {
  const [view, setView] = useState<SiteView>(readView);
  const launcher = useRef<Launcher | null>(null);
  const previousView = useRef<SiteView | null>(null);
  const currentView = useRef<SiteView>(view);
  const pendingNavigation = useRef<PendingNavigation | null>(null);

  useEffect(() => {
    currentView.current = view;
  }, [view]);

  useEffect(() => {
    function updateView() {
      const nextView = readView();
      if (nextView === currentView.current && nextView === "landing") {
        window.requestAnimationFrame(() => {
          moveToLandingDestination(window.location.hash, false, false);
        });
        return;
      }
      setView(nextView);
    }

    function followInternalLink(event: MouseEvent) {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey ||
        !(event.target instanceof Element)
      ) {
        return;
      }

      const link = event.target.closest<HTMLAnchorElement>("a[href]");
      if (
        !link ||
        link.hasAttribute("download") ||
        (link.target && link.target !== "_self")
      ) {
        return;
      }

      const destination = new URL(link.href, window.location.href);
      if (
        destination.origin !== window.location.origin ||
        destination.pathname !== "/"
      ) {
        return;
      }

      const nextView =
        destination.searchParams.get("view") === "workbench"
          ? "workbench"
          : "landing";
      const keyboardClick = event.detail === 0;

      if (nextView === currentView.current) {
        if (nextView !== "landing") return;
        event.preventDefault();
        if (destination.href !== window.location.href) {
          window.history.pushState(null, "", destination.href);
        }
        moveToLandingDestination(
          destination.hash || "#top",
          keyboardClick,
          !keyboardClick,
        );
        return;
      }

      if (nextView === "workbench") {
        const matchingLinks = Array.from(document.links).filter(
          (item) => item.href === link.href,
        );
        launcher.current = {
          id: link.id,
          href: link.href,
          index: matchingLinks.indexOf(link),
        };
      }

      event.preventDefault();
      pendingNavigation.current = {
        hash: destination.hash,
        focus: keyboardClick,
      };
      window.history.pushState(null, "", destination.href);
      setView(nextView);
    }

    document.addEventListener("click", followInternalLink);
    window.addEventListener("popstate", updateView);
    return () => {
      document.removeEventListener("click", followInternalLink);
      window.removeEventListener("popstate", updateView);
    };
  }, []);

  useEffect(() => {
    const previous = previousView.current;
    previousView.current = view;
    let cancelled = false;
    let loadHandler: (() => void) | null = null;

    const frame = window.requestAnimationFrame(() => {
      if (view === "workbench") {
        const target = document.querySelector<HTMLElement>(
          "#workbench-main #stage-heading",
        );
        if (target) focusElement(target);
        window.scrollTo({ top: 0, behavior: "auto" });
        pendingNavigation.current = null;
        return;
      }

      const pending = pendingNavigation.current;
      pendingNavigation.current = null;
      const hash = pending?.hash || window.location.hash;
      if (hash) {
        moveToLandingDestination(hash, pending?.focus ?? true, false);
        const settleAfterLayout = () => {
          if (
            cancelled ||
            currentView.current !== "landing" ||
            window.location.hash !== hash
          ) {
            return;
          }
          window.requestAnimationFrame(() => {
            if (!cancelled) moveToLandingDestination(hash, false, false);
          });
        };
        loadHandler = settleAfterLayout;
        if (document.readyState !== "complete") {
          window.addEventListener("load", loadHandler, { once: true });
        }
        void document.fonts.ready.then(settleAfterLayout);
        return;
      }

      if (previous === null || previous === view) return;
      const saved = launcher.current;
      let target = saved?.id ? document.getElementById(saved.id) : null;
      if (!target && saved) {
        target =
          Array.from(document.links).filter((link) => link.href === saved.href)[
            saved.index
          ] ?? null;
      }
      target ??= document.querySelector<HTMLElement>("main h1");
      if (!target) return;
      focusElement(target);
      target.scrollIntoView({ behavior: "auto", block: "center" });
    });
    return () => {
      cancelled = true;
      window.cancelAnimationFrame(frame);
      if (loadHandler) window.removeEventListener("load", loadHandler);
    };
  }, [view]);

  return view;
}

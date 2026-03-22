import { C as N } from "./welcome.astro_astro_type_script_index_2_lang.C7kGkSC2.js";
import { s as j, v as M } from "./pro.CCzNR7qs.js";
import {
  r as V,
  s as b,
} from "./index.astro_astro_type_script_index_0_lang.eXFzIz31.js";
import "./iconsAndAliases.C3vRb7OB.js";
const H = {
    "lunar://settings": "/st",
    "lunar://new": "/new",
    "lunar://games": "/math",
    "lunar://apps": "/sci",
  },
  f = "/a/moon.svg",
  Q =
    "https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&size=64&url=";
let R = null;
function ee() {
  return (R || (R = new BareMux.BareClient()), R);
}
const a = [];
let d = null,
  te = 1,
  v = null,
  y = null,
  p = !1,
  A = "",
  B = null,
  h = null,
  q = null,
  u = null,
  c = null;
const T = new Map(),
  _ = new Map();
let F = !1;
function ne(e) {
  let t;
  try {
    const n = new URL(e, location.origin);
    t = n.pathname + n.search + n.hash;
  } catch {
    t = e;
  }
  const n = j.getConfig().prefix,
    r = M.getConfig().prefix;
  console.log("[ne] input:", e, "| path:", t, "| uvPrefix:", n, "| scramjetPrefix:", r);
  if (t.startsWith(n))
    try {
      const decoded = decodeURIComponent(j.getConfig().codec.decode(t.slice(n.length)) || "");
      console.log("[ne] uv decoded:", decoded);
      return decoded;
    } catch (err) {
      console.warn("[ne] uv decode failed:", err);
      return "";
    }
  if (t.startsWith(r))
    try {
      const decoded = M.getConfig().decodeUrl(t.slice(r.length));
      console.log("[ne] scramjet decoded:", decoded);
      return decoded;
    } catch (err) {
      console.warn("[ne] scramjet decode failed:", err);
      return "";
    }
  console.log("[ne] no proxy prefix matched, returning empty");
  return "";
}
async function X(e) {
  const t = await N.get("backend");
  if ("sc" === t) {
    const t = j.getConfig();
    return t.prefix + t.codec.encode(e);
  }
  if ("u" === t) {
    const t = M.getConfig();
    return t.prefix + t.encodeUrl(e);
  }
  return e;
}
const P = 12;
function Y(e, t = P) {
  return e.length > t ? e.slice(0, t) + "…" : e;
}
async function re() {
  if (F) return;
  const e = new BareMux.BareMuxConnection("/bm/worker.js"),
    [t, n] = await Promise.all([N.get("transport"), N.get("wispUrl")]),
    r = await e.getTransport();
  ("ep" === t && "/ep/index.mjs" !== r
    ? await e.setTransport("/ep/index.mjs", [{ wisp: n }])
    : "lc" === t &&
      "/lc/index.mjs" !== r &&
      (await e.setTransport("/lc/index.mjs", [{ wisp: n }])),
    (F = !0));
}
async function ie(e) {
  if (e.startsWith("lunar://")) return f;
  const t = T.get(e);
  if (t) return t;
  const n = _.get(e);
  if (n) return n;
  const r = (async () => {
    try {
      await re();
      const t = await ee().fetch(Q + encodeURIComponent(decodeURIComponent(e)));
      if (!t.ok) return (T.set(e, f), f);
      const n = await t.blob();
      return await new Promise((t) => {
        const r = new FileReader();
        ((r.onloadend = () => {
          const n = r.result;
          (T.set(e, n), t(n));
        }),
          r.readAsDataURL(n));
      });
    } catch {
      return (T.set(e, f), f);
    } finally {
      _.delete(e);
    }
  })();
  return (_.set(e, r), r);
}
function S(e, t) {
  if (e.el)
    if ("title" === t) {
      const t = e.el.querySelector(".tab-title");
      t && (t.textContent = Y(e.title, P));
    } else {
      const t = e.el.querySelector(".tab-favicon");
      t && t.src !== e.favicon && (t.src = e.favicon);
    }
}
function L(e) {
  console.log("[L] called with href:", e);
  try {
    const t = new URL(e, location.origin),
      n = t.pathname + t.search + t.hash;
    console.log("[L] parsed pathname+search+hash:", n, "| origin:", t.origin, "| app origin:", location.origin);
    for (const [e, n2] of Object.entries(H)) {
      if (n2 === t.pathname) {
        console.log("[L] matched internal lunar:// route:", e, "->", n2);
        return e;
      }
    }
    const decoded = ne(n) || "";
    console.log("[L] ne() returned:", decoded || "(empty)");
    return decoded;
  } catch (err) {
    console.warn("[L] URL parse threw (likely cross-origin contentDocument access):", err);
    return "";
  }
}
function oe(e, t) {
  let n = e?.title || "";
  try {
    n = decodeURIComponent(n);
  } catch {}
  if (((n = n.trim()), n)) return n;
  const r = L(t);
  try {
    if ("/new" !== new URL(t, location.origin).pathname && r)
      return new URL(r).hostname;
  } catch {}
  return "New Tab";
}
function C(e) {
  try {
    const t = e.iframe.contentDocument;
    if (!t) {
      console.log("[C] no contentDocument for tab", e.id);
      return;
    }
    const n = t.location.href || "",
      r = oe(t, n);
    console.log("[C] tab", e.id, "| contentDocument href:", n, "| resolved title:", r);
    r !== e.title && ((e.title = r), S(e, "title"));
    const o = L(n);
    console.log("[C] tab", e.id, "| L() result:", o || "(empty)");
    o
      ? ie(o).then((t) => {
          t !== e.favicon && ((e.favicon = t), S(e, "icon"));
        })
      : e.favicon !== f && ((e.favicon = f), S(e, "icon"));
  } catch (err) {
    console.warn("[C] threw (likely cross-origin block):", err);
  }
}
function ae(e) {
  (e.titleTimer && clearInterval(e.titleTimer),
    (e.titleTimer = window.setInterval(() => C(e), 2e3)));
}
function ce(e) {
  (C(e), ae(e), (e.isReady = !0), Z(e));
}
function Z(e) {
  console.log("[Z] called for tab", e.id, "| activeTab:", d);
  if (e.id === d && u)
    try {
      const t = e.iframe.contentDocument;
      if (!t) {
        console.log("[Z] no contentDocument");
        return;
      }
      const raw = t.location.href || "";
      const decoded = L(raw);
      console.log("[Z] raw href:", raw, "| L() decoded:", decoded || "(empty)");
      u.value = decoded;
    } catch (err) {
      console.warn("[Z] threw (likely cross-origin):", err);
    }
}
function W(e) {
  if ("A" === e.tagName || "AREA" === e.tagName) {
    const t = e.target;
    return "_blank" === t || "_new" === t;
  }
  return !1;
}
function k(e) {
  !W(e) ||
    e.__lr ||
    ((e.__lr = !0),
    location.href !== location.origin + "/welcome" &&
      e.addEventListener("click", (t) => {
        if (!W(e)) return;
        t.preventDefault();
        const n = e.href;
        n && X(n).then((e) => m(e));
      }));
}
const D =
  'a[target="_blank"], a[target="_new"], area[target="_blank"], area[target="_new"]';
function le(e, t) {
  const n = document.createElement("iframe");
  return (
    (n.id = `frame-${e}`),
    (n.src = t ?? "new"),
    (n.className = "w-full z-0 h-full hidden"),
    n.setAttribute(
      "sandbox",
      "allow-scripts allow-popups allow-modals allow-top-navigation allow-pointer-lock allow-same-origin allow-forms",
    ),
    n.addEventListener("load", () => {
      try {
        const e = n.contentWindow,
          t = n.contentDocument;
        if (!e || !t) {
          console.log("[le:load] contentWindow or contentDocument null — likely cross-origin, cannot intercept");
          return;
        }
        const r = new URL(t.location.href, location.origin).pathname;
        console.log("[le:load] iframe loaded | pathname:", r, "| href:", t.location.href);
        if (Object.values(H).includes(r) || "/new" === r) {
          console.log("[le:load] internal route, skipping open/link intercept");
          return;
        }
        ((e.open = (e) => (e && X(e.toString()).then((e) => m(e)), null)),
          t.querySelectorAll(D).forEach(k),
          new MutationObserver((e) => {
            for (let t = 0; t < e.length; t++) {
              const n = e[t];
              if ("childList" === n.type)
                for (let e = 0; e < n.addedNodes.length; e++) {
                  const t = n.addedNodes[e];
                  if (1 !== t.nodeType) continue;
                  const r = t;
                  (r.matches("a, area") && k(r),
                    r.querySelectorAll(D).forEach(k));
                }
              else if (
                "attributes" === n.type &&
                "target" === n.attributeName
              ) {
                const e = n.target;
                e.matches("a, area") && k(e);
              }
            }
          }).observe(t.body, {
            childList: !0,
            subtree: !0,
            attributes: !0,
            attributeFilter: ["target"],
          }));
      } catch (err) {
        console.warn("[le:load] threw — cross-origin iframe, cannot access contentDocument:", err);
      }
    }),
    n
  );
}
const $ =
    "tab flex items-center justify-between h-[34px] min-w-[160px] max-w-[220px] px-3 rounded-t-lg cursor-pointer select-none transition-all duration-200 relative z-10 border border-b-0 border-[color:var(--border)] gap-2 text-[12px]",
  G =
    $ +
    " bg-[color:var(--background)] shadow-[0_2px_12px_#23213640] text-[color:var(--text-header)]",
  J =
    $ +
    " bg-[color:var(--background-overlay)] hover:bg-[color:var(--background)] text-[color:var(--text-secondary)] opacity-60 hover:opacity-85";
function K(e) {
  const t = document.createElement("div");
  t.className = e.id === d ? G : J;
  const n = document.createElement("div");
  ((n.className = "flex items-center gap-2 flex-1 min-w-0"),
    (n.style.cssText =
      "height:100%;display:flex;align-items:center;min-width:0;overflow:hidden;flex:1;"));
  const r = document.createElement("img");
  ((r.className = "tab-favicon flex-shrink-0"),
    (r.src = e.favicon),
    (r.width = 15),
    (r.height = 15),
    (r.style.cssText =
      "width:15px;height:15px;object-fit:contain;display:block;image-rendering:-webkit-optimize-contrast;image-rendering:crisp-edges;flex-shrink:0;"));
  const o = document.createElement("span");
  ((o.className = "tab-title"),
    (o.style.cssText =
      "overflow:hidden;text-overflow:ellipsis;white-space:nowrap;line-height:1.4;font-size:12.5px;display:block;min-width:0;flex:1;"),
    (o.textContent = Y(e.title, P)),
    n.append(r, o));
  const i = document.createElement("button");
  return (
    (i.style.cssText =
      "flex-shrink:0;width:18px;height:18px;min-width:18px;min-height:18px;padding:3px;display:flex;align-items:center;justify-content:center;background:none;border:none;cursor:pointer;box-sizing:border-box;border-radius:4px;color:#9ca3af;transition:background 0.15s,color 0.15s;"),
    (i.onmouseenter = () => {
      ((i.style.background = "rgba(255,255,255,0.15)"),
        (i.style.color = "#e5e7eb"));
    }),
    (i.onmouseleave = () => {
      ((i.style.background = "none"), (i.style.color = "#9ca3af"));
    }),
    (i.innerHTML =
      '<svg width="10" height="10" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" style="display:block;flex-shrink:0;"><path d="M2 2L10 10M10 2L2 10" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"/></svg>'),
    (i.onclick = (t) => {
      (t.stopPropagation(), fe(e.id));
    }),
    t.append(n, i),
    (t.onclick = () => E(e.id)),
    (e.el = t),
    t
  );
}
function O() {
  if (!h) return;
  const e = new Set();
  for (const t of a) {
    const n = t.el ?? K(t);
    (e.add(n), h.appendChild(n));
  }
  for (let t = h.children.length - 1; t >= 0; t--) {
    const n = h.children[t];
    e.has(n) || n.remove();
  }
}
function se() {
  for (const e of a) e.el && (e.el.className = e.id === d ? G : J);
}
function fe(e) {
  const t = a.findIndex((t) => t.id === e);
  if (-1 === t) return;
  if (1 === a.length)
    return (
      m(),
      void requestAnimationFrame(() => {
        const [e] = a.splice(t, 1);
        (e.titleTimer && clearInterval(e.titleTimer),
          e.iframe.remove(),
          e.el && e.el.remove(),
          O());
      })
    );
  const [n] = a.splice(t, 1);
  (n.titleTimer && clearInterval(n.titleTimer),
    n.iframe.remove(),
    n.el && n.el.remove(),
    d === e && a.length && E(a[Math.max(0, t - 1)].id),
    O());
}
function de() {
  !c ||
    p ||
    ((p = !0),
    (c.style.cssText = "display:block;opacity:1;width:0%;transition:none"),
    requestAnimationFrame(() => {
      !p ||
        !c ||
        (c.style.cssText =
          "display:block;opacity:1;width:80%;transition:width .5s cubic-bezier(.4,0,.2,1)");
    }),
    (y = setTimeout(() => {
      p &&
        c &&
        ((c.style.transition = "width .3s cubic-bezier(.4,0,.2,1)"),
        (c.style.width = "90%"));
    }, 1200)));
}
function ue() {
  !c ||
    !p ||
    ((c.style.cssText =
      "display:block;opacity:1;width:100%;transition:width .2s cubic-bezier(.4,0,.2,1)"),
    setTimeout(() => {
      (c && (c.style.cssText = "display:none;opacity:0;width:0%"), (p = !1));
    }, 180));
}
function I() {
  (y && (clearTimeout(y), (y = null)), ue());
}
function m(e) {
  console.log("[m] openTab called with:", e ?? "(no url, new tab)");
  if (!q) return void V.then(() => m(e));
  const t = te++,
    n = { id: t, title: "New Tab", favicon: f, iframe: null, isReady: !1 };
  a.push(n);
  const r = K(n);
  h && h.appendChild(r);
  const o = le(t, e);
  ((n.iframe = o),
    q.appendChild(o),
    E(t),
    u && (!e || "new" === e) && (u.value = "lunar://new"),
    (o.onload = () => {
      (ce(n), I());
    }),
    (o.onerror = I));
}
function E(e) {
  console.log("[E] switchTab to id:", e);
  ((d = e), v && (clearInterval(v), (v = null)), (A = ""));
  for (const t of a)
    t.iframe && t.iframe.classList.toggle("hidden", t.id !== e);
  (se(), I());
  const t = a.find((t) => t.id === e);
  (t?.isReady && (C(t), Z(t)),
    (v = setInterval(() => {
      if (d === e)
        try {
          const t = a.find((t) => t.id === e);
          if (!t?.iframe) return;
          const n = t.iframe.contentWindow?.location.href;
          console.log("[E:poll] tab", e, "| contentWindow.location.href:", n ?? "(null — cross-origin or not loaded)");
          if (!n || n === A) return;
          ((A = n),
            u && (u.value = L(n)),
            console.log("[E:poll] url bar set to:", u?.value),
            C(t), B && B(n));
        } catch (err) {
          console.warn("[E:poll] threw (cross-origin contentWindow access):", err);
        }
    }, 250)));
}
(V.then(() => {
  ((h = b.querySelector("#tcontainer")),
    (q = b.querySelector("#fcontainer")),
    (u = b.querySelector("#urlbar")),
    (c = b.querySelector("#loading-bar")),
    b.querySelector("#add")?.addEventListener("click", () => m()),
    u?.addEventListener("keydown", (e) => {
      "Enter" === e.key && de();
    }),
    setInterval(() => {
      p &&
        "complete" ===
          a.find((e) => e.id === d)?.iframe?.contentDocument?.readyState &&
        I();
    }, 400),
    m());
}),
  window.addEventListener("unload", () => {
    (v && clearInterval(v), y && clearTimeout(y));
    for (const e of a) e.titleTimer && clearInterval(e.titleTimer);
  }));
const pe = {
  get activeTabId() {
    return d;
  },
  set activeTabId(e) {
    null !== e && E(e);
  },
  openTab: m,
  onUrlChange: (e) => {
    B = e;
  },
};
globalThis.TabManager = pe;
export { pe as T };

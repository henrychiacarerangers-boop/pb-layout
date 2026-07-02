(function () {
    const body = document.body;
    if (!body || body.getAttribute("data-pmo-shell") !== "true") {
        return;
    }

    const portal = body.getAttribute("data-pmo-portal") || "ut";

    function applyUtSidebarActiveForPath() {
        let page = (window.location.pathname.split("/").pop() || "dashboard.html").split("?")[0];
        if (!page.includes(".")) page = "dashboard.html";
        const mount = document.getElementById("pmoShellSidebarMount");
        if (!mount) return;
        const nav = mount.querySelector("ul.sidebar-nav");
        if (!nav) return;

        nav.querySelectorAll("a.nav-link.rounded-3[href]").forEach((a) => {
            const h = a.getAttribute("href");
            if (!h || h.startsWith("#") || a.getAttribute("data-bs-toggle") === "collapse") return;
            const file = h.split("/").pop().split("?")[0];
            if (file === page) {
                a.classList.add("active");
                a.classList.remove("text-dark");
                const sp = a.querySelector("span.fw-medium");
                if (sp) {
                    sp.classList.remove("fw-medium");
                    sp.classList.add("fw-semibold");
                }
                a.querySelectorAll("i.text-dark").forEach((ico) => {
                    ico.classList.remove("text-dark");
                });
            }
        });
    }

    function applyFooterPrintHidden() {
        if (body.getAttribute("data-pmo-footer-print") !== "1") return;
        const footerMount = document.getElementById("pmoShellFooterMount");
        if (!footerMount) return;
        const foot = footerMount.querySelector("footer.bottom-footer");
        if (foot) foot.classList.add("print-hidden");
    }

    try {
        applyFooterPrintHidden();
        if (portal === "ut" || portal === "analytics") {
            applyUtSidebarActiveForPath();
        }
    } catch (e) {
        console.error("[pmo-shell] Active states failed:", e);
    }
    window.dispatchEvent(new Event("pmoShellReady"));

    if (portal === "analytics") {
        try {
            // Apply standard active class specifically for custom analytics sub-tabs too
            let page = (window.location.pathname.split("/").pop() || "unit-trust.html").split("?")[0];
            if (!page.includes(".")) page = "unit-trust.html";
            const utTab = document.getElementById("analyticsTabUt");
            const eopTab = document.getElementById("analyticsTabEop");
            if (utTab && eopTab) {
                if (page === "eop.html") {
                    utTab.classList.remove("active");
                    eopTab.classList.add("active");
                } else {
                    utTab.classList.add("active");
                    eopTab.classList.remove("active");
                }
            }
        } catch (err) {
            console.error("[analytics-tabs] Error set active tab:", err);
        }
    }
})();

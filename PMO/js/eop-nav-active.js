/**
 * EOP multi-page — header tabs, statements sub-tabs (PRS docs / e-Invoice / invoice), sidebar.
 * Waits for shell inject (pmoShellReady) when data-pmo-shell.
 */
(function () {
    function currentFile() {
        let p = (window.location.pathname.split("/").pop() || "dashboard.html").split("?")[0].toLowerCase();
        if (!p.includes(".")) p = "dashboard.html";
        return p;
    }

    function highlight() {
        const path = currentFile();

        const txnSection = ["transactions.html"];
        const statementsSection = ["statements.html", "einvoice.html", "invoice.html"];
        const analyticsSection = ["analytics.html", "prs_fund_detail.html"];
        document.querySelectorAll("#eopMainTabs .nav-link[href]").forEach((a) => {
            const f = (a.getAttribute("href") || "").split("/").pop().split("?")[0].toLowerCase();
            const isMainTxnTab = f === "transactions.html";
            const isStatementsTab = f === "statements.html";
            const isAnalyticsTab = f === "analytics.html";
            const isAuthoriseTab = f === "authorise.html";
            const authorisePages = ["authorise.html", "authorise_detail.html"];
            a.classList.toggle(
                "active",
                f === path ||
                    (isMainTxnTab && txnSection.includes(path)) ||
                    (isStatementsTab && statementsSection.includes(path)) ||
                    (isAnalyticsTab && analyticsSection.includes(path)) ||
                    (isAuthoriseTab && authorisePages.includes(path))
            );
        });

        document.querySelectorAll("#eopStmtSubTabs .nav-link[href]").forEach((a) => {
            const f = (a.getAttribute("href") || "").split("/").pop().split("?")[0].toLowerCase();
            a.classList.toggle("active", f === path);
        });

        const root = document.getElementById("eopSidebarOffcanvas");
        if (root) {
            function activateMainLink(link) {
                link.classList.add("active");
                link.classList.remove("text-dark");
                const label = link.querySelector("span.fw-medium");
                if (label) {
                    label.classList.remove("fw-medium");
                    label.classList.add("fw-semibold");
                }
                link.querySelectorAll("i.text-dark").forEach((icon) => icon.classList.remove("text-dark"));
            }

            function deactivateMainLink(link) {
                link.classList.remove("active");
                link.classList.add("text-dark");
                const label = link.querySelector("span.fw-semibold");
                if (label) {
                    label.classList.remove("fw-semibold");
                    label.classList.add("fw-medium");
                }
                link.querySelectorAll("i.fs-5").forEach((icon) => icon.classList.add("text-dark"));
            }

            root.querySelectorAll('a[href$=".html"]').forEach((a) => {
                a.classList.remove("active");
            });
            const home = document.getElementById("eopSideHome");
            if (home) {
                home.classList.remove("active");
                home.classList.add("text-dark");
                home.querySelectorAll("i").forEach((ico) => ico.classList.add("text-dark"));
                const sp = home.querySelector("span");
                if (sp) {
                    sp.classList.remove("fw-semibold");
                    sp.classList.add("fw-medium");
                }
            }

            const byPath = {
                "dashboard.html": "eopSideHome",
                "contribution.html": "eopSideMake",
                "upload.html": "eopSideUpload",
                "authorise.html": "eopSideAuthorise",
                "authorise_detail.html": "eopSideAuthorise",
                "payment.html": "eopSidePayment",
                "payment_detail.html": "eopSidePayment",
                "abort_payment.html": "eopSidePayment",
                "transactions.html": "eopSideTxn",
                "statements.html": "eopSideStmt",
                "einvoice.html": "eopSideEinv",
                "invoice.html": "eopSideInv",
                "analytics.html": "pmoSideEopAnalytics",
                "prs_fund_detail.html": "pmoSideEopAnalytics",
            };
            let sid = byPath[path];
            if (path === "transactions.html") {
                const params = new URLSearchParams(window.location.search);
                if (params.get("tab") === "pending") {
                    sid = "eopSideTxnPending";
                } else {
                    sid = "eopSideTxnPast";
                }
            }
            if (sid) {
                const el = document.getElementById(sid);
                if (el) {
                    const collapse = el.closest(".collapse");
                    if (collapse) {
                        const toggle = root.querySelector(`[href="#${collapse.id}"]`);
                        if (toggle) {
                            activateMainLink(toggle);
                            toggle.classList.remove("collapsed");
                            toggle.setAttribute("aria-expanded", "true");
                        }
                        collapse.classList.add("show");
                        el.classList.add("active-sub");
                    } else {
                        el.classList.add("active");
                    }
                    if (sid === "eopSideHome") {
                        el.classList.remove("text-dark");
                        el.querySelectorAll("i").forEach((ico) => ico.classList.remove("text-dark"));
                        const sp = el.querySelector("span");
                        if (sp) {
                            sp.classList.remove("fw-medium");
                            sp.classList.add("fw-semibold");
                        }
                    }
                }
            }

            root.querySelectorAll('a.nav-link.rounded-3[data-bs-toggle="collapse"]').forEach((toggle) => {
                toggle.addEventListener("click", () => {
                    root.querySelectorAll("a.nav-link.rounded-3.active").forEach(deactivateMainLink);
                    activateMainLink(toggle);
                });
            });
        }

        if (!window.bootstrap) return;
        const Collapse = window.bootstrap.Collapse;
        const cContrib = document.getElementById("eopSidebarContribCollapse");
        const cRecords = document.getElementById("eopSidebarRecordsCollapse");
        const cStmt = document.getElementById("eopSidebarStmtCollapse");
        if (!cContrib || !cRecords) return;

        const contribPages = ["contribution.html", "upload.html", "authorise.html", "authorise_detail.html", "payment.html", "payment_detail.html"];
        const recordPages = ["transactions.html"];
        const statementPages = ["statements.html", "einvoice.html", "invoice.html"];
        if (contribPages.includes(path)) {
            Collapse.getOrCreateInstance(cContrib, { toggle: false }).show();
        }
        if (recordPages.includes(path)) {
            Collapse.getOrCreateInstance(cRecords, { toggle: false }).show();
        }
        if (cStmt && statementPages.includes(path)) {
            Collapse.getOrCreateInstance(cStmt, { toggle: false }).show();
        }
    }

    function run() {
        if (document.getElementById("eopSidebarOffcanvas")) highlight();
    }

    if (document.body && document.body.getAttribute("data-pmo-shell") === "true") {
        run();
        window.addEventListener("pmoShellReady", run, { once: true });
    } else if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", run);
    } else {
        run();
    }
})();

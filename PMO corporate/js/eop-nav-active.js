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

    }

    function run() {
        highlight();
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", run);
    } else {
        run();
    }
})();

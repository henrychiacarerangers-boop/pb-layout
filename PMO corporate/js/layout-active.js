(function () {
    const body = document.body;
    if (!body || body.getAttribute("data-pmo-shell") !== "true") {
        return;
    }

    const portal = body.getAttribute("data-pmo-portal") || "ut";
    const currentPage = getCurrentPageName();

    function getCurrentPageName() {
        let page = (window.location.pathname.split("/").pop() || "dashboard.html").split("?")[0];
        if (!page.includes(".")) page = "dashboard.html";
        return page;
    }

    function humanizeSlug(value) {
        return value
            .replace(/[-_]+/g, " ")
            .replace(/\b\w/g, (match) => match.toUpperCase());
    }

    function getPortalLabel() {
        if (portal === "eop" || portal === "eop-intro") return "Employer Online Portal (EOP)";
        if (portal === "analytics") return "Analytics";
        return "Unit Trust";
    }

    function getBreadcrumbTrail() {
        const portalLabel = getPortalLabel();
        const trails = {
            "ut": {
                "dashboard.html": [
                    { label: portalLabel, href: "dashboard.html" },
                    { label: "Dashboard", href: null }
                ],
                "view_account.html": [
                    { label: portalLabel, href: "dashboard.html" },
                    { label: "View Account", href: null }
                ],
                "view_account_detail.html": [
                    { label: portalLabel, href: "dashboard.html" },
                    { label: "View Account", href: "view_account.html" },
                    { label: "Account Detail", href: null }
                ],
                "authorise.html": [
                    { label: portalLabel, href: "dashboard.html" },
                    { label: "Authorise", href: null }
                ],
                "authorise_topup.html": [
                    { label: portalLabel, href: "dashboard.html" },
                    { label: "Authorise", href: "authorise.html" },
                    { label: "Top-Up Detail", href: null }
                ],
                "authorise_redemption.html": [
                    { label: portalLabel, href: "dashboard.html" },
                    { label: "Authorise", href: "authorise.html" },
                    { label: "Redemption Detail", href: null }
                ],
                "top_up.html": [
                    { label: portalLabel, href: "dashboard.html" },
                    { label: "View Account", href: "view_account.html" },
                    { label: "Top Up", href: null }
                ],
                "redemption.html": [
                    { label: portalLabel, href: "dashboard.html" },
                    { label: "View Account", href: "view_account.html" },
                    { label: "Redemption", href: null }
                ],
                "transactions.html": [
                    { label: portalLabel, href: "dashboard.html" },
                    { label: "Transactions", href: null }
                ],
                "online_activities.html": [
                    { label: portalLabel, href: "dashboard.html" },
                    { label: "Transactions", href: "transactions.html" },
                    { label: "Online Activities", href: null }
                ],
                "statements.html": [
                    { label: portalLabel, href: "dashboard.html" },
                    { label: "Statements", href: null }
                ],
                "settings.html": [
                    { label: portalLabel, href: "dashboard.html" },
                    { label: "Settings", href: null }
                ]
            },
            "eop": {
                "dashboard.html": [
                    { label: portalLabel, href: "dashboard.html" },
                    { label: "Dashboard", href: null }
                ],
                "intro.html": [
                    { label: portalLabel, href: "dashboard.html" },
                    { label: "Overview", href: null }
                ],
                "contribution.html": [
                    { label: portalLabel, href: "dashboard.html" },
                    { label: "Contribution", href: null }
                ],
                "upload.html": [
                    { label: portalLabel, href: "dashboard.html" },
                    { label: "Contribution", href: "contribution.html" },
                    { label: "Upload", href: null }
                ],
                "authorise.html": [
                    { label: portalLabel, href: "dashboard.html" },
                    { label: "Contribution", href: "contribution.html" },
                    { label: "Authorise", href: null }
                ],
                "authorise_detail.html": [
                    { label: portalLabel, href: "dashboard.html" },
                    { label: "Contribution", href: "contribution.html" },
                    { label: "Authorise", href: "authorise.html" },
                    { label: "Authorise Detail", href: null }
                ],
                "payment.html": [
                    { label: portalLabel, href: "dashboard.html" },
                    { label: "Payment", href: null }
                ],
                "payment_detail.html": [
                    { label: portalLabel, href: "dashboard.html" },
                    { label: "Payment", href: "payment.html" },
                    { label: "Payment Detail", href: null }
                ],
                "transactions.html": [
                    { label: portalLabel, href: "dashboard.html" },
                    { label: "Transactions", href: null }
                ],
                "transaction_detail.html": [
                    { label: portalLabel, href: "dashboard.html" },
                    { label: "Transactions", href: "transactions.html" },
                    { label: "Transaction Detail", href: null }
                ],
                "statements.html": [
                    { label: portalLabel, href: "dashboard.html" },
                    { label: "Statements", href: null }
                ],
                "invoice.html": [
                    { label: portalLabel, href: "dashboard.html" },
                    { label: "Statements", href: "statements.html" },
                    { label: "Invoice", href: null }
                ],
                "einvoice.html": [
                    { label: portalLabel, href: "dashboard.html" },
                    { label: "Statements", href: "statements.html" },
                    { label: "e-Invoice", href: null }
                ],
                "prs_fund_detail.html": [
                    { label: portalLabel, href: "dashboard.html" },
                    { label: "PRS Analytics", href: "analytics.html" },
                    { label: "Fund Detail", href: null }
                ],
                "analytics.html": [
                    { label: portalLabel, href: "dashboard.html" },
                    { label: "PRS Analytics", href: null }
                ]
            },
            "eop-intro": {
                "intro.html": [
                    { label: portalLabel, href: "intro.html" },
                    { label: "Overview", href: null }
                ]
            },
            "analytics": {
                "unit-trust.html": [
                    { label: portalLabel, href: "unit-trust.html" },
                    { label: "Unit Trust Analytics", href: null }
                ],
                "eop.html": [
                    { label: portalLabel, href: "unit-trust.html" },
                    { label: "PRS Analytics", href: null }
                ]
            }
        };

        const portalTrails = trails[portal] || {};
        return portalTrails[currentPage] || [
            { label: portalLabel, href: portal === "analytics" ? "unit-trust.html" : "dashboard.html" },
            { label: humanizeSlug(currentPage.replace(/\.html$/, "")), href: null }
        ];
    }

    function buildBreadcrumbMarkup() {
        const contentArea = document.querySelector(".dashboard-content");
        if (!contentArea) return;
        const container = contentArea.querySelector(".container");
        if (!container || document.getElementById("pmoBreadcrumbsNav")) return;

        const trail = getBreadcrumbTrail();
        if (!trail.length) return;

        const nav = document.createElement("nav");
        nav.className = "pmo-breadcrumbs-nav mb-3";
        nav.setAttribute("aria-label", "Breadcrumb");
        nav.id = "pmoBreadcrumbsNav";

        const list = document.createElement("ol");
        list.className = "pmo-breadcrumbs-list mb-0";

        trail.forEach((item, index) => {
            const li = document.createElement("li");
            li.className = "pmo-breadcrumbs-item";
            if (index === trail.length - 1) {
                li.classList.add("active");
                li.setAttribute("aria-current", "page");
                li.innerHTML = `<span class="pmo-breadcrumbs-current">${item.label}</span>`;
            } else {
                const link = document.createElement("a");
                link.className = "pmo-breadcrumbs-link";
                link.href = item.href || "#";
                link.textContent = item.label;
                li.appendChild(link);
            }
            list.appendChild(li);
        });

        const rail = document.createElement("div");
        rail.className = "pmo-breadcrumbs-rail";
        rail.appendChild(list);

        const wrapper = document.createElement("div");
        wrapper.className = "pmo-breadcrumbs-bar";
        wrapper.appendChild(rail);
        nav.appendChild(wrapper);

        container.insertBefore(nav, container.firstChild);
    }

    function promotePageIntroBlocks() {
        const container = document.querySelector("main.dashboard-content .container");
        if (!container) return;

        function tagSharedTitleStyles(root) {
            const heading = root && root.querySelector ? root.querySelector("h1, h2, h3") : null;
            if (heading) {
                heading.classList.add("pmo-card-inline-title");
            }
            return heading;
        }

        // Keep titles outside the card box as per standard design.
        const introBlock = Array.from(container.children).find((el) => !el.classList.contains("card") && el.querySelector("h1, h2, h3"));
        if (introBlock) {
            introBlock.classList.add("pmo-page-title-card");
        }

        const chromeRoots = [container, ...Array.from(container.querySelectorAll(".col-lg-9, .col-lg-12, .col-md-9, .col-md-12, section"))];

        chromeRoots.forEach((root) => {
            if (!root || !root.children || !root.children.length) return;

            const directChildren = Array.from(root.children);
            const firstBlock = directChildren.find((el) =>
                !el.classList.contains("pmo-page-title-card") &&
                !el.classList.contains("row") &&
                !el.classList.contains("container")
            );
            if (firstBlock && !firstBlock.classList.contains("card")) {
                const heading = firstBlock.querySelector("h1, h2, h3");
                if (heading) {
                    firstBlock.classList.add("pmo-page-title-card");
                    heading.classList.add("pmo-card-inline-title");
                }
            }

            let tabsFound = false;
            directChildren.forEach((el) => {
                if (!el.classList.contains("card")) return;
                if (el.querySelector(".view-tab, #utStmtViewTabs, #eopStmtViewTabs, ul.dashboard-tabs")) {
                    el.classList.add("pmo-page-tabs-card");
                    tabsFound = true;
                    return;
                }
            });

            const contentCandidate = directChildren.find((el) => {
                if (!el.classList.contains("card")) return false;
                if (el.classList.contains("pmo-page-title-card") || el.classList.contains("pmo-page-tabs-card")) return false;
                if (el.querySelector(".tab-content, .table-responsive, .accordion, .card-body")) return true;
                return tabsFound;
            });
            if (contentCandidate) {
                contentCandidate.classList.add("pmo-page-content-card");
            }
        });

        const tabsCard = container.querySelector(".pmo-page-tabs-card");
        const contentCard = container.querySelector(".pmo-page-content-card");

        if (tabsCard && contentCard && !tabsCard.contains(contentCard)) {
            const contentBody = contentCard.querySelector(":scope > .card-body, :scope > .tab-content") || contentCard.firstElementChild;
            if (contentBody) {
                tabsCard.appendChild(contentBody);
                contentCard.remove();
            }
        }
    }

    function applyUtSidebarActiveForPath() {
        const mount = document.getElementById("pmoShellSidebarMount");
        if (!mount) return;
        const nav = mount.querySelector("ul.sidebar-nav");
        if (!nav) return;

        function activateMainLink(link) {
            link.classList.add("active");
            link.classList.remove("text-dark");
            const sp = link.querySelector("span.fw-medium");
            if (sp) {
                sp.classList.remove("fw-medium");
                sp.classList.add("fw-semibold");
            }
            link.querySelectorAll("i.text-dark").forEach((ico) => {
                ico.classList.remove("text-dark");
            });
        }

        function deactivateMainLink(link) {
            link.classList.remove("active");
            link.classList.add("text-dark");
            const sp = link.querySelector("span.fw-semibold");
            if (sp) {
                sp.classList.remove("fw-semibold");
                sp.classList.add("fw-medium");
            }
            link.querySelectorAll("i.fs-5").forEach((ico) => {
                ico.classList.add("text-dark");
            });
        }

        nav.querySelectorAll("a.nav-link.rounded-3[href]").forEach((a) => {
            const h = a.getAttribute("href");
            if (!h || h.startsWith("#") || a.getAttribute("data-bs-toggle") === "collapse") return;
            const targetPath = new URL(h, window.location.href).pathname;
            if (targetPath === window.location.pathname) {
                activateMainLink(a);
            }
        });

        const matchingSubLinks = Array.from(nav.querySelectorAll(".collapse a.nav-link[href]")).filter((a) => {
            const target = new URL(a.getAttribute("href"), window.location.href);
            return target.pathname === window.location.pathname;
        });

        matchingSubLinks.forEach((subLink) => {
            const collapse = subLink.closest(".collapse");
            if (!collapse) return;

            const toggle = nav.querySelector(`[href="#${collapse.id}"]`);
            if (toggle) {
                activateMainLink(toggle);
                toggle.classList.remove("collapsed");
                toggle.setAttribute("aria-expanded", "true");
            }
            collapse.classList.add("show");
        });

        const exactSubLinks = matchingSubLinks.filter((a) => {
            const target = new URL(a.getAttribute("href"), window.location.href);
            return target.search === window.location.search;
        });
        if (exactSubLinks.length === 1) exactSubLinks[0].classList.add("active-sub");

        const relatedPageSections = {
            "view_account_detail.html": "pmoUtSideViewAcct",
            "top_up.html": "pmoUtSideViewAcct",
            "redemption.html": "pmoUtSideViewAcct",
            "authorise_topup.html": "pmoUtSideAuthToggle",
            "authorise_redemption.html": "pmoUtSideAuthToggle",
            "online_activities.html": "pmoUtSideTxnToggle"
        };
        const relatedSection = document.getElementById(relatedPageSections[currentPage]);
        if (relatedSection && nav.contains(relatedSection)) {
            activateMainLink(relatedSection);
            const collapseTarget = relatedSection.getAttribute("href");
            const collapse = collapseTarget && nav.querySelector(collapseTarget);
            if (collapse) {
                relatedSection.classList.remove("collapsed");
                relatedSection.setAttribute("aria-expanded", "true");
                collapse.classList.add("show");
            }
        }

        if (portal === "ut" && currentPage === "authorise.html") {
            const selectedTab = new URLSearchParams(window.location.search).get("tab") === "redemption"
                ? "redemption"
                : "topup";
            const topupTab = document.getElementById("tab-topup");
            const redemptionTab = document.getElementById("tab-redemption");
            const topupPane = document.getElementById("topup");
            const redemptionPane = document.getElementById("redemption");
            const topupSideLink = document.getElementById("pmoUtSideAuthTopup");
            const redemptionSideLink = document.getElementById("pmoUtSideAuthRedeem");

            if (topupTab && redemptionTab && topupPane && redemptionPane) {
                const isRedemption = selectedTab === "redemption";
                topupTab.classList.toggle("active", !isRedemption);
                redemptionTab.classList.toggle("active", isRedemption);
                topupPane.classList.toggle("show", !isRedemption);
                topupPane.classList.toggle("active", !isRedemption);
                redemptionPane.classList.toggle("show", isRedemption);
                redemptionPane.classList.toggle("active", isRedemption);
            }

            [
                [topupSideLink, "topup"],
                [redemptionSideLink, "redemption"]
            ].forEach(([link, tab]) => {
                if (!link) return;
                link.classList.toggle("active-sub", tab === selectedTab);
                link.addEventListener("click", (event) => {
                    event.preventDefault();
                    const target = new URL(link.getAttribute("href"), window.location.href);
                    target.searchParams.set("tab", tab);
                    window.location.assign(target.href);
                });
            });

            [
                [topupTab, topupSideLink, "topup"],
                [redemptionTab, redemptionSideLink, "redemption"]
            ].forEach(([tabLink, sideLink, tab]) => {
                if (!tabLink) return;
                tabLink.addEventListener("click", () => {
                    [topupSideLink, redemptionSideLink].forEach((link) => {
                        if (link) link.classList.toggle("active-sub", link === sideLink);
                    });
                    const target = new URL(window.location.href);
                    target.searchParams.set("tab", tab);
                    window.history.replaceState(null, "", target.href);
                });
            });
        }

        nav.querySelectorAll('a.nav-link.rounded-3[data-bs-toggle="collapse"]').forEach((toggle) => {
            toggle.addEventListener("click", () => {
                nav.querySelectorAll("a.nav-link.rounded-3.active").forEach(deactivateMainLink);
                activateMainLink(toggle);
            });
        });
    }

    function applyFooterPrintHidden() {
        if (body.getAttribute("data-pmo-footer-print") !== "1") return;
        const footerMount = document.getElementById("pmoShellFooterMount");
        if (!footerMount) return;
        const foot = footerMount.querySelector("footer.bottom-footer");
        if (foot) foot.classList.add("print-hidden");
    }

    function injectAlertBanner() {
        if (document.getElementById("pmoAlertBanner")) return;

        const bannerHtml = `
        <div class="alert-banner py-2 bg-danger text-white text-center position-relative" id="pmoAlertBanner" style="z-index: 1050; width: 100%; color: #ffffff !important; background-color: #ff1700 !important;">
            <div class="container-fluid px-5" style="color: #ffffff !important;">
                <div id="alertCarousel" class="carousel slide" data-bs-ride="carousel" data-bs-interval="5000" style="color: #ffffff !important;">
                    <div class="carousel-inner" style="color: #ffffff !important;">
                        <div class="carousel-item active" style="color: #ffffff !important;">
                            <small class="fw-medium" style="color: #ffffff !important;">
                                <i class="iconoir-warning-triangle me-2 align-middle" style="color: #ffffff !important;"></i>
                                We'll be carrying out system maintenance of Public Mutual's online services on 15/03/2026, 12:00am-08:00am. Stay tuned!
                            </small>
                        </div>
                        <div class="carousel-item" style="color: #ffffff !important;">
                            <small class="fw-medium" style="color: #ffffff !important;">
                                <i class="iconoir-info-circle me-2 align-middle" style="color: #ffffff !important;"></i>
                                Notice: Never share your User ID, Password or TAC/OTP with anyone, including Public Mutual staff.
                            </small>
                        </div>
                        <div class="carousel-item" style="color: #ffffff !important;">
                            <small class="fw-medium" style="color: #ffffff !important;">
                                <i class="iconoir-graph-up me-2 align-middle" style="color: #ffffff !important;"></i>
                                Explore our latest Shariah-Compliant and Equity Funds now open for subscription.
                            </small>
                        </div>
                    </div>
                    <button class="carousel-control-prev d-none d-md-flex" type="button" data-bs-target="#alertCarousel" data-bs-slide="prev" style="width: 30px; border: none; background: transparent; position: absolute; left: 15px; top: 0; bottom: 0; color: #ffffff !important;">
                        <i class="iconoir-nav-arrow-left text-white fs-6" style="color: #ffffff !important;"></i>
                    </button>
                    <button class="carousel-control-next d-none d-md-flex" type="button" data-bs-target="#alertCarousel" data-bs-slide="next" style="width: 30px; border: none; background: transparent; position: absolute; right: 45px; top: 0; bottom: 0; color: #ffffff !important;">
                        <i class="iconoir-nav-arrow-right text-white fs-6" style="color: #ffffff !important;"></i>
                    </button>
                </div>
                <button type="button" class="btn-close btn-close-white position-absolute end-0 top-50 translate-middle-y me-3" aria-label="Close" onclick="document.getElementById('pmoAlertBanner').style.display='none'" style="box-shadow: none; border: none; background-color: transparent; color: #ffffff !important;"></button>
            </div>
        </div>
    `;

        const div = document.createElement("div");
        div.innerHTML = bannerHtml.trim();
        const bannerElement = div.firstChild;

        // Check for widescreen-header
        const wsHeader = document.querySelector(".widescreen-header");
        if (wsHeader) {
            wsHeader.parentNode.insertBefore(bannerElement, wsHeader.nextSibling);
        } else {
            // Prepend to body so it stays at the absolute top
            document.body.insertBefore(bannerElement, document.body.firstChild);
        }

        // Initialize carousel manually to ensure auto-play
        setTimeout(() => {
            const carouselEl = document.getElementById('alertCarousel');
            if (carouselEl && typeof bootstrap !== 'undefined') {
                new bootstrap.Carousel(carouselEl, {
                    interval: 5000,
                    ride: 'carousel'
                });
            }
        }, 100);
    }

    function fixTableDropdownClipping() {
        document.addEventListener('show.bs.dropdown', function (event) {
            const tableResponsive = event.target.closest('.table-responsive, .table-responsive-md');
            if (tableResponsive) {
                tableResponsive.style.setProperty('overflow', 'visible', 'important');
                const borderWrapper = tableResponsive.closest('.border.rounded-4');
                if (borderWrapper) {
                    borderWrapper.style.setProperty('overflow', 'visible', 'important');
                }
            }
        });

        document.addEventListener('hide.bs.dropdown', function (event) {
            const tableResponsive = event.target.closest('.table-responsive, .table-responsive-md');
            if (tableResponsive) {
                tableResponsive.style.removeProperty('overflow');
                const borderWrapper = tableResponsive.closest('.border.rounded-4');
                if (borderWrapper) {
                    borderWrapper.style.removeProperty('overflow');
                }
            }
        });
    }

    function initializePopovers() {
        if (typeof bootstrap !== 'undefined' && bootstrap.Popover) {
            const popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
            popoverTriggerList.map(function (popoverTriggerEl) {
                return new bootstrap.Popover(popoverTriggerEl, {
                    trigger: popoverTriggerEl.getAttribute('data-bs-trigger') || 'hover focus',
                    html: true
                });
            });
        }
    }
    function syncTableColumnAlignments() {
        document.querySelectorAll('.custom-table, .custom-table-details').forEach(function (table) {
            const headers = table.querySelectorAll('thead th');
            if (!headers.length) return;
            
            // Map header classes
            const colAligns = [];
            headers.forEach(function (th) {
                let align = null;
                if (th.classList.contains('text-start')) {
                    align = 'text-start';
                } else if (th.classList.contains('text-end')) {
                    align = 'text-end';
                } else if (th.classList.contains('text-center')) {
                    align = 'text-center';
                }
                colAligns.push(align);
            });
            
            // Apply alignment to each cell in tbody rows
            table.querySelectorAll('tbody tr').forEach(function (row) {
                if (row.querySelector('[colspan]')) return; // Skip loading or "no records found" colspan rows
                const cells = row.querySelectorAll('td, th');
                cells.forEach(function (cell, index) {
                    const alignClass = colAligns[index];
                    if (alignClass) {
                        if (!cell.classList.contains(alignClass)) {
                            // Clear conflicting classes
                            cell.classList.remove('text-start', 'text-center', 'text-end');
                            cell.classList.add(alignClass);
                        }
                    }
                });
            });
        });
    }

    function observeTableChanges() {
        if (typeof MutationObserver !== 'undefined') {
            const observer = new MutationObserver(function (mutations) {
                let shouldSync = false;
                mutations.forEach(function (mutation) {
                    if (mutation.addedNodes.length) {
                        shouldSync = true;
                    }
                });
                if (shouldSync) {
                    syncTableColumnAlignments();
                }
            });
            observer.observe(document.body, {
                childList: true,
                subtree: true
            });
        }
    }

    try {
        buildBreadcrumbMarkup();
        promotePageIntroBlocks();
        applyFooterPrintHidden();
        fixTableDropdownClipping();
        initializePopovers();
        syncTableColumnAlignments();
        observeTableChanges();
        applyUtSidebarActiveForPath();
        // injectAlertBanner(); // Disabled post-login alert banner as requested
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

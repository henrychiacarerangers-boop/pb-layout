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

    function promoteSharedPageTitles() {
        // Disabled to keep page titles styled consistently outside cards.
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

    function getBreadcrumbTrail() {
        const portalLabel = "Unit Trust";
        const trails = {
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
        };

        let currentPage = (window.location.pathname.split("/").pop() || "dashboard.html").split("?")[0];
        if (!currentPage.includes(".")) currentPage = "dashboard.html";

        return trails[currentPage] || [
            { label: portalLabel, href: "dashboard.html" },
            { label: currentPage.replace(/\.html$/, "").replace(/[_-]/g, " ").replace(/\b\w/g, c => c.toUpperCase()), href: null }
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

    try {
        buildBreadcrumbMarkup();
        applyFooterPrintHidden();
        promoteSharedPageTitles();
        fixTableDropdownClipping();
        initializePopovers();
        if (portal === "ut") {
            applyUtSidebarActiveForPath();
        }
        // injectAlertBanner(); // Disabled post-login alert banner as requested
    } catch (e) {
        console.error("[pmo-shell] Active states failed:", e);
    }
    window.dispatchEvent(new Event("pmoShellReady"));
})();

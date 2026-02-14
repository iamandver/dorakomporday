import {CONFIG} from "./config.js";

document.addEventListener("DOMContentLoaded", async () =>
{
    await init();
});

async function init()
{
    await loadNav();
    setupLinks();
    setupHamburgerMenu();
}

async function loadNav()
{
    const host = document.getElementById("site-nav");
    if (!host)
    {
        return;
    }

    const navHtml = new URL("partials/nav.html", CONFIG.SRC_ROOT);

    const res = await fetch(navHtml, {cache: "no-cache"});
    if (!res.ok)
    {
        throw new Error("Failed to load nav.html");
    }

    host.innerHTML = await res.text();
}

function setupLinks()
{
    const navLinkRoot       = document.getElementById("nav-links");
    const hamburgerMenuRoot = document.getElementById("hamburger-menu");

    const aboutLinkNav     = document.createElement("a");
    const portfolioLinkNav = document.createElement("a");
    const contactLinkNav   = document.createElement("a");

    const aboutUrl     = new URL("../index.html", CONFIG.SRC_ROOT);
    const portfolioUrl = new URL("portfolio.html", CONFIG.SRC_ROOT);
    const contactUrl   = new URL("../index.html", CONFIG.SRC_ROOT);

    aboutLinkNav.href     = aboutUrl.href;
    portfolioLinkNav.href = portfolioUrl.href;
    contactLinkNav.href   = contactUrl.href;

    aboutLinkNav.textContent     = "About Me";
    portfolioLinkNav.textContent = "Portfolio";
    contactLinkNav.textContent   = "Contact";

    const aboutLinkHam     = aboutLinkNav.cloneNode(true);
    const portfolioLinkHam = portfolioLinkNav.cloneNode(true);
    const contactLinkHam   = contactLinkNav.cloneNode(true);

    aboutLinkNav.classList.add("link");
    portfolioLinkNav.classList.add("link");
    contactLinkNav.classList.add("link");

    aboutLinkHam.classList.add("hamburger-link");
    portfolioLinkHam.classList.add("hamburger-link");
    contactLinkHam.classList.add("hamburger-link");

    navLinkRoot.appendChild(aboutLinkNav);
    navLinkRoot.appendChild(portfolioLinkNav);
    navLinkRoot.appendChild(contactLinkNav);

    hamburgerMenuRoot.appendChild(aboutLinkHam);
    hamburgerMenuRoot.appendChild(portfolioLinkHam);
    hamburgerMenuRoot.appendChild(contactLinkHam);
}

function setupHamburgerMenu()
{
    const hamburgerButton = document.getElementById("hamburger-btn");
    const hamburgerMenu   = document.getElementById("hamburger-menu");

    let menuOpen = false;

    function render()
    {
        hamburgerMenu.classList.toggle("hamburger-menu_visible", menuOpen);
        hamburgerButton.classList.toggle("is-open", menuOpen);
    }

    hamburgerButton.addEventListener("click", (event) =>
    {
        event.preventDefault();

        menuOpen = !menuOpen;
        render();
    });

    // close when clicking a menu link
    hamburgerMenu.addEventListener("click", (e) =>
    {
        const link = e.target.closest("a");
        if (!link)
        {
            return;
        }

        menuOpen = false;
        render();
    });

    // close on Escape
    document.addEventListener("keydown", (e) =>
    {
        if (e.key === "Escape" && menuOpen)
        {
            menuOpen = false;
            render();
        }
    });

    render();
}

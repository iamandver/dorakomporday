import {PORTFOLIO_DB} from "../database.js";
import {CONFIG}       from "../config.js";

document.addEventListener("DOMContentLoaded", init);


function init()
{
    renderPortfolioItems();
    initFilterButtons();
}

function renderPortfolioItems()
{
    const PREVIEW_HTML_TEMPLATE_NAME = "preview.html";

    const root = document.getElementById("portfolio-grid");

    if (!root)
    {
        console.error("Portfolio root is missing.");
    }

    root.replaceChildren();

    const previousIds = new Set();

    for (const item of PORTFOLIO_DB)
    {
        if (!item?.id || !item?.title || !item?.coverImage)
        {
            console.warn("Skipping invalid portfolio item:", item);
            continue;
        }

        if (previousIds.has(item.id))
        {
            console.warn("Duplicate portfolio id, skipping:", item.id);
            continue;
        }

        previousIds.add(item.id);

        const previewHtmlTemplateUrl = new URL(`preview.html?id=${item.id}`, CONFIG.SRC_ROOT)
        const itemElement            = document.createElement("a");
        itemElement.classList.add("portfolio-item");
        itemElement.href         = previewHtmlTemplateUrl.href;
        itemElement.dataset.type = item.type;

        const coverImagesUrl = new URL("images/cover_images/", CONFIG.ASSETS_ROOT);
        const image          = document.createElement("img");
        image.classList.add("item-image");
        image.src = new URL(item.coverImage, coverImagesUrl).href;
        image.alt = `${item.title} cover`;
        itemElement.appendChild(image);

        const title = document.createElement("p");
        title.classList.add("item-title");
        title.textContent = item.title;
        itemElement.appendChild(title);

        const type = document.createElement("p");
        type.classList.add("item-type");
        const itemType   = item.type;
        type.textContent = itemType.charAt(0).toUpperCase() + itemType.slice(1);
        itemElement.appendChild(type);

        root.appendChild(itemElement);
    }
}

function initFilterButtons()
{
    const buttons = document.querySelectorAll(".filter-button");
    const items   = document.querySelectorAll(".portfolio-item");

    function setActive(btn)
    {
        buttons.forEach(b => b.classList.toggle("is-active", b === btn));
    }

    function applyFilter(type)
    {
        items.forEach(item =>
                      {
                          const matches      = (type === "all") || (item.dataset.type === type);
                          item.style.display = matches ? "" : "none";
                      });
    }

    buttons.forEach(button =>
                    {
                        button.addEventListener("click", () =>
                        {
                            const type = button.dataset.filter;
                            setActive(button);
                            applyFilter(type);
                        });
                    });
}
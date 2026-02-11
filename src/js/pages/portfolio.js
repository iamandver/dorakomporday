import {PORTFOLIO_DB} from "../database.js";
import {CONFIG}       from "../config.js";

document.addEventListener("DOMContentLoaded", init);


function init()
{
    renderPortfolioItems();

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
        const itemElement         = document.createElement("a");
        itemElement.classList.add("portfolio-item");
        itemElement.href   = previewHtmlTemplateUrl.href;

        const coverImagesUrl = new URL("images/cover_images/", CONFIG.ASSETS);
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
        type.textContent = item.type;
        itemElement.appendChild(type);

        root.appendChild(itemElement);
    }
}
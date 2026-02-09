import {PORTFOLIO} from "../database.js";

document.addEventListener("DOMContentLoaded", init);

function init()
{
    const id   = getIdFromQuery();
    const item = findItemById(id);

    if (!item)
    {
        renderNotFound();
        return;
    }

    const titleEl = document.getElementById("title");
    const typeEl  = document.getElementById("type");
    const descEl  = document.getElementById("description");
    const coverEl = document.getElementById("cover");

    if (titleEl)
    {
        titleEl.textContent = item.title ?? "";
    }
    if (typeEl)
    {
        typeEl.textContent = item.type ?? "";
    }
    if (descEl)
    {
        descEl.textContent = item.description ?? "";
    }

    if (coverEl)
    {
        if (item.coverImage)
        {
            coverEl.src           = item.coverImage;
            coverEl.style.display = "";
        }
        else
        {
            coverEl.style.display = "none";
        }
    }

    renderLaunch(item.launch);
}


function getIdFromQuery()
{
    const params = new URLSearchParams(window.location.search);
    return params.get("id");
}

function findItemById(id)
{
    if (!id)
    {
        return null;
    }

    return PORTFOLIO.find((x) => x.id === id) ?? null;
}

function clear(el)
{
    while (el.firstChild)
    {
        el.removeChild(el.firstChild);
    }
}

function renderLaunch(launch)
{
    const container = document.getElementById("launchContainer");
    if (!container)
    {
        return;
    }

    clear(container);

    if (!launch)
    {
        return;
    }

    if (launch.kind === "link")
    {
        const a       = document.createElement("a");
        a.href        = launch.href;
        a.className   = "button";
        a.textContent = "Launch";
        a.target      = "_blank"; // optional
        a.rel         = "noopener noreferrer";
        container.appendChild(a);
        return;
    }

    if (launch.kind === "image")
    {
        const img = document.createElement("img");
        img.src   = launch.src;
        img.alt   = "";
        container.appendChild(img);
        return;
    }

    if (launch.kind === "video")
    {
        const video    = document.createElement("video");
        video.src      = launch.src;
        video.controls = true;
        container.appendChild(video);
        return;
    }

    if (launch.kind === "embed")
    {
        const iframe           = document.createElement("iframe");
        iframe.src             = launch.src;
        iframe.allowFullscreen = true;
        container.appendChild(iframe);
        return;
    }

    // Fallback for unknown kinds
    const p       = document.createElement("p");
    p.textContent = "Unsupported launch type.";
    container.appendChild(p);
}

function renderNotFound()
{
    setTimeout(() =>
               {
                   window.location.replace("../index.html");
               }, 2000);


    document.body.innerHTML = `
    <main style="max-width: 60ch; margin: 2rem auto; font-family: system-ui;">
      <p>Portfolio item not found.</p>
      <p><a href="portfolio.html">Back to portfolio</a></p>
    </main>
  `;
}

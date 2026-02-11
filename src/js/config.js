export const CONFIG = (() =>
{
    const SRC_ROOT = new URL("../", import.meta.url);
    const ASSETS   = new URL("assets/", SRC_ROOT);
    // const CSS      = new URL("css/", SRC_ROOT); // optional
    // const JS       = new URL("js/", SRC_ROOT);  // optional

    // const PAGES = {
    //     portfolio: new URL("portfolio.html", SRC_ROOT),
    //     preview  : new URL("preview.html", SRC_ROOT),
    //     index    : new URL("index.html", SRC_ROOT),
    // };

    return {
        SRC_ROOT,
        ASSETS,
        // PAGES,
    };
})();
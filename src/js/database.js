const CONTENT_TYPE = {
    Rise : "rise",
    Video: "video"
};

const LAUNCH_TYPE = {
    Link : "link",
    Image: "image",
    Video: "video",
    Embed: "embed"
};

const PORTFOLIO_DB = [
    {
        id         : "p0",
        title      : "Financial 101: Finance vs. Accounting",
        type       : CONTENT_TYPE.Rise,
        description: "",
        coverImage : "finance-vs-accounting.png",
        //tools: articulate rise, mindtickle, illustrator, photoshop, premiere pro, google vids

        launch: {
            kind: LAUNCH_TYPE.Link,
            href: "financial-101-level-1-of-4/index.html"
        }
    },
    {
        id         : "p1",
        title      : "Turn Objections Into Opportunities",
        type       : CONTENT_TYPE.Rise,
        description: "",
        coverImage : "turn-objections-into-opportunities.png",

        launch: {
            kind: LAUNCH_TYPE.Link,
            href: "turn-objections-into-opportunities/index.html"
        }
    },
    {
        id         : "p2",
        title      : "Psychological Safety Drives Performance",
        type       : CONTENT_TYPE.Video,
        description: "",
        coverImage : "psychological-safety-drives-performance.png",

        launch: {
            kind: LAUNCH_TYPE.Video,
            href: "psychological-safety-drives-performance.mp4"
        }
    },
];

function findPortfolioItemById(id)
{
    if (!id)
    {
        console.error(`Portfolio ID [${id}] does not exist.`);
        return;
    }

    return PORTFOLIO_DB.find((x) => x.id === id) ?? null;
}

export {PORTFOLIO_DB, findPortfolioItemById}
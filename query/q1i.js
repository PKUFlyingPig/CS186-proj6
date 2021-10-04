// Task 1i

db.keywords.aggregate([
    // TODO: Write your query here
    {
        $match:
        {
            $or: [{ keywords: { $elemMatch: { name: "time travel" } } },
            { keywords: { $elemMatch: { name: "presidential election" } } }]
        }
    },
    { $project: { _id: 0, keywords: 0 } },
    { $sort: { movieId: 1 } }
]);
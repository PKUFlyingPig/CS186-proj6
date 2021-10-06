// Task 2ii

db.movies_metadata.aggregate([
    // TODO: Write your query here
    {
        $project: {
            split: {
                $split: ["$tagline", " "]
            }
        }
    },
    { $unwind: "$split" },
    {
        $project: {
            lower_split: { $trim: { input: { $toLower: "$split" }, chars: ".!?," } },
        }
    },
    {
        $project: {
            lower_split: 1,
            len: { $strLenCP: "$lower_split" },
        }
    },
    { $match: { len: { $gt: 3 } } },
    {
        $group: {
            _id: "$lower_split",
            count: {$sum: 1}
        }
    },
    {$sort: {count: -1}},
    {$limit: 20}
]);
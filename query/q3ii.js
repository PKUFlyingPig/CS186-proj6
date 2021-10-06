// Task 3ii

db.credits.aggregate([
    // TODO: Write your query here
    {
        $match: {
            crew: {
                $elemMatch: {
                    job: "Director",
                    id: 5655
                }
            }
        }
    },
    { $unwind: "$cast"},
    {
        $project: {
            _id: 0,
            id: "$cast.id",
            name: "$cast.name"
        }
    },
    {
        $group: {
            _id: {id: "$id", name: "$name"},
            count: {$sum: 1}
        }
    },
    { $project: {_id: 0, id: "$_id.id", name: "$_id.name", count: 1}},
    { $sort: {count: -1, id: 1}},
    { $limit: 5}
]);
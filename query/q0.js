// Task 0 (Building your first query)

db.ratings.aggregate([
    // TODO: Write your query here
    // Match documents with certain timestamps
    {$match: {timestamp: { $gte:  838857600, $lt: 849398400}}},
    // Perform an aggregation
    {
        $group: {
            _id: "$movieId", // Group by the field movieId
            min_rating: {$min: "$rating"}, // Get the min rating for each group
            max_rating: {$max: "$rating"}, // Get the max rating for each group
            count: {$sum: 1} // Get the count for each group
        }
    },
    {$sort: {count: -1, _id: 1}},
    {$limit: 10},
    {
        $lookup: {
            from: "movies_metadata",
            localField: "_id",
            foreignField: "movieId",
            as: "movies"
        }
    },
    {
        $project: {
            _id: 0,
            title: {$first: "$movies.title"},
            num_ratings: "$count", 
            max_rating: 1,
            min_rating: 1
        }
    }
]);

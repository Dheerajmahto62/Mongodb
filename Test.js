

//  $group and $match

db.sales.aggregate([
    { $match: { 'quantity': 5 } },
    {
        $group:
        {
            _id: '$quantity',
            priceSum: { $sum: '$price' },
            priceAvg: { $avg: '$price' }
        }
    }
])



// ============================


db.products.aggregate([
    {
        $group:
        {
            _id: "$company",
            totalProducts: { $sum: '$price' }
        }
    }
])

// ========================
//  $sort
db.products.aggregate([
    {
        $match:
            { price: { $gt: 1200 } }
    },
    {
        $group:
        {
            _id: "$company",
            totalPrice: { $sum: '$price' }
        }
    },
    {
        $sort: { totalPrice: 1 }
    }
])

// =========================================

//  $Project

db.products.aggregate([
    { $match: { price: { $gt: 1200 } } },
    {
        $project: {
            price: 1,
            discountPrice: { $multiply: ['$price', 0.8] }
        }
    }
])

//  $push

db.products.aggregate([
    { $match: { price: { $gt: 1200 } } },
    {
        $group: {
            _id: '$price',
            allColors: { $push: '$colors' }
        }
    }
])


//  $unwind

db.products.aggregate([
    { $unwind: '$colors' },
    { $match: { price: { $gt: 1200 } } },
    {
        $group: {
            _id: '$price',
            allColors: { $push: '$colors' }
        }
    }
])

//  $addToSet

db.products.aggregate([
    { $unwind: '$colors' },
    { $match: { price: { $gt: 1200 } } },
    {
        $group: {
            _id: '$price',
            allColors: { $addToSet: '$colors' }
        }
    }
])

//  $size
db.products.aggregate([
    { $unwind: '$colors' },
    { $match: { price: { $gt: 1200 } } },
    {
        $group: {
            _id: { priceGroup: "$price" },
            colors: { $addToSet: '$colors' }
        }
    },
    {
        $project: {
            _id: 1,
            colors: 1,
            colorsLength: { $size: "$colors" }
        }
    }
])

// $limit

db.products.aggregate([
    { $unwind: '$colors' },
    { $match: { price: { $gt: 1200 } } },
    {
        $group: {
            _id: { priceGroup: "$price" },
            colors: { $addToSet: '$colors' }
        }
    },
    {
        $project: {
            _id: 1,
            colors: 1,
            colorsLength: { $size: "$colors" }
        }
    },
    {
        $limit: 1
    }
])

//  $skip

db.products.aggregate([
    { $unwind: '$colors' },
    { $match: { price: { $gt: 1200 } } },
    {
        $group: {
            _id: { priceGroup: "$price" },
            colors: { $addToSet: '$colors' }
        }
    },
    {
        $project: {
            _id: 1,
            colors: 1,
            colorsLength: { $size: "$colors" }
        }
    },
    {
        $skip: 1
    }
])


//  $filter

db.col.aggregate([{
    $project: {
        name:1,
        MahtoValues :{
            $filter : {
                input: '$values',
                as : 'val',
                cond : {$gt : ['$$val',30]}
            }
        }
    }
}])
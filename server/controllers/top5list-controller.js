const Top5List = require('../models/top5list-model');
const CommunityList = require('../models/community-model');

createTop5List = (req, res) => {
    const body = req.body;
    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a Top 5 List',
        })
    }

    const top5List = new Top5List(body);
    console.log("creating top5List: " + JSON.stringify(top5List));
    if (!top5List) {
        return res.status(400).json({ success: false, error: err })
    }

    top5List
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                top5List: top5List,
                message: 'Top 5 List Created!'
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'Top 5 List Not Created!'
            })
        })
}

updateTop5List = async (req, res) => {
    const body = req.body
    console.log("updateTop5List: " + JSON.stringify(body));
    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }

    Top5List.findOne({ _id: req.params.id }, (err, top5List) => {
        console.log("top5List found: " + JSON.stringify(top5List));
        if (err) {
            return res.status(404).json({
                err,
                message: 'Top 5 List not found!',
            })
        }

        top5List.name = body.name
        top5List.items = body.items
        top5List.likes = body.likes
        top5List.dislikes = body.dislikes
        top5List.comments = body.comments
        top5List.views = body.views
        top5List.status = body.status

        top5List
            .save()
            .then(() => {
                console.log("SUCCESS!!!");
                return res.status(200).json({
                    success: true,
                    id: top5List._id,
                    message: 'Top 5 List updated!',
                })
            })
            .catch(error => {
                console.log("FAILURE: " + JSON.stringify(error));
                return res.status(404).json({
                    error,
                    message: 'Top 5 List not updated!',
                })
            })
    })
}

updateCommunityList = async (req, res) => {
    //console.log("\n\n\n\n\n\n\n\n\n hiiiiiiiiiiiiiiii\n\n\n\n\n\n\n\n\n")
    const body = req.body
    console.log("updateCommunityList: " + JSON.stringify(body));
    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }
    CommunityList.findOne({ _id: req.params.id }, (err, communityList) => {
        console.log("communityList found: " + JSON.stringify(communityList));
        if (err) {
            return res.status(404).json({
                err,
                message: 'Community List not found!',
            })
        }

        communityList.name = body.name
        communityList.items = body.items
        communityList.likes = body.likes
        communityList.dislikes = body.dislikes
        communityList.comments = body.comments
        communityList.views = body.views

        communityList
            .save()
            .then(() => {
                console.log("SUCCESS!!!");
                return res.status(200).json({
                    success: true,
                    id: communityList._id,
                    message: 'Community List List updated!',
                })
            })
            .catch(error => {
                console.log("FAILURE: " + JSON.stringify(error));
                return res.status(404).json({
                    error,
                    message: 'Community List List not updated!',
                })
            })
    })
}

deleteTop5List = async (req, res) => {
    Top5List.findById({ _id: req.params.id }, (err, top5List) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'Top 5 List not found!',
            })
        }
        Top5List.findOneAndDelete({ _id: req.params.id }, () => {
            return res.status(200).json({ success: true, data: top5List })
        }).catch(err => console.log(err))
    })
}

getTop5ListById = async (req, res) => {
    await Top5List.findById({ _id: req.params.id }, (err, list) => {
        if (err) {
            return res.status(400).json({ success: false, error: err });
        }
        return res.status(200).json({ success: true, top5List: list })
    }).catch(err => console.log(err))
}
getTop5Lists = async (req, res) => {
    await Top5List.find({}, (err, top5Lists) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!top5Lists.length) {
            return res
                .status(404)
                .json({ success: false, error: `Top 5 Lists not found` })
        }
        return res.status(200).json({ success: true, data: top5Lists })
    }).catch(err => console.log(err))
}
getTop5ListObjs = async (req, res) => {
    await Top5List.find({ownerEmail: req.userEmail}, (err, top5Lists) => {
        console.log("list objs is called")
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!top5Lists) {
            console.log("!top5Lists.length");
            return res
                .status(404)
                .json({ success: false, error: 'Top 5 Lists not found' })
        }
        else {
            let objs = [];
            for (let key in top5Lists) {
                let list = top5Lists[key];
                let obj = {
                    _id: list._id,
                    name: list.name,
                    items: list.items,
                    userName: list.userName,
                    likes: list.likes,
                    dislikes: list.dislikes,
                    views: list.views,
                    comments: list.comments,
                    updatedAt: list.updatedAt,
                    status: list.status,
                    publishedDate: list.publishedDate
                };
                objs.push(obj);
            }
            return res.status(200).json({ success: true, Objs: objs })
        }
    }).catch(err => console.log(err))
}
getUserObjs = async (req, res) => {
    await Top5List.find({$and: [{$or:[ {ownerEmail: { "$regex": req.params.param, "$options": "i" }} , {userName: { "$regex": req.params.param, "$options": "i" }} ]}, {status: "published"}]}, (err, top5Lists) => {
        console.log("user objs is called")
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!top5Lists || top5Lists.length === 0) {
            console.log("!top5Lists.length");
            return res
                .status(404)
                .json({ success: false, error: 'Top 5 Lists not found' })
        }
        else {
            
            let objs = [];
            for (let key in top5Lists) {
                let list = top5Lists[key];
                let obj = {
                    _id: list._id,
                    name: list.name,
                    items: list.items,
                    userName: list.userName,
                    likes: list.likes,
                    dislikes: list.dislikes,
                    views: list.views,
                    comments: list.comments,
                    updatedAt: list.updatedAt,
                    status: list.status,
                    publishedDate: list.publishedDate
                };
                objs.push(obj);
            }
            return res.status(200).json({ success: true, Objs: objs })
        }
    }).catch(err => console.log(err))
}
getAllListObjs = async (req, res) => {
    await Top5List.find({status: "published"}, (err, top5Lists) => {
        console.log("all objs is called")
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!top5Lists) {
            console.log("!top5Lists.length");
            return res
                .status(404)
                .json({ success: false, error: 'Top 5 Lists not found' })
        }
        else {
            // PUT ALL THE LISTS INTO ID, NAME PAIRS
            let objs = [];
            for (let key in top5Lists) {
                let list = top5Lists[key];
                let obj = {
                    _id: list._id,
                    name: list.name,
                    items: list.items,
                    userName: list.userName,
                    likes: list.likes,
                    dislikes: list.dislikes,
                    views: list.views,
                    comments: list.comments,
                    updatedAt: list.updatedAt,
                    status: list.status,
                    publishedDate: list.publishedDate
                };
                objs.push(obj);
            }
            return res.status(200).json({ success: true, Objs: objs })
        }
    }).catch(err => console.log(err))
}

publishTop5List = (req, res) => {
    const body = req.body
    console.log("updateTop5List: " + JSON.stringify(body));
    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }
    
    Top5List.findOne({ _id: req.params.id }, (err, top5List) => {
        console.log("top5List found: " + JSON.stringify(top5List));
        if (err) {
            return res.status(404).json({
                err,
                message: 'Top 5 List not found!',
            })
        }

        Top5List.find({ $and:[ {ownerEmail: top5List.ownerEmail} , {name: {'$regex': body.name,$options:'i'}} ]}, (err, multi) => {
            if(multi){
                if(multi.length > 1){
                    return res.status(400)
                    .json({
                        errorMessage: "You can only publish 1 list with that name! (case insensitive)"
                    });
                }else{
                    top5List.name = body.name
                    top5List.items = body.items
                    top5List.likes = body.likes
                    top5List.dislikes = body.dislikes
                    top5List.comments = body.comments
                    top5List.views = body.views
                    top5List.status = body.status
                    top5List.publishedDate = body.updatedAt

        CommunityList.findOne({name: {'$regex': top5List.name,$options:'i'}} , (err, communityList) =>{
            if (err) {
                console.log(communityList)
            }
            if (communityList){
                for(let i = 0; i < 5; i++){
                    let item = {}
                    item.item_name = body.items[i]
                    item.points = 5 - i
                    let index = communityList.items.findIndex(x => x.item_name.toLowerCase().replace(/\s/g, '') === item.item_name.toLowerCase().replace(/\s/g, ''))
                    if(index > -1){
                        communityList.items[index].points += item.points
                    }else{
                        communityList.items.push(item)
                    }
                }
                communityList.items.sort(function(a,b){
                    return b.points - a.points})
                communityList
                    .save()
                    .catch(error => {
                        console.log(error)
                    })
            }else{
                let comList = new CommunityList();
                comList.name = body.name
                comList.likes = []
                comList.dislikes = []
                comList.views = 0
                comList.comments = []
                comList.items = []
                for(let i = 0; i < 5; i++){
                    let item = {}
                    item.item_name = body.items[i]
                    item.points = 5 - i
                    comList.items.push(item)
                }
                console.log("creating communityList: " + JSON.stringify(top5List));
                communityList = comList
                communityList
                    .save()
                    .catch(error => {
                        console.log(error)
                    })
            }
        })

        top5List
            .save()
            .then(() => {
                console.log("SUCCESS!!!");
                return res.status(200).json({
                    success: true,
                    id: top5List._id,
                    message: 'Top 5 List updated!',
                })
            })
            .catch(error => {
                console.log("FAILURE: " + JSON.stringify(error));
                return res.status(404).json({
                    error,
                    message: 'Top 5 List not updated!',
                })
            })

                }
            }
        })        
    })    
}

getCommunityLists = async (req, res) => {
    await CommunityList.find({}, (err, communityLists) => {
        console.log("community objs is called")
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!communityLists) {
            console.log("!communityLists.length");
            return res
                .status(404)
                .json({ success: false, error: 'Community Lists not found' })
        }
        else {
            // PUT ALL THE LISTS INTO ID, NAME PAIRS
            let objs = [];
            for (let key in communityLists) {
                let list = communityLists[key];
                let obj = {
                    _id: list._id,
                    name: list.name,
                    items: list.items,
                    likes: list.likes,
                    dislikes: list.dislikes,
                    views: list.views,
                    comments: list.comments,
                    createdAt: list.createdAt,
                    status: list.status
                };
                objs.push(obj);
            }
            return res.status(200).json({ success: true, Objs: objs })
        }
    }).catch(err => console.log(err))
}

module.exports = {
    createTop5List,
    updateTop5List,
    deleteTop5List,
    getTop5Lists,
    getTop5ListById,
    getTop5ListObjs,
    getAllListObjs,
    getUserObjs,
    publishTop5List,
    getCommunityLists,
    updateCommunityList
}
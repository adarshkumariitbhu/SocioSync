const mongoose = require("mongoose");
const User = require("../models/User");

exports.sendRequest = async (req, res) => {
    try{
        const senderID = req.user.id;
        const {receiverID} = req.body;

        const UpdatedSender = await User.findByIdAndUpdate(senderID, {"$push": {"requests" : receiverID},}, {new: true});
        const UpdatedReceiver = await User.findByIdAndUpdate(receiverID, {"$push": {"invites" : senderID} }, {new: true});

        return res.status(200).json({
            success: true,
            message: 'Friend request sent successfully.',
            sender: UpdatedSender,
            receiver: UpdatedReceiver,
        })
    }
    catch(error){
        console.error(error);
        return res.status(500).json({
            success:false,
            message:"Error in sending request",
            error: error.message,
        })
    }
}

exports.acceptRequest = async (req, res) => {
    try{
        const acceptorID = req.user.id;
        const {newFriend} = req.body;

        const UpdatedAcceptor = await User.findByIdAndUpdate(acceptorID,
                                {"$push": {"friends" : newFriend}},
                                {new: true});
        const UpdatedFriend = await User.findByIdAndUpdate(newFriend, 
                                {"$push": {"friends" : acceptorID} },
                                {new: true});

        UpdatedAcceptor = await User.findByIdAndUpdate(acceptorID,
                        {"$pull": {"invites" : newFriend}},
                        {new: true});

        UpdatedFriend = await User.findByIdAndUpdate(newFriend,
                        {"$pull": {"requests" : acceptorID}},
                        {new: true});

        return res.status(200).json({
            success: true,
            message: 'Friend request accepted successfully.',
            acceptor: UpdatedAcceptor,
            receiver: UpdatedFriend,
        })
    }
    catch(error){
        console.error(error);
        return res.status(500).json({
            success:false,
            message:"Error in accepting request",
            error: error.message,
        })
    }
}

exports.rejectRequest = async (req, res) => {
    try{
        const rejectorID = req.user.id;
        const {rejectedFriend} = req.body;

        UpdatedAcceptor = await User.findByIdAndUpdate(rejectorID,
                        {"$pull": {"invites" : rejectedFriend}},
                        {new: true});

        UpdatedFriend = await User.findByIdAndUpdate(rejectedFriend,
                        {"$pull": {"requests" : rejectorID}},
                        {new: true});

        return res.status(200).json({
            success: true,
            message: 'Friend request rejected successfully.',
            acceptor: UpdatedAcceptor,
            receiver: UpdatedFriend,
        })
    }
    catch(error){
        console.error(error);
        return res.status(500).json({
            success:false,
            message:"Error in rejecting request",
            error: error.message,
        })
    }
}

exports.deleteRequest = async (req, res) => {
    try{
        const senderID = req.user.id;
        const {receiverID} = req.body;

        const UpdatedSender = await User.findByIdAndUpdate(senderID, {"$pull": {"requests" : receiverID},}, {new: true});
        const UpdatedReceiver = await User.findByIdAndUpdate(receiverID, {"$pull": {"invites" : senderID} }, {new: true});

        return res.status(200).json({
            success: true,
            message: 'Friend request retrieved successfully.',
            sender: UpdatedSender,
            receiver: UpdatedReceiver,
        })
    }
    catch(error){
        console.error(error);
        return res.status(500).json({
            success:false,
            message:"Error in retrieving request",
            error: error.message,
        })
    }
}
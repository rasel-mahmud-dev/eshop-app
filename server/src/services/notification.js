// import events from "events"
// import {ObjectId} from "mongodb";
//
// import Notification from "../models/Notification"
// import pusher from "src/pusher/pusher";
//
// const notificationEvent = new events.EventEmitter()
//
// // add new notification
// notificationEvent.on("notification", async function (data) {
//     const {
//         recipientId,
//         message = "",
//         notificationType = "",
//         timestamp = new Date(),
//         isRead = false,
//         link = "",
//         metadata = {},
//         groupId,
//         senderId,
//     } = data
//
//     try{
//         let result = await Notification.insertOne({
//             recipientId: new ObjectId(recipientId),
//             message,
//             notificationType,
//             timestamp,
//             isRead,
//             link,
//             metadata,
//             groupId: new ObjectId(groupId),
//             senderId: new ObjectId(senderId),
//         })
//
//         let notification = await Notification.aggregate([
//             {
//                 $match: {
//                     recipientId: new ObjectId(recipientId),
//                     groupId: new ObjectId(groupId),
//                     senderId: new ObjectId(senderId),
//                 }
//             },
//         ])
//
//         pusher.trigger("public-channel", recipientId, {
//             notification: notification
//         }).then(() => {
//             console.log("noti send")
//         }).catch(ex => {
//             console.log(ex?.message)
//         })
//     } catch (ex){
//         console.log(ex.message)
//     }
//
//
// })
//
//
// export default notificationEvent
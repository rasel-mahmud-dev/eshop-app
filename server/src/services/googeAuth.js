// // Create an OAuth2 client with your credentials
// import {google} from "googleapis";
//
//
//
// const oauth2Client = new google.auth.OAuth2(
//     process.env.GOOGLE_CLIENT_ID, // 'YOUR_CLIENT_ID',
//     process.env.GOOGLE_CLIENT_SECRET, // 'YOUR_CLIENT_SECRET',
//     process.env.BACKEND_URL + "/api/v1/auth/callback/google", // 'YOUR_REDIRECT_URI'
// );
//
// // Generate the authentication URL
// export const authUrl = oauth2Client.generateAuthUrl({
//     access_type: 'offline',
//     scope: [
//         'https://www.googleapis.com/auth/userinfo.email',
//         // 'https://www.googleapis.com/auth/userinfo',
//         'profile',
//     ],
// });
//
//
// export default oauth2Client
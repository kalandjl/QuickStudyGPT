import * as functions from "firebase-functions";
const admin = require("firebase-admin");
admin.initializeApp();

export const onUserCreate = functions.auth.user().onCreate((user) => {

    // Make a firestore document for user whenever one is created

    let timestamp = admin.firestore.FieldValue.serverTimestamp()

    admin.firestore().collection("users").doc(`/${user.uid}/`).create({
        email: user.email,
        uid: user.uid,
        sets: [],
        created: timestamp
    })
})

export const onSetCreate = functions.firestore.document("/sets/{setId}").onCreate(async (doc) => {


    // Fetch current users set IDs
    const sets = (await admin.firestore().collection("users").doc(`/${doc.data().uid}`).get()).data().sets

    // Update user's doc with new set document ID
    admin.firestore().collection("users").doc(`/${doc.data().uid}`).update({
        sets: [doc.id, ...sets]
    })
})
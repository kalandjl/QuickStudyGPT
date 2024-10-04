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

// When set is created, add it to it's users firestore document
export const onSetCreate = functions.firestore.document("/sets/{setId}").onCreate(async (doc) => {


    // Fetch current users set IDs
    const sets = (await admin.firestore().collection("users").doc(`/${doc.data().uid}`).get()).data().sets

    // Update user's doc with new set document ID
    admin.firestore().collection("users").doc(`/${doc.data().uid}`).update({
        sets: [doc.id, ...sets]
    })
})

// When set is deleted, remove it from it's users firestore document
export const onSetDelete = functions.firestore.document("/sets/{setId}").onDelete(async (doc) => {


    // Fetch current users set IDs
    const sets = (await admin.firestore().collection("users").doc(`/${doc.data().uid}`).get()).data().sets

    // Update user's doc with new set document ID
    admin.firestore().collection("users").doc(`/${doc.data().uid}`).update({
        sets: sets.filter((id: string) => doc.id != id)
    })
})
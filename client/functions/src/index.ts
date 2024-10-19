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

// When set is created, add it to the user's Firestore document
export const onSetCreate = functions.firestore.document("/sets/{setId}").onCreate(async (doc) => {
    
    const uid = doc.data().uid;
    const setId = doc.id;

    // Fetch current user's sets
    const userDoc = await admin.firestore().collection("users").doc(uid).get();
    const userData = userDoc.data();
    
    let sets;

    // Handle the case where sets is a JSON string
    if (typeof userData.sets === 'string') {
        sets = JSON.parse(userData.sets);
    } else {
        sets = userData.sets || {};
    }

    // Check if the desired folder exists, if not, create it
    if (!sets[doc.data().initialFolder]) {
        sets[doc.data().initialFolder] = [];
    }

    // Add the new set ID to the desired folder
    sets[doc.data().initialFolder].push(setId);

    // Update user's doc with the modified sets object
    await admin.firestore().collection("users").doc(uid).update({
        sets: JSON.stringify(sets)  // Store it back as a string if necessary
    });

    // Update set doc to "fully loaded"
    await admin.firestore().collection("sets").doc(doc.id).update({
        fullyLoaded: true
    })
    
});

// When a set is deleted, remove its ID from the user's Firestore document
export const onSetDelete = functions.firestore.document("/sets/{setId}").onDelete(async (doc) => {
    const uid = doc.data().uid;
    const setId = doc.id;

    // Fetch current user's sets
    const userDoc = await admin.firestore().collection("users").doc(uid).get();
    const userData = userDoc.data();
    
    let sets;

    // Handle the case where sets is a JSON string
    if (typeof userData.sets === 'string') {
        sets = JSON.parse(userData.sets);
    } else {
        sets = userData.sets || {};
    }

    // Iterate through the folders to find and remove the set ID
    for (const folder in sets) {
        const index = sets[folder].indexOf(setId);
        if (index > -1) {
            sets[folder].splice(index, 1); // Remove the set ID from the folder
            break; // Exit loop after finding and removing the set ID
        }
    }

    // Update user's doc with the modified sets object
    await admin.firestore().collection("users").doc(uid).update({
        sets: JSON.stringify(sets)  // Store it back as a string if necessary
    });
});

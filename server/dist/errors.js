export const errors = {
    "Unique constraint failed on the constraint: `User_email_key": {
        "code": 406,
        "message": "Email already in use"
    },
    "No user found": {
        "code": 400,
        "message": "No user found with given user id"
    },
    "An operation failed because it depends on one or more records that were required but not found. Record to delete does not exist.": {
        "code": 400,
        "message": "User has already been deleted or doesn't exist",
    },
    "Wrong password given": {
        "code": "400",
        "message": "Wrong password given"
    },
    "No such email": {
        "code": "400",
        "message": "No such email"
    }
};
//# sourceMappingURL=errors.js.map
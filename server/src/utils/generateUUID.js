import crypto from "crypto";

function generateUUID() {
    return crypto.randomBytes(32).toString("hex");
}

export default generateUUID
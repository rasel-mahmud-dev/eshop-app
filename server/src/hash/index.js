import bcrypt from 'bcrypt';

export function compare(password, hash) {
    if(!password || !hash) return false
    return bcrypt.compareSync(password, hash);
}

export function makeHash(password) {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
}
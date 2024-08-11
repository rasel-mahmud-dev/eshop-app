
class MongodbRepo {
    async insertOne(db, collectionName, data) {
        const Collection = db.collection(collectionName)
        const result =  await Collection.insertOne(data);
        return  {
            ...data,
            _id: result.insertedId
        }
    }

    async find(db, collectionName, ...rest) {
        const Collection = db.collection(collectionName)
        return Collection.find(...rest).toArray()
    }

    async getOne(db, collectionName, ...rest) {
        const Collection = db.collection(collectionName)
        return Collection.findOne(...rest)
    }

    async removeOne(db, collectionName, filter) {
        const Collection = db.collection(collectionName)
        return Collection.deleteOne(filter)
    }

    async insertBatch(db, collectionName, data) {
        const Collection = db.collection(collectionName)
        return Collection.insertMany(data);
    }


    async updateOne(db, collectionName, ...rest) {
        const Collection = db.collection(collectionName)
        return Collection.findOneAndUpdate(...rest);
    }

    async aggregate(db, collectionName, ...rest) {
        const Collection = db.collection(collectionName)
        return Collection.aggregate(...rest).toArray()
    }

    async countDocuments(db, collectionName, ...rest) {
        const Collection = db.collection(collectionName)
        return Collection.countDocuments(...rest)
    }

    async dropAll(db, collectionName, ...rest) {
        const Collection = db.collection(collectionName)
        return Collection.deleteMany(...rest)
    }

    async collection(db, collectionName) {
        return  db.collection(collectionName)
    }

    async isExist(db, collectionName) {
        // return  db
    }
}

export default new MongodbRepo()

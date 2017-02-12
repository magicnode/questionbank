/*
 * Module description: paper 试卷
 */
import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const paper_Schema = new Schema({
    topic: [{ type: Schema.Types.ObjectId }], //试题
    difficulty: { type: Number, default: 1 }, //试卷总难度
    score: { type: Number, default: 1 }, //试卷总分数
    timestamp: { type: Number, default: Date.now.valueOf() }
})

paper_Schema.statics = {
    /**
     * Get topic
     * @param {ObjectId} id - The objectId of user.
     * @returns {Promise<User, APIError>}
     */
    get({ query = {}, fliter = null }) {
        return this.findOne(query, fliter)
            .then(result => {
                if (result) {
                    return result;
                }
                const err = new APIError('No such result exists!', httpStatus.NOT_FOUND);
                return Promise.reject(err);
            });
    },

    /**
     * List users in descending order of 'createdAt' timestamp.
     * @param {number} skip - Number of users to be skipped.
     * @param {number} limit - Limit number of users to be returned.
     * @returns {Promise<User[]>}
     */
    list({ query = {}, fliter = null, skip = 0, limit = 50 } = {}) {
        return this.find(query, fliter)
            .sort({ timestamp: -1 })
            .skip(skip)
            .limit(limit)
            .exec();
    }
}

export default mongoose.model('paper', paper_Schema, 'paper');

/*
 * Module description: topic answer 题目答案
 */
import mongoose  from 'mongoose';

const Schema = mongoose.Schema;
const answerSchema = new Schema({
    topic_id: Schema.Types.ObjectId,
    item_id: [{
        type: Schema.Types.ObjectId,
        required: true
    }],
    timestamp: { type: Number, default: Date.now.valueOf() }
})

answerSchema.statics = {
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

export default mongoose.model('answer', answerSchema, 'answer');

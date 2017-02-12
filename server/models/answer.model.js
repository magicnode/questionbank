/*
 * Module description: topic answer 题目答案
 */
import mongoose  from 'mongoose';

const Schema = mongoose.Schema;
const answerSchema = new Schema({
    content: String,
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
    }
}

export default mongoose.model('answer', answerSchema, 'answer');

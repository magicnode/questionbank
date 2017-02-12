/*
 * Module description: answer sheet 用户 答案
 */
import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const answersheetSchema = new Schema({
    paper_id: {
        type: Schema.Types.ObjectId,
        required: true
    },
    topic_id: {
        type: Schema.Types.ObjectId,
        required: true
    },
    answer_id: [{
        type: Schema.Types.ObjectId
    }],
    content: [String],
    timestamp: { type: Number, default: Date.now.valueOf() }
})

answersheetSchema.statics = {
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

export default mongoose.model('answersheet', answersheetSchema, 'answersheet');

/*
 * Module description: topic 试题
 */
import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const topicSchema = new Schema({
    title: {
        type: String,
        default: '',
        required: true
    },
    type: {
        type: Number,
        min: 1,
        max: 3,
        default: 1,
        required: true
    }, // 1 选择题  2 填空题 3 问答题
    content: [{
        type: Schema.Types.ObjectId,
        required: true
    }],
    answer: [{
        type: Schema.Types.ObjectId
    }], //正确答案
    knowledge_point: {
        type: String,
        default: '未分类',
    }, //知识点
    score: {
        type: Number,
        min: 0,
        max: 100,
        default: 0
    }, //分值 < 20
    difficulty: {
        type: Number,
        default: 1
    }, //难度 A 1 B 2 C 3 D 4
    timestamp: { type: Number, default: Date.now.valueOf() }
})

topicSchema.statics = {
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

export default mongoose.model('topic', topicSchema, 'topic');

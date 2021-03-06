/*
 * Module description: paper 试卷
 */
import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const paper_Schema = new Schema({
    //试卷名
    title: {
        type: String,
        default: ''
    },
    //知识点 分类
    paper_classify: {type: Schema.Types.ObjectId, ref: 'paper_classify'},
    //试卷总难度
    difficulty: { type: Number, default: 1 },
    //试卷总分数
    score: { type: Number, default: 1 },
    //是否分级
    is_classify: Boolean,
    //所有的topic_id
    topic_id: [Schema.Types.ObjectId],
    //试卷分层， name：层级名字 order：显示顺序 topic_id：这一级试题id集合
    classify: [{
        name: String,
        order: Number,
        topic_id:[Schema.Types.ObjectId]
    }],
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

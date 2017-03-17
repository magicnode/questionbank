/*
 * Module description: topic 试题
 * 试题由 题目标题 题目内容 题目答案组成 
 * 内容，答案切分为另外两张表（content, answer）
 */
import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const topicSchema = new Schema({
    user_id: Schema.Types.ObjectId, //所有者id
    title: {
        type: String,
        default: '',
        required: true
    },
    // 1 单选题 2 多选题 3 填空题 4 问答题
    type: {
        type: Number,
        min: 1,
        max: 4,
        default: 1,
        required: true
    },
    // 单选题 多选题 填空题 问答题
    type_name: String,
    //题目内容 
    items: [{
        sign: {
            type: String,
            min: 'A',
            max: 'Z'
        },
        detail: {
            type: String,
            default: ''
        }
    }],
    //题目正确答案
    //单选题答案
    single_answer: {
        type: String,
        min: 'A',
        max: 'Z'
    },
    //多选题答案
    multiple_answer: [{
        type: String,
        min: 'A',
        max: 'Z'
    }],
    //填空题答案
    completion_answer: [{
        sign: {
            type: String,
            min: 'A',
            max: 'Z'
        },
        detail: {
            type: String,
            default: ''
        }
    }],
    // 题目分数 < 40
    score: {
        type: Number,
        min: 0,
        max: 200,
        default: 0
    },
    //题目难度 A 1 B 2 C 3 D 4 E 5
    difficulty: {
        type: Number,
        default: 1
    },
    //题目分类
    point: [String],
    point_ids: [Schema.Types.ObjectId],
    used_count: Number,
    timestamp: { type: Number, default: Date.now.valueOf() }
})

function setname(type) {
    let name;
    switch(type){
        case 1:
            name = "单选题";
        break;
        case 2:
            name = "多选题";
        break;
        case 3:
            name = "填空题";
        break;
        case 4:
            name = "问答题";
        break;
        default:
            name = "单选题";
        break;
    }
    return name
}

topicSchema.pre('save', function(next) {
    let name = setname.apply(this, [this.type]);
    this.type_name = name;
    if (this.type !== 1) {
        delete this.single_answer
    } 
    if (this.type === 1) {
        if (!this.single_answer) return next(new Error('when single choice type, singleanswer is needed'));
    }
    if (this.type === 3) {
        this.items = []
    }
    return next()
});

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

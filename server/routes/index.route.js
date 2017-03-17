import express from 'express';
import userRoutes from './user.route';
import qrRoutes from './qr.route';
import captchaRoutes from './captcha.route';
import topicRoutes from './topic.route';
import answerRoutes from './answer.route';
import itemRoutes from './item.route';
import pointRoutes from './point.route';
import pointtopicRoutes from './pointtopic.route';
import paperRoutes from './paper.route';
import paperclassifyRoutes from './paper_classify.route';

const router = express.Router();

router.get('/', function(req, res, next) {
    res.send("hope is hope, nerver lose his way");
});

router.use('/users', userRoutes);
router.use('/qr', qrRoutes);
router.use('/captcha', captchaRoutes);
router.use('/topics', topicRoutes);
router.use('/answers', answerRoutes);
router.use('/items', itemRoutes);
router.use('/points', pointRoutes);
router.use('/pointtopics', pointtopicRoutes);
router.use('/papers', paperRoutes);
router.use('/paperclassifies', paperclassifyRoutes);

export default router;

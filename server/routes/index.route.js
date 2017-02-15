import express from 'express';
import userRoutes from './user.route';
import qrRoutes from './qr.route';
import captchaRoutes from './captcha.route';
import topicRoutes from './topic.route';
import answerRoutes from './answer.route';
import contentRoutes from './content.route';

const router = express.Router();

router.get('/', function(req, res, next) {
    res.send("hope is hope, nerver lose his way");
});

router.use('/users', userRoutes);
router.use('/qr', qrRoutes);
router.use('/captcha', captchaRoutes);
router.use('/topics', topicRoutes);
router.use('/answers', answerRoutes);
router.use('/contents', contentRoutes);

export default router;

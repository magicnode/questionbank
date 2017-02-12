import express from 'express';
import topicCtrl from '../controller/topic.controller';

const router = express.Router();

router.route('/')
      .get(topicCtrl.index)
      .post(topicCtrl.create);

router.route('/:_id')
      .get(topicCtrl.show)
      .put(topicCtrl.update)
      .delete(topicCtrl.destroy);

router.route('/:_id/edit')
		  .get(topicCtrl.edit)

export default router;
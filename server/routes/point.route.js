import express from 'express';
import pointCtrl from '../controller/point.controller';

const router = express.Router();

router.route('/')
      .get(pointCtrl.index)
      .post(pointCtrl.create);

router.route('/:_id')
      .get(pointCtrl.show)
      .put(pointCtrl.update)
      .delete(pointCtrl.destroy);

router.route('/:_id/topics')
			.get(pointCtrl.topicshow)

router.route('/:_id/edit')
		  .get(pointCtrl.edit)

export default router;
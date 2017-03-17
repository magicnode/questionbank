import express from 'express';
import pointtopicCtrl from '../controller/pointtopic.controller';

const router = express.Router();

router.route('/')
      .get(pointtopicCtrl.index)
      .post(pointtopicCtrl.create);

router.route('/:_id')
      .get(pointtopicCtrl.show)
      .put(pointtopicCtrl.update)
      .delete(pointtopicCtrl.destroy);

router.route('/:_id/edit')
		  .get(pointtopicCtrl.edit)

export default router;
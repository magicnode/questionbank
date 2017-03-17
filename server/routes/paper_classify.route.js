import express from 'express';
import Ctrl from '../controller/paper_classify.controller';

const router = express.Router();

router.route('/')
      .get(Ctrl.index)
      .post(Ctrl.create);

router.route('/:_id')
      .get(Ctrl.show)
      .put(Ctrl.update)
      .delete(Ctrl.destroy);

router.route('/:_id/edit')
		  .get(Ctrl.edit)

export default router;
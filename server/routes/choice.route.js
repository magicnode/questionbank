import express from 'express';
import choiceCtrl from '../controller/choice.controller';

const router = express.Router();

router.route('/')
      .get(choiceCtrl.index)
      .post(choiceCtrl.create);

router.route('/:_id')
      .get(choiceCtrl.show)
      .put(choiceCtrl.update)
      .delete(choiceCtrl.destroy);

router.route('/:_id/edit')
		  .get(choiceCtrl.edit)

export default router;
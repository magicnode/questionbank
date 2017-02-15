import express from 'express';
import answerCtrl from '../controller/answer.controller';

const router = express.Router();

router.route('/')
      .get(answerCtrl.index)
      .post(answerCtrl.create);

router.route('/:_id')
      .get(answerCtrl.show)
      .put(answerCtrl.update)
      .delete(answerCtrl.destroy);

router.route('/:_id/edit')
		  .get(answerCtrl.edit)

export default router;
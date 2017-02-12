import express from 'express';
import contentCtrl from '../controller/content.controller';

const router = express.Router();

router.route('/')
      .get(contentCtrl.index)
      .post(contentCtrl.create);

router.route('/:_id')
      .get(contentCtrl.show)
      .put(contentCtrl.update)
      .delete(contentCtrl.destroy);

export default router;
import express from 'express';
import Controller from '../controller/item.controller';

const router = express.Router();

router.route('/')
      .get(Controller.index)
      .post(Controller.create);

router.route('/:_id')
      .get(Controller.show)
      .put(Controller.update)
      .delete(Controller.destroy);

export default router;
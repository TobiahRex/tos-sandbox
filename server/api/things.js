import express from 'express';
import { Types } from 'mongoose';
import Things from '../db/models/Things';

const router = new express.Router();

// -----------------------------------------------------------------------------
router.get('/:thingId', (req, res) =>
  Things.findById(req.params.thingId, res.handle)
);

// -----------------------------------------------------------------------------
router
  .route('/:thingId')
  .get((req, res) => Things.findById(req.params.thingId, res.handle))
  .put((req, res) =>
    Things.findByIdAndUpdate(
      Types.ObjectId(req.params.thingId),
      req.body,
      { new: true },
      res.handle
    )
  )
  .delete((req, res) =>
    Things.findByIdAndRemove(req.params.thingId, res.handle)
  );

// -----------------------------------------------------------------------------
router
  .route('/')
  .get((req, res) => Things.find({}, res.handle))
  .post((req, res) => Things.create(req.body, res.handle));

// -----------------------------------------------------------------------------
export default router;

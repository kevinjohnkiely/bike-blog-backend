import express from 'express';

import {
  getPosts,
  createPost,
  getOnePost,
} from '../controllers/postController';
const router = express.Router();

router.get('/', getPosts);
router.post('/', createPost);
router.get('/:postId', getOnePost);

export default router;

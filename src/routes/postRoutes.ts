import express from 'express';

import {
  getPosts,
  createPost,
  getOnePost,
  updatePost,
  deletePost,
} from '../controllers/postController';
const router = express.Router();

router.get('/', getPosts);
router.get('/:postId', getOnePost);
router.post('/', createPost);
router.patch('/:postId', updatePost);
router.delete('/:postId', deletePost);

export default router;

import { RequestHandler } from 'express';
import PostModel from '../models/post';

export const getPosts: RequestHandler = async (req, res, next) => {
  try {
    const posts = await PostModel.find().exec();
    res.status(200).json(posts);
  } catch (error) {
    next(error);
  }
};

export const createPost: RequestHandler = async (req, res, next) => {
  const { title, text } = req.body;

  try {
    const newPost = await PostModel.create({
      title,
      text,
    });
    res.status(201).json(newPost);
  } catch (error) {
    next(error);
  }
};

export const getOnePost: RequestHandler = async (req, res, next) => {
  const postId = req.params.postId;

  try {
    const thePost = await PostModel.findById(postId).exec();
    res.status(200).json(thePost);
  } catch (error) {
    next(error);
  }
};

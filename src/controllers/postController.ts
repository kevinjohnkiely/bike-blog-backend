import { RequestHandler } from 'express';
import PostModel from '../models/post';
import createHttpError from 'http-errors';
import mongoose from 'mongoose';

export const getPosts: RequestHandler = async (req, res, next) => {
  try {
    const posts = await PostModel.find().exec();
    res.status(200).json(posts);
  } catch (error) {
    next(error);
  }
};

export const getOnePost: RequestHandler = async (req, res, next) => {
  const postId = req.params.postId;

  try {
    if (!mongoose.isValidObjectId(postId)) {
      throw createHttpError(400, 'Invalid Post ID');
    }

    const thePost = await PostModel.findById(postId).exec();

    if (!thePost) {
      throw createHttpError(404, 'Post does not exist!');
    }
    res.status(200).json(thePost);
  } catch (error) {
    next(error);
  }
};

// TODO - may have to add ? to these...
interface CreatePostBody {
  title: string;
  text: string;
}

export const createPost: RequestHandler<
  unknown,
  unknown,
  CreatePostBody,
  unknown
> = async (req, res, next) => {
  const { title, text } = req.body;

  try {
    if (!title) {
      throw createHttpError(400, 'Post must have a title!');
    }

    const newPost = await PostModel.create({
      title,
      text,
    });
    res.status(201).json(newPost);
  } catch (error) {
    next(error);
  }
};

import { RequestHandler } from 'express';
import PostModel from '../models/postModel';
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
  title?: string;
  text?: string;
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

    if (!text) {
      throw createHttpError(400, 'Post must have some text content!');
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

interface UpdatePostParams {
  postId: string;
}

interface UpdatePostBody {
  title?: string;
  text?: string;
}

export const updatePost: RequestHandler<
  UpdatePostParams,
  unknown,
  UpdatePostBody,
  unknown
> = async (req, res, next) => {
  const postId = req.params.postId;
  const newPostTitle = req.body.title;
  const newPostText = req.body.text;

  try {
    if (!mongoose.isValidObjectId(postId)) {
      throw createHttpError(400, 'Invalid Post ID');
    }

    if (!newPostTitle) {
      throw createHttpError(400, 'Post must have a title!');
    }

    if (!newPostText) {
      throw createHttpError(400, 'Post must have some text content!');
    }

    const post = await PostModel.findById(postId).exec();

    if (!post) {
      throw createHttpError(404, 'No Post by that ID number!');
    }

    post.title = newPostTitle;
    post.text = newPostText;

    const updatedPost = await post.save();
    res.status(200).json(updatedPost);
  } catch (error) {
    next(error);
  }
};

export const deletePost: RequestHandler = async (req, res, next) => {
  const postId = req.params.postId;

  try {
    if (!mongoose.isValidObjectId(postId)) {
      throw createHttpError(400, 'Invalid Post ID');
    }

    const post = await PostModel.findById(postId).exec();

    if (!post) {
      throw createHttpError(404, 'Post not found');
    }

    await post.deleteOne();
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

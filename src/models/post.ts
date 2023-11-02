import { InferSchemaType, Schema, model } from 'mongoose';

const postSchema = new Schema(
  {
    title: { type: String, required: true },
    text: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

type Post = InferSchemaType<typeof postSchema>;

export default model<Post>('Post', postSchema);

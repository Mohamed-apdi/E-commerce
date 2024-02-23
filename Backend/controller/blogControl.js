import asyncHandler from "express-async-handler";
import Blog  from "../models/blogModel.js";
import { validateMongoDbId } from "../utils/validateMongoDbId.js";

export const createBlog = asyncHandler( async (req,res) => {
    try {
        const newBlog = await Blog.create(req.body);
        res.json(newBlog);
    } catch (error) {
        throw new Error(error)
    }
});

export const updateBlog = asyncHandler( async (req,res) => {
    const {id} = req.params;
    
    validateMongoDbId(id);
    try {
        const blogupdate = await Blog.findByIdAndUpdate(id, req.body,{
            new:true
        });
        res.json(blogupdate);
    } catch (error) {
        throw new Error(error);
    }
});


export const getablog = asyncHandler( async (req,res) => {
    const { id } = req.params;
    validateMongoDbId(id);

    try {
        const blog = await Blog.findById(id).populate("likes").populate("disLikes");
        res.json(blog);
    } catch (error) {
        throw new Error(error)
    }
});

export const allblogs = asyncHandler( async (req, res) => {
    try {
        // sort limiting fieldes  pagination

        // sort 
        // if(req.query.sort) {
        //     const sortBy = req.query.sort.split(",").join(" ");
        // }

        const allblog = await Blog.find();
        res.json(allblog);
    } catch (error) {
        throw new Error(error);
    }
});

export const deleteBlog = asyncHandler( async (req,res) => {
    const {id} = req.params;
    validateMongoDbId(id)
    try {
        const blog = await Blog.findByIdAndDelete(id);
        res.json(blog);
    } catch (error) {
        throw new Error(error)
    }
});


export const likeblog = asyncHandler(async (req,res) => {
    const { blogId } = req.body;
    validateMongoDbId(blogId)
        // find the blog which you want to be liked
        const blog  =  await Blog.findById(blogId);
         // find the login user
        const loginUserId = req?.user?._id;
        console.log(loginUserId)
        // find if the user has liked the blog
        const isLiked = blog?.isLiked;
        // find if the user has disliked the blog
        const alreadyDisliked = blog?.disLikes?.find(
            (userId) => userId?.toString() === loginUserId?.toString()
        );
        if(alreadyDisliked) {
            const blog = await Blog.findByIdAndUpdate(
                blogId,
                {
                $pull: { disLikes: loginUserId},
                isDisLiked:false,
            },{ new: true});
            res.json(blog);
        };
        if (isLiked) {
            const blog = await Blog.findByIdAndUpdate(
              blogId,
              {
                $pull: { likes: loginUserId },
                isLiked: false,
              },
              { new: true }
            );
            res.json(blog);
          } else {
            const blog = await Blog.findByIdAndUpdate(
              blogId,
              {
                $push: { likes: loginUserId },
                isLiked: true,
              },
              { new: true }
            );
            res.json(blog);
          }

})

export const dislikeblog = asyncHandler(async (req,res) => {
    const { blogId } = req.body;
    validateMongoDbId(blogId);

        // find the blog which you want to be liked
        const blog  =  await Blog.findById(blogId);
         // find the login user
        const loginUserId = req?.user?._id;
        // find if the user has liked the blog
        const isDisLiked = blog?.isDisLiked;
        // find if the user has disliked the blog
        const alreadyisliked = blog?.likes?.find(
            (userId) => userId?.toString() === loginUserId?.toString()
        );
        if(alreadyisliked) {
            const blog = await Blog.findByIdAndUpdate(
                blogId,
                {
                $pull: { likes: loginUserId},
                isLiked:false,
            },{ new: true});
            res.json(blog);
        };
       

        if (isDisLiked) {
            const blog = await Blog.findByIdAndUpdate(
              blogId,
              {
                $pull: { disLikes: loginUserId },
                isDisLiked: false,
              },
              { new: true }
            );
            res.json(blog);
          } else {
            const blog = await Blog.findByIdAndUpdate(
              blogId,
              {
                $push: { disLikes: loginUserId },
                isDisLiked: true,
              },
              { new: true }
            );
            res.json(blog);
          }

})
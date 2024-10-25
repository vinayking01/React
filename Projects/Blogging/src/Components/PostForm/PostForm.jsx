import React, { useCallback , useEffect} from "react";
import { useForm } from "react-hook-form";
import Button from '../Button'
import Input from '../Input'
import RTE from '../RTE'
import Select from '../Select'
import appwriteService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";


export default function PostForm({ post }) { // Default post to an empty object if not provided
    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.$id || "",
            content: post?.content || "",
            status: post?.status || "active",
        },
    });

    const navigate = useNavigate();
    const userData = useSelector((state) => state.userData);

    const submit = async (data) => {
        console.log("I am here")
        const file = (data.image && data.image[0]) ? await appwriteService.uploadFile(data.image[0]) : null;

        if (post?.$id) { // Check if post exists
            if (file) {
                await appwriteService.deleteFile(post.FeaturedImage);
            }

            const dbPost = await appwriteService.updatePost(post.$id, {...data,FeaturedImage: file ? file.$id : post.FeaturedImage,
            });

            if (dbPost) navigate(`/post/${dbPost.$id}`);
        } else if (file) { // Handle new post creation
            console.log("new post", file)
            const dbPost = await appwriteService.createPost({ ...data, userId: file.$id, featuredImage: file.$id });
            console.log(dbPost)
            if (dbPost) navigate(`/post/${dbPost.$id}`);
        }
    };

    // Slug transform and other logic remains the same
    const slugTransform = useCallback((value) => {
        if (typeof value === "string") {
            return value.trim().toLowerCase().replace(/[^a-zA-Z\d\s]+/g, "-").replace(/\s/g, "-");
        }
        return "";
    }, []);

    useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title" && value.title) {
                setValue("slug", slugTransform(value.title), { shouldValidate: true });
            }
        });

        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue]);

    return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            
            <div className="w-full px-2">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4 "
                    {...register("title", { required: true })}
                />
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", { required: true })}
                    onInput={(e) => setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true })}
                />
                <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
            </div>
            <div className="w-1/3 px-2">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                />
                {post?.featuredImage && (
                    <div className="w-full mb-4">
                        <img
                            src={appwriteService.getFilePreview(post.featuredImage)}
                            alt={post?.title}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                />
                <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
    );
}

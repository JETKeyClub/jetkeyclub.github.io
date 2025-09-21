"use server"

//this file exists bc for some weird reason next-js wasn't letting me directly import from DashboardActions.ts..... 

import { renameImage, deleteImage, uploadImage, updateMarkdownFile, updateInformation, deletePost, addUser, deleteUser, updateRole } from "@/actions/dashboard/DashboardActions";

const renameImageFix = renameImage.bind(null);
const deleteImageFix = deleteImage.bind(null);
const uploadImageFix = uploadImage.bind(null);
const updateMarkdownFix = updateMarkdownFile.bind(null);


export { renameImageFix, deleteImageFix, uploadImageFix, updateMarkdownFix, updateInformation, deletePost, addUser, deleteUser, updateRole}
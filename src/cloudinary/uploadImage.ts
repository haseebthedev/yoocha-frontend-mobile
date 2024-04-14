import AxiosInstance from "services/api/api";

export const uploadImageToCloudinary = async (selectedImage: any): Promise<any> => {
  try {
    const formData = new FormData();

    formData.append("file", {
      uri: selectedImage.uri,
      type: selectedImage.type,
      name: selectedImage.fileName,
    } as unknown as Blob);

    const uploadResponse = await AxiosInstance.post("/file/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return uploadResponse.data.result.url;
  } catch (error) {
    console.error("File upload error:", error);
    throw error;
  }
};

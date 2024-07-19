import AxiosInstance from "services/api/api";

export const uploadImageToCloudinary = async (selectedImage: any): Promise<any> => {
  try {
    const formData = new FormData();

    formData.append("file", {
      uri: selectedImage.uri,
      type: selectedImage.type,
      name: selectedImage.fileName,
    } as unknown as Blob);

    console.log("form data === ", formData);

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

export const uploadDocToCloudinary = async (selectedDoc: any): Promise<any> => {
  try {
    const formData = new FormData();

    formData.append("file", {
      uri: selectedDoc.uri,
      type: selectedDoc.type,
      name: selectedDoc.name,
    } as unknown as Blob);

    console.log("form data === ", formData);

    const uploadResponse = await AxiosInstance.post("/file/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    console.log("uploadResponse === ", uploadResponse);
    return uploadResponse.data.result.url;
  } catch (error) {
    console.error("File upload error:", error);
    throw error;
  }
};

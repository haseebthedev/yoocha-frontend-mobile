import { Image as ImageCompressor } from "react-native-compressor";
import AxiosInstance from "services/api/api";

export const uploadImageToCloudinary = async (selectedImage: any): Promise<any> => {
  try {
    const compressedImage = await ImageCompressor.compress(selectedImage.uri, {
      compressionMethod: "auto",
      maxWidth: 800,
      maxHeight: 600,
      quality: 0.8,
    });

    if (compressedImage) {
      const formData = new FormData();

      formData.append("file", {
        uri: compressedImage,
        type: selectedImage.type,
        name: selectedImage.fileName,
      } as unknown as Blob);

      const uploadResponse = await AxiosInstance.post("/file/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return uploadResponse.data.result.url;
    }
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

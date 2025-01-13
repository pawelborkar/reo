import { useCallback, useState } from "react";
import axios from "axios";
import { useDropzone } from "react-dropzone";
import { title } from "@/components/primitives";
import { Button } from "@nextui-org/button";
import DefaultLayout from "@/layouts/default";
import { UploadIcon } from "lucide-react";

const URL = `${import.meta.env.VITE_API_URL}/api/${import.meta.env.VITE_API_VERSION}/content`;

export default function IndexPage() {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadURL, setUploadURL] = useState<string>("");
  const [, setUploadProgress] = useState(0);

  const onDrop = useCallback(async (acceptedFiles: any) => {
    setFile(acceptedFiles[0]);
    const filename: Array<string> = acceptedFiles[0]?.name?.split("."); //[""]
    const { data } = await axios.post(URL, {
      filename: filename[0],
      type: filename[1],
    });

    setUploadURL(data?.data.uploadUrl);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const uploadFile = async (e: any) => {
    e.preventDefault();
    console.log("uploading...", uploadURL);
    try {
      const options = {
        headers: {
          //@ts-ignore next-line
          "Content-Type": file?.type,
        },
      };
      const response = await axios.put(uploadURL, file, options);

      console.log("S3: ", response);
    } catch (error) {
      console.error("Upload error:", error);
      throw error;
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  };
  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <div className="inline-block max-w-lg text-center justify-center my-4">
          <span className={title()}>Quickly share&nbsp;</span>
          <span className={title({ color: "violet" })}>
            Files, Images and Videos &nbsp;
          </span>
          <span className={title()}>in a disposable manner</span>
        </div>
        <form
          {...getRootProps({
            className:
              "flex flex-col items-center justify-center w-[80vw] md:w-[60vw] lg:w-[40vw] m-6",
          })}
          onSubmit={uploadFile}
        >
          <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <UploadIcon size={80} />
              <p className="m-2 text-sm text-gray-500 dark:text-gray-400">
                <span className="font-bold">Click to upload</span> or drag and
                drop
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 px-4 text-center">
                Choose any media type of your choice (Max. Free Limit 10MB)
              </p>
            </div>
            <input
              id="dropzone-file"
              type="file"
              name="dropzone-file"
              {...getInputProps({ className: "hidden" })}
            />
          </label>

          <Button
            type="submit"
            className="w-40 mt-8 bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-xl"
            radius="full"
            variant="shadow"
            isLoading={uploading}
            disabled={uploading}
          >
            Get Sharable Link
          </Button>
        </form>
        {/* <div className="flex gap-3"> */}
        {/*   <Button */}
        {/*     // isLoading */}
        {/*     type="submit" */}
        {/*     className="w-36 bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-xl" */}
        {/*     radius="full" */}
        {/*     variant="shadow" */}
        {/*   > */}
        {/*     Get Sharable Link */}
        {/*   </Button> */}
        {/* </div> */}
        <div className="text-gray-400">
          We do not store any of your uploaded data once it gets expired.
        </div>
        <div className="text-gray-400">
          Yup. We're proudly open source because we value transparency
        </div>
      </section>
    </DefaultLayout>
  );
}

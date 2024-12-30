import { title, subtitle } from "@/components/primitives";
import { Button } from "@nextui-org/button";
import DefaultLayout from "@/layouts/default";
import { UploadIcon } from "lucide-react";

import { createPresignedPost } from "@aws-sdk/s3-presigned-post";
import { S3Client } from "@aws-sdk/client-s3";

export default function IndexPage() {
  const Conditions = [
    { acl: "bucket-owner-full-control" },
    { bucket: "reo.im" },
    ["starts-with", "$key", "uploads"],
  ];

  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <div className="inline-block max-w-lg text-center justify-center">
          <span className={title()}>Share&nbsp;</span>
          <span className={title({ color: "violet" })}>
            Files, Videos, Texts and Gifs&nbsp;
          </span>
          <span className={title()}>from anywhere in the world</span>
          <div className={subtitle({ class: "mt-4" })}>
            Encrypted, fast and disposable.
          </div>
        </div>

        <form className="flex flex-col items-center justify-center w-[40vw] m-6">
          <input type="hidden" name="key" value="VALUE" />
          <input type="hidden" name="AWSAccessKeyId" value="VALUE" />
          <input type="hidden" name="policy" value="VALUE" />
          <input type="hidden" name="signature" value="VALUE" />
          <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
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
              className="hidden"
            />
          </label>
          <Button
            type="submit"
            className="w-40 mt-8 bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-xl"
            radius="full"
            variant="shadow"
          >
            Get Sharable Link
          </Button>

          {/* <input type="submit" name="submit" value="Upload to Amazon S3" /> */}
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
          We do not store any of your data once it gets expired.
        </div>
      </section>
    </DefaultLayout>
  );
}

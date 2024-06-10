import Register from "@/components/Register";
import Funco from "@/components/Funco";
import crypto from "crypto";
import { Bucket } from "sst/node/bucket";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";


async function fetchSignedUrl() {
  const command = new PutObjectCommand({
    ACL: "public-read",
    Key: crypto.randomUUID(),
    Bucket: process.env.NEXT_PUBLIC_BUCKET_NAME!,
  });
  const url = await getSignedUrl(new S3Client({}), command);
  return url;
}


export default function Home({ url }: { url: string }) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Register />
      <Funco url={url} />
    </main>
  );
}

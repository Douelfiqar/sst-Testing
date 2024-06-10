// components/Home.tsx
import crypto from "crypto";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

async function generateSignedUrl() {
  const bucketName = process.env.NEXT_PUBLIC_BUCKET_NAME;
  if (!bucketName) {
    throw new Error("Bucket name not set in environment variables");
  }

  const command = new PutObjectCommand({
    ACL: "public-read",
    Key: crypto.randomUUID(),
    Bucket: bucketName,
  });
  const url = await getSignedUrl(new S3Client({}), command);
  return url;
}

export default async function Home() {
  const url = await generateSignedUrl();

  return (
    <main>
      <form
        onSubmit={async (e) => {
          e.preventDefault();

          const file = (e.target as HTMLFormElement).file.files?.[0]!;

          const image = await fetch(url, {
            body: file,
            method: "PUT",
            headers: {
              "Content-Type": file.type,
              "Content-Disposition": `attachment; filename="${file.name}"`,
            },
          });

          window.location.href = image.url.split("?")[0];
        }}
      >
        <input name="file" type="file" accept="image/png, image/jpeg" />
        <button type="submit">Upload</button>
      </form>
    </main>
  );
}

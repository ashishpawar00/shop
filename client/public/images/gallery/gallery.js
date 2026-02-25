import Head from "next/head";

export default function Gallery() {
  return (
    <>
      <Head>
        <title>गैलरी - लक्ष्मी कृषि केंद्र</title>
      </Head>

      <div className="p-8 text-center">
        <h1 className="text-3xl font-bold">गैलरी</h1>
        <p className="mt-4 text-gray-600">
          जल्द ही दुकान और उत्पादों की तस्वीरें उपलब्ध होंगी।
        </p>
      </div>
    </>
  );
}

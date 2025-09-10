// pages/index.tsx
import Head from "next/head";
import dynamic from "next/dynamic";
import ErrorBoundary from "../components/ErrorBoundary";
import { useState } from "react";

// Динамическая загрузка с обработкой ошибок
const Yolo = dynamic(() => import("../components/models/Yolo"), {
  ssr: false,
  loading: () => (
    <div className="flex justify-center items-center h-64">
      <div className="text-lg">Loading object detection model...</div>
    </div>
  ),
});

export default function Home() {
  const [error, setError] = useState<string | null>(null);

  return (
    <>
      <Head>
        <title>Real-Time Object Detection</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
      </Head>

      <main className="font-mono flex flex-col justify-center items-center w-screen min-h-screen">
        <h1 className="m-5 text-xl font-bold">Real-Time Object Detection</h1>

        <ErrorBoundary
          fallback={
            <div className="p-4 bg-red-100 border border-red-400 rounded">
              <h2 className="text-red-800 font-bold">Failed to load object detection</h2>
              <p className="text-red-600">Please check your browser compatibility and try again</p>
            </div>
          }
        >
          <Yolo />
        </ErrorBoundary>

        {error && (
          <div className="m-4 p-4 bg-yellow-100 border border-yellow-400 rounded">
            <p className="text-yellow-800">{error}</p>
          </div>
        )}

        <div className="m-5 text-sm text-gray-600 text-center">
          <p>For best performance, use Chrome or Edge browser</p>
          <p>Make sure to allow camera permissions</p>
        </div>

        <p className="m-5">
          Created by{" "}
          <a
            className="underline underline-offset-1 hover:text-blue-600"
            href="https://juanjaho.github.io/"
            target="_blank"
            rel="noopener noreferrer"
          >
            @juanjaho
          </a>
        </p>
      </main>
    </>
  );
}
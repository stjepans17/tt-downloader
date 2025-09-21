"use client";
import { useEffect, useState } from 'react';
import { parseJsonSafely } from '../lib/helpers/jsonParser';
import { downloadContent } from '../lib/helpers/imagesDownloader';
import { useMutation, useQuery } from '@tanstack/react-query';
import Spinner from '../components/spinner';
import ErrorToast from '../components/errorToast';
import { useRouter } from 'next/navigation';

export default function SuccessPage() {
  const router = useRouter();
  const [downloadData, setDownloadData] = useState<string>("");
  const [isSlideshow, setIsSlideshow] = useState<boolean>(false);
  const [contentURLs, setContentURLs] = useState<string[]>([]);
  const [showErrorToast, setShowErrorToast] = useState<boolean>(false);

  const downloadMutation = useMutation({
    mutationFn: (content: string[]) => downloadContent(content),
    onSuccess: () => router.push('/'),
    onError: () => setShowErrorToast(true),
  });

  function handleDownload() {
    downloadMutation.mutate(contentURLs);

  };
  
  useEffect(() => {
    // if(localStorage.length == 0) {
    //   router.push('/');
    // }

    const storedData = localStorage.getItem('downloadResult');
    if (storedData) {
      const parsedJson = parseJsonSafely(storedData);

      if (parsedJson.data?.images) {
        setIsSlideshow(true);
        setContentURLs(parsedJson.data.images)
      }

      else if (parsedJson.data?.noWatermarkMp4) {
        setContentURLs([parsedJson.data.noWatermarkMp4]);
      }
      
      setDownloadData(JSON.stringify(storedData));
      localStorage.removeItem('downloadResult'); 
    }
  }, []);
  
  if (!downloadData) {
    return <div>No data</div>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      {showErrorToast &&
        <div className="absolute top-4 left-1/2 z-50 transform -translate-x-1/2">
          <ErrorToast onClose={setShowErrorToast} />
        </div>}
      <div className="max-w-md w-full bg-white shadow-md p-8 text-center relative m-4">
        <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-black"></div>
        <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-black"></div>
        <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-black"></div>
        <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-black"></div>
        <div className="mb-4">
          <svg
            className="mx-auto h-12 w-12 text-green-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Success!</h1>
        <p className="text-gray-600 mb-6">
          {isSlideshow == true ? `Your slideshow was processed succesfully.` : `Your video was processed succesfully.`}
        </p>

        {isSlideshow == true ? (
          <p className="text-gray-600 mb-6">
            {isSlideshow ? `Found ${contentURLs.length} images.` : `Found the video`}
          </p>
        ) : null}

        {downloadMutation.isPending &&
          <div className="flex justify-center items-center m-2 p-8">
            <Spinner />
          </div>
        }

        <div className='flex flex-col gap-2 my-4'>
          <button
            onClick={handleDownload}
            disabled={downloadMutation.isPending}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 hover:cursor-pointer"
          >{isSlideshow ? 'Download images' : 'Download video'}</button>
          <button
            onClick={() => window.history.back()}
            disabled={downloadMutation.isPending}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 hover:cursor-pointer"
          >
            Go Back
          </button>
        </div>

      </div>
    </div>
  );
}
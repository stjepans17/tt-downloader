
"use client"; 

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { downloadTikTok } from "../functions/downloader";
import { useRouter } from "next/navigation";

interface FormComponentProps {
  showErrorToast? : (error: boolean) => void;
}

export default function Form({ showErrorToast }: FormComponentProps) {
  const [url, setUrl] = useState<string>('');
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: downloadTikTok,
    onSuccess: (data) => {
      localStorage.setItem('downloadResult', JSON.stringify(data));
      router.push('/success');
    },
    onError: (error) => {
      console.error('Download failed:', error);
      showErrorToast && showErrorToast(true); 
    }
  });

  const handleSubmit = (e : any) => {
    e.preventDefault();
    if (url.trim()) {
      mutation.mutate(url);
    }
  };

  return (
    <form
      onSubmit={handleSubmit} 
      className="flex flex-col sm:flex-row w-full max-w-xl gap-3 items-center mx-auto mb-2"
    >
      <input
        placeholder="Enter TikTok URL"
        type="text"
        name="url"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        disabled={mutation.isPending}
        className="flex-1 px-4 py-3 sm:py-2.5 rounded-lg border border-gray-300 bg-gray-50 text-gray-900 text-base leading-tight focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400 m-2"
      />
      <button
        type="submit"
        disabled={mutation.isPending || !url.trim()}
        className="sm:w-auto px-5 py-3 sm:py-2.5 text-base font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-400 focus:outline-none hover:cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {mutation.isPending ? 'Downloading...' : 'Download'}
      </button>
    </form>
  );
}
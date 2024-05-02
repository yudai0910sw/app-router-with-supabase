import React from 'react';

export default function TaskTableSkeleton() {
  const skeletonItems = Array(5).fill(0); // 5つのスケルトンアイテムを作成

  return (
    <ul className="mt-4 divide-y divide-gray-200">
      {skeletonItems.map((_, index) => (
          <li key={index} className="flex items-center justify-between py-2">
            <div className="w-full">
              <div className="h-4 bg-gray-300 rounded-md w-3/4 mb-2"></div> {/* テキストのスケルトン */}
            <div className="h-3 bg-gray-300 rounded-md w-1/2"></div> {/* 日付のスケルトン */}
          </div>
        </li>
      ))}
    </ul>
  );
}

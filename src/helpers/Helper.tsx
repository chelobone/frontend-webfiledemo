import axios from "axios";
import React, { ChangeEvent, useCallback, useState } from "react";
import { UploadOptions, useTus } from "use-tus";

export const getPreview = (fileName: string) => {
    return axios.get(`https://localhost:7115/api/file/${fileName}`,
        { responseType: 'arraybuffer' });
};

export const uploadMultiPart = (data: any) => {
    return axios.post('https://localhost:7115/api/file', data);
}

// export const uploadTus = (file: File,
//     handleProgres: (bytesSent: number, bytesTotal: number) => void,
//     handleSuccess: () => void) => {
//     const { upload, setUpload, isSuccess, isAborted, error, remove } = useTus();
//     return setUpload(file, {
//         endpoint: 'https://localhost:7115/files/',
//         metadata: {
//             filename: file.name,
//             filetype: file.type,
//         },
//         onProgress: handleProgres,
//         onSuccess: handleSuccess

//     });
// }
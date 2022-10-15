import React, { ChangeEvent, useCallback, useState } from 'react';
import axios, { Axios } from 'axios';
import { Buffer } from 'buffer';
import logo from './logo.svg';
import { useTus, UploadOptions, UseTusOptions } from 'use-tus'
import { getPreview, uploadMultiPart } from '../helpers/Helper';

const FileTus = () => {

    const handleProgres = (bytesSent: number, bytesTotal: number) => {

        var percentage = (bytesSent / bytesTotal * 100).toFixed(2)
        console.log(bytesSent, bytesTotal, percentage + "%")
    };
    const { upload, setUpload, isSuccess, isAborted, error, remove } = useTus();
    const [cantidad, setCantidad] = useState(1);
    const [items, setItem] = useState([] as any[]);
    const [fileName, setFileName] = useState("");
    const [b64, setB64] = useState("");

    const handleSuccess = () => {
        console.log(fileName);
        getPreview(fileName).then(result => {
            console.log(result.data);
            var arrayBufferView = new Uint8Array(result.data);
            var blob = new Blob([arrayBufferView], { type: "image/jpeg" });
            var urlCreator = window.URL || window.webkitURL;
            var imageUrl = urlCreator.createObjectURL(blob);
            setB64(imageUrl);
        }).catch(error => {

            console.log(error);
        });
    }
    const handleSetUpload = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.item(0);

        if (!file) {
            return;
        }

        setUpload(file, {
            endpoint: 'https://localhost:7115/files/',
            metadata: {
                filename: file.name,
                filetype: file.type,
            },
            onProgress: handleProgres,
            onSuccess: handleSuccess
        });

    }, [setUpload]);

    const handlerQuantity = (event: ChangeEvent<HTMLInputElement>) => {
        console.log(event.currentTarget.value);
        let cantidad = parseInt(event.currentTarget.value);
        if (cantidad > 0) {
            setCantidad(cantidad);
        } else {
            setCantidad(0);
        }
    }

    const handleStart = useCallback(() => {
        if (!upload) {
            return;
        }

        if (upload.url) {
            console.log(upload.url);
            let name = upload.url.split("/").pop();
            if (name)
                setFileName(name);
        }

        // Start to upload the file.
        upload.start();
    }, [upload, fileName]);

    return (
        <div>
            <div>
                <label>Solicitudes en simultaneo para enviar al API</label>
                <input type="number" onChange={handlerQuantity} value={cantidad > 0 ? cantidad : ""} />
            </div>
            <input type="file" onChange={handleSetUpload} />
            <button type="button" onClick={handleStart}>
                Upload
            </button>
            <img style={{ border: 1 }} src={b64} />
        </div>
    );
}

export default FileTus;
import React, { ChangeEvent, ChangeEventHandler, useState } from 'react';
import axios, { Axios } from 'axios';
import { Buffer } from 'buffer';
import logo from './logo.svg';
import { getPreview, uploadMultiPart } from '../helpers/Helper';

const FileMultiPart = () => {
    const [file, setFile] = useState({} as any);
    const [items, setItem] = useState([] as any[]);
    const [cantidad, setCantidad] = useState(1);
    const load = () => {
        if (file === undefined) {
            return;
        }

        var data = new FormData();
        data.append("file", file);
        let newItems = [];
        for (let i = 1; i <= cantidad; i++) {
            let copy = items;
            let index = copy.findIndex(it => it.id == i);
            copy[index].value = `Solicitud ${i} enviada`;

            setItem([...copy]);

            uploadMultiPart(data).then(result => {
                console.log(result);
                let copy = items;
                let index = copy.findIndex(it => it.id == i);
                copy[index].value = `Solicitud ${i} ok. Obteniendo preview`;

                setItem([...copy]);
                getImage(result.data, i);
            }).catch(error => {
                let copy = items;
                let index = copy.findIndex(it => it.id == i);
                copy[index].value = `Solicitud ${i} con error`;

                setItem([...copy]);
                console.log(error);
            });
        }

    };

    const getImage = (name: string, i: number) => {
        let fileName = file!=undefined?file.name:"";
        getPreview(file.name).then(result => {
            console.log(result.data);
            var arrayBufferView = new Uint8Array(result.data);
            var blob = new Blob([arrayBufferView], { type: "image/jpeg" });
            var urlCreator = window.URL || window.webkitURL;
            var imageUrl = urlCreator.createObjectURL(blob);
            let copy = items;
            let index = copy.findIndex(it => it.id == i);
            copy[index].value = `Imagen creada para ${index}`;
            copy[index].b64 = imageUrl;

            setItem([...copy]);
        }).catch(error => {

            console.log(error);
        });
    }

    const fileFunction = (value: any) => {
        console.log(value.currentTarget.files[0]);
        setFile(value.currentTarget.files[0]);

        let newItems = [];
        for (let i = 1; i <= cantidad; i++) {
            let item = { id: i, value: `Solicitud ${i} esperando a ser enviada` };
            newItems.push(item);
            setItem(newItems);
        }
    };

    const handlerQuantity = (event: ChangeEvent<HTMLInputElement>) => {
        console.log(event.currentTarget.value);
        let cantidad = parseInt(event.currentTarget.value);
        if (cantidad > 0) {
            setCantidad(cantidad);
        } else {
            setCantidad(0);
        }
    }

    return (

        <div className="App">
            <div>
                <label>Solicitudes en simultaneo para enviar al API</label>
                <input type="number" onChange={handlerQuantity} value={cantidad > 0 ? cantidad : ""} />
            </div>
            <div>
                <input type="file" onChange={fileFunction} />
            </div>
            <div>
                <button onClick={load}>Cargar</button>
            </div>
            <div>
                {items.map(item => {
                    return <div key={item.id}>{item.value}
                        <div>
                            <img style={{ border: 1 }} key={`img_${item.id}`} src={item.b64} />
                        </div>
                    </div>
                })}
            </div>
        </div>
    );
}

export default FileMultiPart;
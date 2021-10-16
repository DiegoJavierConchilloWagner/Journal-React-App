import cloudinary from 'cloudinary';

import {
    fileUpload
} from '../../helpers/fileUpload';



cloudinary.config({
    cloud_name: 'doejsqlbl',
    api_key: '867939813996391',
    api_secret: 'YBDC5ZJoKAOwjt_sa6ihIQYitu4'
});

describe('Pruebas en fileUpload', () => {



    test('Debe cargar un archivo a "cloudinary" y retornar un "url"', async () => {
        const imgUrl = 'https://image.flaticon.com/icons/png/128/3063/3063076.png';

        const resp = await fetch(imgUrl);
        const blob = await resp.blob();

        const file = new File([blob], 'foto.png');
        const urlReturned = await fileUpload(file);

        expect(typeof urlReturned).toBe('string');

        // Borrar imagen para que nuestra cuenta no se llene

        const segments = urlReturned.split('/');
        console.log(segments)
        const imageID = segments[segments.length - 1].replace('.png', '');

        const folderName = "nombrecarpeta";
        // Fn de la API cloudinary para borrar la imagen subida
        cloudinary.v2.api.delete_resources(`${folderName}/${imageID}`, {}, () => {
            // done();
        });
    });


    // test('debe de retornar un error', async () => {

    //     const file = new File([], 'foto.png');
    //     const url = await fileUpload(file);

    //     expect(url).toBe(null);


    // })




})
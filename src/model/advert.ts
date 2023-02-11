export class Advert {

    title: string;
    image: string;
    id: string;

    constructor(
        title: string,
        image: string,
        id?: string
    ) {
        this.title = title;
        this.image = image;
        this.id = id
    }

}
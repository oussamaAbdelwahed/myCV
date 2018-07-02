import { ImageType } from '../commontasks/imagetype.enum';
export class CVImage {
    constructor(
        public src: string, public name: string , public type: ImageType, public show: boolean,
        public extension: string, public createdAt: string, public height: number,
        public width: number, public alt: string, public description: string,
        public id?: number
    ) {}
}

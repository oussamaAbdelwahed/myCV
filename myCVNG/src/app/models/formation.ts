import { FormationType } from '../commontasks/imagetype.enum';
export class Formation {
  constructor(
    public description: string, public name: string, public proofDocument: string,
    public type: FormationType, public id?: number, public createdAt?: string
  ) {}
}

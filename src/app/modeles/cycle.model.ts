import {EtablissementModel} from './etablissement.model';

export class Cycle {
  public id?: number;
  public libelle: string;
  public archiver: boolean;
  public etablissement: EtablissementModel;
}

import {VilleModel} from './ville.model';

export class EtablissementModel {
  public id?: number;
  public libelle: string;
  public etat: boolean;
  public isArchiver: boolean;
  public ville: VilleModel;
}

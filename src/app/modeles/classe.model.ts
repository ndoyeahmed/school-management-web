import {NiveauModel} from './niveau.model';
import {UtilisateurModel} from './utilisateur.model';

export class ClasseModel {
  public id?: number;
  public libelle: string;
  public archiver: boolean;
  public niveau: NiveauModel;
  public utilisateur: UtilisateurModel;
}

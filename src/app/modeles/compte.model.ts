import {UtilisateurModel} from './utilisateur.model';

export class CompteModel {
  public id?: number;
  public email: string;
  public password: string;
  public utilisateur: UtilisateurModel;
}

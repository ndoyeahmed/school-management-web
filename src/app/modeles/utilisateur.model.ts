import {CompteModel} from './compte.model';
import {EtablissementModel} from './etablissement.model';

export class UtilisateurModel {
  public id?: number;
  public nom?: string;
  public prenom?: string;
  public adresse?: string;
  public telephone?: string;
  public date?: any;
  public etat: boolean;
  public isArchiver: boolean;
  public compte: CompteModel;
  public etablissement: EtablissementModel;
}

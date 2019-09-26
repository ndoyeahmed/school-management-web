import {MoisModel} from './mois.model';
import {TypePaiementModel} from './type-paiement.model';
import {UtilisateurModel} from './utilisateur.model';

export class PaiementModel {
  public id?: number;
  public date: any;
  public montant: number;
  public mois: MoisModel;
  public typePaiement: TypePaiementModel;
  private utilisateur: UtilisateurModel;
}

import {Cycle} from './cycle.model';

export class NiveauModel {
  public id?: number;
  public libelle: string;
  public montantInscription: number;
  public montantMensuel: number;
  public archiver: boolean;
  public cycle: Cycle;
}

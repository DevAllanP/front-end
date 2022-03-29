import { Adresse } from "src/app/models/Adresse.model";

export interface User {
  nom: string;
  prenom: string;
  email: string;
  dateNaissance: number;
  password?: string;
  accessToken?: string;
  roleLabel?: string;
  adresse:Adresse;
}

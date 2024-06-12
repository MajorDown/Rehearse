import { NextResponse } from "next/server";
import databaseConnecter from "@/tools/backend/databaseConnecter";
import { tokenChecker } from "@/tools/backend/tokenManager";
import { passwordChecker, passwordCrypter } from "@/tools/backend/passwordManager";
import UserModel from "@/tools/backend/models/model.user";

export async function PATCH(request: Request) {
    const {connectedUser, lastPassword, newPassword } = await request.json();
    console.log(`api/password/update ~> Tentative de modification du password du compte ${connectedUser.email}`);
    try {
        // CONNEXION A LA DB
        await databaseConnecter();
        // AUTHENTIFICATION
        let userToUpdate = await UserModel.findOne({email: connectedUser.email});
        const authHeader = request.headers.get('Authorization');
        const token = authHeader && authHeader.split(' ')[1];
        const isAuthentified = token ? await tokenChecker(token, userToUpdate.email) : false;
        if (!isAuthentified) {
          console.log(`api/password/update ~> ${connectedUser.email} a échoué son authentification`);
          return NextResponse.json("Non autorisé", { status: 401 });
        }
        // VERIFICATION DE L'ANCIEN PASSWORD
        const isPasswordValid = await passwordChecker(lastPassword, userToUpdate.password);
        if (!isPasswordValid) {
            console.log(`api/password/update ~> ${connectedUser.email} a échoué la vérification de son ancien password`);
            return NextResponse.json("Échec de la modification du password", { status: 500 });
        }
        // MODIFICATION DU PASSWORD
        const hashedPassword = await passwordCrypter(newPassword);
        userToUpdate.password = hashedPassword;
        userToUpdate.save();
        console.log(`api/password/update ~> ${connectedUser.email} à mis à jour son password`);
        return NextResponse.json("password mis à jour !", { status: 200 });
    }
    // GESTION DES ERREURS
    catch (error) {
        console.log("api/password/update ~> error :", error);
        return NextResponse.json("Échec de la modification du password", { status: 500 });
    }
}
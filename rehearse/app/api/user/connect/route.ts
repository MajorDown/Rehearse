import { NextResponse } from "next/server";
import { ConnectedUser, User } from "@/types";
import UserModel from "@/tools/backend/models/model.user";
import {tokenMaker} from "@/tools/backend/tokenManager";
import { passwordChecker } from "@/tools/backend/passwordManager";

/*
* Route de connexion d'un utilisateur
*/
export async function POST(request: Request) {
    const { email, password } = await request.json();
    console.log(
        "api/user/connexion ~> Tentative de connexion via l'adresse mail :",
        email
    );
    try {
        // VERIFICATION DE L'EXISTENCE DU USER
        const userToConnect = await UserModel.findOne({email, password});
        if (!userToConnect) {
            console.log("api/user/connexion ~> Utilisateur non trouvé");
            return NextResponse.json({ status: 404 });
        }
        // AUTHENTIFICATION DU USER ET CREATION DU TOKEN
        const isPasswordValid = await passwordChecker(password, userToConnect.password);
        if (!isPasswordValid) {
            console.log("api/user/connexion ~> Mot de passe incorrect");
            return NextResponse.json({ status: 401 });
        }
        // CONNEXION DE L'UTILISATEUR
        console.log("api/user/connexion ~> Utilisateur connecté via l'adresse :", email);
        const token = tokenMaker(email);
        const connectedUser: ConnectedUser = {
            name: userToConnect.name,
            email: userToConnect.email,
            profile: userToConnect.profile,
            authToken: token
        }
        // RENVOI DU NOUVEAU MEMBRE
        return NextResponse.json(connectedUser, { status: 201 });
    }
    catch (error) {
        console.error("api/user/create ~> Erreur lors de la connexion :", error);
        return NextResponse.json("failed to signup", { status: 500 });
    }
}
import { NextResponse } from "next/server";
import { User } from "@/types";
import UserModel from "@/tools/backend/models/model.user";
import sendMailToNewuser from "@/tools/backend/nodemailer/sendMailToNewUser";

/*
* Route de création d'un nouvel utilisateur
*/
export async function POST(request: Request) {
    const { name, email, password,}: User = await request.json();
    console.log(
        "api/user/create ~> Tentative d'inscription via l'adresse mail :",
        email
    );
    try {
        // VERIFICATION DE L'EXISTENCE DU USER
        const userToCheck = await UserModel.findOne({email: email});
        if (userToCheck) {
            console.log("api/user/create ~> Utilisateur déjà existant");
            return NextResponse.json({ status: 409 });
        }
        // CREATION DU NOUVEAU MEMBRE
        const newUser = new UserModel({name, email, password});
        await newUser.save();
        console.log("api/user/create ~> Utilisateur créé via l'adresse :", email);
        // ENVOI DU MAIL DE BIENVENUE
        const emailIsSent = await sendMailToNewuser(newUser);
        if (!emailIsSent) {
            console.error("api/user/create ~> Erreur lors de l'envoi du mail de bienvenue");
            return NextResponse.json("failed to send email", { status: 511 });
        }
        // RENVOI DU NOUVEAU MEMBRE
        return NextResponse.json({ status: 201 });
    }
    catch (error) {
        console.error("api/user/create ~> Erreur lors de l'inscription :", error);
        return NextResponse.json("failed to signup", { status: 500 });
    }
}
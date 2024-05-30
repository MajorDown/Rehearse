import { NextResponse } from "next/server";
import { ConnectedUser, User } from "@/types";

export async function POST(request: Request) {
    const { name, email, password}: User = await request.json();
    console.log(
        "api/user/create ~> Tentative d'inscription via l'adresse mail :",
        email
    );
    try {
        // VERIFICATION DE L'EXISTENCE DU USER
        // CREATION DU NOUVEAU MEMBRE
        // RENVOI DU NOUVEAU MEMBRE
        return NextResponse.json({ status: 201 });
    }
    catch (error) {
        console.error("api/user/create ~> Erreur lors de l'inscription :", error);
        return NextResponse.json("failed to signup", { status: 500 });
    }
}
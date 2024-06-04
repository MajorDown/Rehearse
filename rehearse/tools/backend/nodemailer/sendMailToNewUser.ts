const Nodemailer = require('nodemailer');
import { User } from "@/types";

/**
 * Envoi un mail de bienvenue à un nouveau membre
 * 
 * @param {User} user
 * @param {string} newPassword
 * @returns {Promise<boolean>}
 */
async function sendMailToNewuser(user: User) {
    // CREATION DU TRANSPORTEUR NODEMAILER
    const transporter = Nodemailer.createTransport({
        host: 'mail.gmx.com',
        port: 587,
        secure: false,
        auth: {
            user: process.env.GMX_ADRESS,
            pass: process.env.GMX_PASSWORD,
        },
    });

    // CREATION DES OPTIONS DU MAIL
    const mailOptions = {
        from: '"Rehearse - application de gestion de répet" <rehearse.app@gmx.fr>',
        to: user.email,
        subject: 'Bienvenue sur Rehearse !',
        html: /*html*/`
            <div style="font-family: monospace">
                <h1 style="margin-left: 50px; margin-bottom: 30px">Bienvenue sur Rehearse, l'application qui t'aide à te retrouver dans tes enregistrements de repet' !</h1>
                <div style="margin: 0 auto">
                    <p>Bonjour ${user.name},</p>
                    <p>vous venez de créer un nouveau compte utilisateur sur Rehearse.com. Tous nos remerciements !</p>
                    <p>En espérant que votre expérience soit agréable.</p>
                </div>
                <p style="margin-top: 10px">voici les informations qui ont été saisi lors de votre inscription :</p>
                <ul>
                    <li style="liste-style: none; margin-left: 30px"><p>Votre pseudo : <strong>${user.name}</strong></p></li>
                    <li style="liste-style: none; margin-left: 30px"><p>Votre adresse mail : <strong>${user.email} (oui, celle-là même que vous êtes en train d'utiliser. c'est bien fichu.)</strong></p></li>
                    <li style="liste-style: none; margin-left: 30px"><p>Votre mot de passe : <strong>${user.password}</strong> (Vous pourrez le modifier à votre convenance une fois connecté à votre compte Rehearse !)</p></li>
                </ul>
                <p style="margin-top: 10px">Vous pouvez dès à présent vous rendre sur votre compte en vous rendant à l'adressse <a href="https://rehearse.com/connexion">https://rehearse.com/connexion</a><br/>
                et choisir votre abonnement : free, pro ou premium.</p>
                <p>À bientôt sur Rehearse !</p>
            </div>
            <p>PS : Ce mail est envoyé automatiquement, inutile d'y répondre.</p>
            <p>PPS : Si vous n'avez pas fais de demande d'inscription.. n'hésitez pas à nous répondre et nous le faire savoir, il s'agira probablement d'une erreur.</p>
        `
    };

    // ENVOI DU MAIL
    try {
        await transporter.sendMail(mailOptions);
        console.log('sendMailToNewuser ~> Email envoyé avec succès à', user.email);
        return true;
    } catch (error: any) {
        console.error('sendMailToNewuser ~> Erreur lors de l\'envoi de l\'email:', error);
        return false;
    }
}

export default sendMailToNewuser;
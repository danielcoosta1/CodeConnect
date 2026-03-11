import nodemailer from "nodemailer";

/* global process */

export const sendVerificationEmail = async (toEmail, code) => {
  try {
    // 1. O NOVO CAMINHÃO DE ENTREGA (BLINDADO PARA NUVEM)
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com", // Vai direto no servidor
      port: 465,              // Porta segura
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      // Força o uso de IPv4 e ignora o bloqueio do Render
      family: 4, 
    });

    // 2. Prepara a carta
    const mailOptions = {
      from: `"CodeConnect Team" <${process.env.EMAIL_USER}>`,
      to: toEmail,
      subject: "Seu código de verificação - CodeConnect",
      html: `
        <div style="font-family: Arial, sans-serif; text-align: center; padding: 20px; background-color: #f4f4f4; border-radius: 8px;">
          <h2 style="color: #333;">Bem-vindo ao CodeConnect! 🚀</h2>
          <p style="color: #666; font-size: 16px;">Para concluir seu cadastro e validar sua conta, digite o código de 6 dígitos abaixo no aplicativo:</p>
          <div style="background-color: #fff; padding: 20px; border-radius: 8px; display: inline-block; margin: 20px 0; border: 2px dashed #00b37e;">
            <h1 style="font-size: 40px; letter-spacing: 10px; color: #00b37e; margin: 0;">${code}</h1>
          </div>
          <p style="color: #999; font-size: 14px;">Este código expira em 10 minutos. Se não foi você, apenas ignore este e-mail.</p>
        </div>
      `,
    };

    // 3. Envia o e-mail
    await transporter.sendMail(mailOptions);
    console.log(`✉️ E-mail de verificação enviado com sucesso para ${toEmail}`);
    return true;

  } catch (error) {
    console.error("❌ Erro ao enviar e-mail:", error);
    return false; // Aqui ele retorna false e o seu Controller precisa saber lidar com isso!
  }
};
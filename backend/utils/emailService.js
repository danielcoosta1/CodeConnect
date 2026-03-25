/* global process */

export const sendVerificationEmail = async (toEmail, code) => {
  try {
    // Usamos o fetch nativo para chamar a API do Brevo diretamente
    const response = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": process.env.BREVO_API_KEY, 
      },
      body: JSON.stringify({
        sender: {
          name: "CodeConnect Team",
          email: "daniel.dc697@gmail.com",
        },
        to: [
          {
            email: toEmail,
          },
        ],
        subject: "Seu código de verificação - CodeConnect",
        htmlContent: `
          <div style="font-family: Arial, sans-serif; text-align: center; padding: 20px; background-color: #f4f4f4; border-radius: 8px;">
            <h2 style="color: #333;">Bem-vindo ao CodeConnect! 🚀</h2>
            <p style="color: #666; font-size: 16px;">Para concluir seu cadastro e validar sua conta, digite o código de 6 dígitos abaixo no aplicativo:</p>
            <div style="background-color: #fff; padding: 20px; border-radius: 8px; display: inline-block; margin: 20px 0; border: 2px dashed #00b37e;">
              <h1 style="font-size: 40px; letter-spacing: 10px; color: #00b37e; margin: 0;">${code}</h1>
            </div>
            <p style="color: #999; font-size: 14px;">Este código expira em 10 minutos. Se não foi você, apenas ignore este e-mail.</p>
          </div>
        `,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("❌ Erro da API do Brevo:", errorData);
      return false; // Retorna false para o seu Controller saber que falhou
    }

    console.log(`✉️ E-mail enviado com sucesso via Brevo para ${toEmail}`);
    return true;

  } catch (error) {
    console.error("❌ Erro fatal ao tentar enviar e-mail:", error);
    return false;
  }
};


export const sendPasswordResetEmail = async (toEmail, resetLink) => {
  try {
    const response = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": process.env.BREVO_API_KEY, 
      },
      body: JSON.stringify({
        sender: {
          name: "CodeConnect Team",
          email: "daniel.dc697@gmail.com",
        },
        to: [
          {
            email: toEmail,
          },
        ],
        subject: "Recuperação de Senha - CodeConnect",
        htmlContent: `
          <div style="font-family: Arial, sans-serif; text-align: center; padding: 20px; background-color: #f4f4f4; border-radius: 8px;">
            <h2 style="color: #333;">Esqueceu sua senha? 🔒</h2>
            <p style="color: #666; font-size: 16px;">Não se preocupe, isso acontece nas melhores famílias de devs!</p>
            <p style="color: #666; font-size: 16px;">Clique no botão abaixo para criar uma nova senha:</p>
            
            <a href="${resetLink}" style="display: inline-block; background-color: #00b37e; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; margin: 20px 0; font-size: 16px;">
              Redefinir Minha Senha
            </a>
            
            <p style="color: #999; font-size: 14px;">Ou copie e cole este link no seu navegador:</p>
            <p style="color: #999; font-size: 12px; word-break: break-all;">${resetLink}</p>

            <p style="color: #999; font-size: 14px; margin-top: 30px;">Este link é válido por 1 hora. Se você não solicitou a troca de senha, apenas ignore este e-mail e sua conta continuará segura.</p>
          </div>
        `,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("❌ Erro da API do Brevo (Recuperação):", errorData);
      return false; 
    }

    console.log(`✉️ E-mail de recuperação enviado com sucesso para ${toEmail}`);
    return true;

  } catch (error) {
    console.error("❌ Erro fatal ao tentar enviar e-mail de recuperação:", error);
    return false;
  }
};

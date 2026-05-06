/* 
// CONFIGURACIÓN PARA PRODUCCIÓN (AWS SES)
// Cuando recuperes la cuenta, descomenta las líneas de importación y el bloque dentro del try.
// import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";

const sesClient = null; 
// Si estuviera activo:
// const sesClient = new SESClient({
//   region: process.env.AWS_REGION,
//   credentials: {
//     accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//     secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
//   },
// });
*/

export default async function handler(req, res) {
  // Configuración de CORS para que tu frontend (Vite) pueda comunicarse con la API
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // Responder rápido a la petición pre-flight de los navegadores
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  // 1. Validar método
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Método no permitido' });
  }

  const { email, tasks } = req.body;

  // 2. Validar que lleguen datos
  if (!email || !tasks) {
    return res.status(400).json({ message: 'Faltan datos obligatorios (email o tasks)' });
  }

  // 3. Formatear el resumen de tareas (Lógica de negocio)
  const taskListText = tasks
    .map(t => `- [${t.completed ? 'X' : ' '}] ${t.title}`)
    .join('\n');

  console.log("--- PROCESANDO ENVÍO DE EMAIL ---");
  console.log(`Para: ${email}`);
  console.log("Contenido:\n", taskListText);

  try {
    // Simulamos latencia de red para que el frontend pueda mostrar un spinner
    await new Promise(resolve => setTimeout(resolve, 1500));

    // VARIABLE DE CONTROL: Se queda en true por falta de cuenta de AWS
    const simulateSend = true; 

    if (!simulateSend) {
      /*
      const params = {
        Source: process.env.SOURCE_EMAIL, // Tu email verificado
        Destination: { ToAddresses: [email] },
        Message: {
          Subject: { Data: "Resumen de tareas - Proyecto Final" },
          Body: { Text: { Data: `Hola, este es tu resumen:\n\n${taskListText}` } },
        },
      };
      // const command = new SendEmailCommand(params);
      // await sesClient.send(command);
      */
    } else {
      console.log("--- MOCK: AWS SES SEND SUCCESS ---");
    }

    // Respuesta exitosa al frontend
    return res.status(200).json({
      ok: true,
      message: simulateSend
        ? 'Simulación: Email procesado por el backend correctamente.'
        : 'Éxito: Email enviado vía AWS SES.',
      debug: {
        recipient: email,
        taskCount: tasks.length,
        mode: simulateSend ? "offline-simulation" : "aws-production"
      }
    });

  } catch (error) {
    console.error("Error en el servidor:", error);
    return res.status(500).json({ 
      ok: false, 
      message: 'Error al procesar el envío', 
      error: error.message 
    });
  }
}
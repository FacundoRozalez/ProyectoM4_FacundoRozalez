/*import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";

// Configuración de AWS
const sesClient = new SESClient({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

export default async function handler(req, res) {
  // Solo permitimos peticiones POST
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { email, tasks } = req.body;

  // Formateamos la lista de tareas para el cuerpo del mail
  const taskListText = tasks.map(t => `- [${t.completed ? 'X' : ' '}] ${t.title}`).join('\n');

  const params = {
    Source: process.env.SOURCE_EMAIL, // Tu email verificado en AWS
    Destination: { ToAddresses: [email] },
    Message: {
      Subject: { Data: "Resumen de tus tareas - MateCode" },
      Body: {
        Text: { Data: `Hola! Aquí tienes el resumen de tus tareas:\n\n${taskListText}` },
      },
    },
  };

  try {
    const command = new SendEmailCommand(params);
    await sesClient.send(command);
    return res.status(200).json({ message: 'Email enviado con éxito' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error al enviar email', error: error.message });
  }
}

/*
----------------------------------------
----------------------------------------
----------------------------------------
FALTAN CREDENCIALES DE AWS
// Comentamos el cliente de AWS para que no tire error por falta de variables de entorno
/* 
import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";
const sesClient = new SESClient({ ... }); 
*/

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { email, tasks } = req.body;

  // Formateamos para ver en la consola de la terminal que los datos llegan bien
  const taskListText = tasks.map(t => `- [${t.completed ? 'X' : ' '}] ${t.title}`).join('\n');
  
  console.log("------------------------------------------");
  console.log(`SIMULACIÓN DE ENVÍO PARA: ${email}`);
  console.log("CONTENIDO:\n", taskListText);
  console.log("------------------------------------------");

  try {
    // Simulamos una demora de 1 segundo para que en el frontend 
    // se vea el estado de "Enviando..."
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Devolvemos éxito aunque no se haya enviado el mail real
    return res.status(200).json({ 
      message: 'Simulación exitosa: El backend recibió los datos.',
      debug: { sentTo: email, taskCount: tasks.length } 
    });

  } catch (error) {
    return res.status(500).json({ message: 'Error en la simulación' });
  }
}
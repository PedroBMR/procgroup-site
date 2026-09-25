import type { Locale } from "../i18n/config";

/**
 * Política de Privacidade traduzida.
 *
 * O português é a VERSÃO CANÔNICA: vem do WordPress (coleção `pages`), é o que
 * a Proc publica e é o que vale juridicamente. O que está aqui são traduções
 * de leitura, autorizadas em 2026-09-25, para que quem navega em /en e /es
 * entenda o documento sem precisar do português.
 *
 * Duas consequências práticas:
 *
 *  1. O canonical das páginas traduzidas continua apontando para a versão PT
 *     (ver BaseLayout) — uma política, três leituras.
 *  2. Se o texto mudar no WordPress, ESTAS TRADUÇÕES FICAM DESATUALIZADAS e
 *     ninguém percebe sozinho. Por isso existe scripts/checa-politica.mjs, que
 *     compara a estrutura das três versões e acusa divergência. Rode-o depois
 *     de qualquer alteração na política.
 *
 * Nomes próprios, CNPJ, razão social, telefone, e-mail e a citação da lei
 * ficam como no original: são identificadores, não texto a traduzir.
 */
export interface BlocoPolitica {
  tipo: "h4" | "p" | "ul";
  /** h4 e p. Quebras de linha viram <br>. */
  texto?: string;
  /** ul. */
  itens?: string[];
}

const EN: BlocoPolitica[] = [
  { tipo: "h4", texto: "Who We Are" },
  {
    tipo: "p",
    texto:
      "Our website: procgroup.com.br\nCNPJ (Brazilian company registry): 10.381.377/0001-91\nLegal name: Proc Solucoes em Informatica Proc Especialistas em Infraestrutura de Ti LTDA",
  },

  { tipo: "h4", texto: "Our Policies" },
  {
    tipo: "p",
    texto:
      "All personal information collected is used to make your visit to our site pleasant and secure. PROC GROUP guarantees the confidentiality of the personal data collected, under Brazil's General Data Protection Law (Law 13.709/2018 – “LGPD”), observing your right to:",
  },
  {
    tipo: "ul",
    itens: [
      "Confirmation that we process your personal data;",
      "Access to the content of your personal data;",
      "Request correction of outdated or incomplete personal data;",
      "Request deletion, blocking or anonymisation of personal data deemed unnecessary or not compliant with the LGPD;",
      "Request deletion of personal data processed on the basis of your consent, except where the LGPD requires the data to be retained;",
      "Request information about who your personal data is shared with;",
      "Request information about the option of withholding consent and the consequences, disadvantages and access limitations that follow;",
      "Withdraw your authorisation to process your personal data, where processing is based on your consent;",
      "Object to any processing of information that breaches the LGPD;",
    ],
  },
  { tipo: "p", texto: "We do not share your information, browsing history or preferences with third parties." },
  {
    tipo: "p",
    texto:
      "By accessing the PROC GROUP website and its pages, you agree to this privacy policy in all its terms. We recommend checking this page regularly so you are always aware of the latest changes.",
  },

  { tipo: "h4", texto: "Information Collected" },
  {
    tipo: "p",
    texto:
      "Information that may be collected, stored and used so that we can offer you the best content, offers and communications:",
  },
  {
    tipo: "ul",
    itens: [
      "Information about your computer, IP address, geographic location, browser type and version, and operating system;",
      "Information about your use of the site and your visits, referral or origin, length of visit, pages viewed and navigation flow;",
      "Your e-mail address, used when logging into your account, registering, sending messages through forms or accessing special content;",
      "Profile registration information on our site — for example name, photo, address, gender, date of birth, occupation, interests and others related to the topic pages;",
      "Any other personal information you send us;",
      "General information you type or search for while browsing the site;",
      "Information captured automatically while you use our site, including date, time and frequency of use;",
      "Information related to purchases, services you use or transactions made through our site, including name, address, telephone number, e-mail address and credit card details for approving purchases;",
    ],
  },
  {
    tipo: "p",
    texto:
      "The content of what you publish on our site, such as testimonials and product comments, including your username and profile photos, where available;",
  },
  {
    tipo: "p",
    texto:
      "Information contained in the communications you send us by e-mail, WhatsApp, chat, direct message (social networks) or through our site, including content and metadata;",
  },
  { tipo: "p", texto: "Your name and e-mail address for receiving our newsletters." },

  { tipo: "h4", texto: "Purpose of Data Use" },
  { tipo: "p", texto: "Personal information may be used to:" },
  {
    tipo: "ul",
    itens: [
      "Enable management of the site and of the business environment;",
      "Personalise the site according to the usage preferences identified;",
      "Make the site's features available for use;",
      "Manage the sending of content, links, payment reminders or abandoned cart notices;",
      "Support customer service through the site;",
      "Carry out delivery of the products or services contracted;",
      "Send promotional and informational communications (which you may cancel at any time);",
      "Send content and notifications requested by the user;",
      "Provide statistical data about user profiles (without individual identification);",
      "Keep the site secure and prevent fraud;",
      "Verify compliance with the terms and conditions of use.",
    ],
  },

  { tipo: "h4", texto: "Disclosure of Information" },
  {
    tipo: "p",
    texto:
      "Personal information is disclosed in order to faithfully fulfil our company's purpose, in line with the aims set out in this policy, by our employees, managers, authorities and partners:",
  },
  {
    tipo: "ul",
    itens: [
      "As provided for or required by law;",
      "To provide legal support in ongoing or potential court proceedings;",
      "To exercise the defence of our legal rights;",
      "To tax authorities (issuing invoices);",
      "To carriers and couriers for shipping goods.",
    ],
  },

  { tipo: "h4", texto: "Our Ads and Campaigns" },
  {
    tipo: "p",
    texto:
      "We use information contained in ads (such as IP, ISP and browser) for traffic analysis. You may turn cookies off in your browser settings or in antivirus tools, bearing in mind that this may affect how you interact with our site and your access to restricted areas.",
  },

  { tipo: "h4", texto: "Cookies" },
  {
    tipo: "p",
    texto:
      "Comments: when leaving a comment, you may choose to save your name and e-mail in cookies for your convenience. These last one year.",
  },
  {
    tipo: "p",
    texto:
      "Login: if you visit our login page, a temporary cookie is created to test browser compatibility (with no personal data). When you log in, access cookies are created and last from two days to two weeks (if “Remember me” is selected).",
  },
  {
    tipo: "p",
    texto:
      "Editing: if you edit or publish content, an additional cookie (the post ID only) is stored for 24 hours.",
  },

  { tipo: "h4", texto: "General Questions" },
  {
    tipo: "p",
    texto:
      "If you have questions after reading this Policy, please contact our team by phone at (46) 3224-3532 or send an e-mail to comercial@procgroup.com.br.",
  },
  {
    tipo: "p",
    texto: "We consider that by browsing the PROC GROUP site you agree to the terms presented.",
  },
];

const ES: BlocoPolitica[] = [
  { tipo: "h4", texto: "Quiénes Somos" },
  {
    tipo: "p",
    texto:
      "Nuestro sitio web: procgroup.com.br\nCNPJ (registro mercantil brasileño): 10.381.377/0001-91\nRazón social: Proc Solucoes em Informatica Proc Especialistas em Infraestrutura de Ti LTDA",
  },

  { tipo: "h4", texto: "Nuestras Políticas" },
  {
    tipo: "p",
    texto:
      "Toda la información personal recogida se utiliza para que su visita a nuestro sitio sea agradable y segura. PROC GROUP garantiza la confidencialidad de los datos personales recogidos, conforme a la Ley General de Protección de Datos de Brasil (Ley 13.709/2018 – “LGPD”), respetando su derecho a:",
  },
  {
    tipo: "ul",
    itens: [
      "Confirmación de que tratamos sus datos personales;",
      "Acceso al contenido de sus datos personales;",
      "Solicitud de corrección de datos personales desactualizados o incompletos;",
      "Solicitud de eliminación, bloqueo o anonimización de los datos personales considerados innecesarios o no conformes con la LGPD;",
      "Solicitud de eliminación de los datos personales tratados con base en su consentimiento, salvo en los supuestos de conservación previstos en la LGPD;",
      "Solicitud de información sobre con quién se comparten sus datos personales;",
      "Solicitud de información sobre la alternativa de no dar su consentimiento y las consecuencias, perjuicios y limitaciones de acceso que ello implica;",
      "Cancelación de su autorización para el tratamiento de sus datos personales, cuando el tratamiento se base en su consentimiento;",
      "Manifestación de oposición a cualquier tratamiento de información que vulnere la LGPD;",
    ],
  },
  { tipo: "p", texto: "No compartimos su información, historial de navegación ni preferencias con terceros." },
  {
    tipo: "p",
    texto:
      "Al acceder al sitio de PROC GROUP y a sus páginas, usted acepta la presente política de privacidad en todos sus términos. Le recomendamos consultar esta página con regularidad para estar siempre al tanto de los últimos cambios.",
  },

  { tipo: "h4", texto: "Información Recogida" },
  {
    tipo: "p",
    texto:
      "Información que podrá ser recogida, almacenada y utilizada para que podamos ofrecerle los mejores contenidos, ofertas y comunicaciones:",
  },
  {
    tipo: "ul",
    itens: [
      "Información sobre su ordenador, dirección IP, ubicación geográfica, tipo y versión de navegador y sistema operativo;",
      "Información sobre el uso del sitio y las visitas, referencia u origen, duración de la visita, páginas vistas y flujo de navegación;",
      "Su dirección de correo electrónico, utilizada al iniciar sesión en su cuenta, registrarse, enviar mensajes mediante formularios o acceder a contenidos especiales;",
      "Información de registro de perfil en nuestro sitio — por ejemplo nombre, foto, dirección, sexo, fecha de nacimiento, profesión, intereses y otras relacionadas con las páginas temáticas;",
      "Cualquier otra información personal que usted nos envíe;",
      "Información general que usted escribe o busca durante la navegación por el sitio;",
      "Información captada automáticamente durante el uso de nuestro sitio, incluidas fecha, hora y frecuencia de uso;",
      "Información relacionada con las compras, los servicios que utiliza o las transacciones realizadas a través de nuestro sitio, incluidos nombre, dirección, número de teléfono, correo electrónico y datos de la tarjeta de crédito para la aprobación de las compras;",
    ],
  },
  {
    tipo: "p",
    texto:
      "El contenido de sus publicaciones en nuestro sitio, como testimonios y comentarios sobre productos, incluidos su nombre de usuario y fotos de perfil, si están disponibles;",
  },
  {
    tipo: "p",
    texto:
      "Información incluida en las comunicaciones que nos envía por correo electrónico, WhatsApp, chat, mensaje directo (redes sociales) o a través de nuestro sitio, incluidos contenidos y metadatos;",
  },
  { tipo: "p", texto: "Su nombre y dirección de correo electrónico para recibir nuestros boletines." },

  { tipo: "h4", texto: "Finalidad del Uso de los Datos" },
  { tipo: "p", texto: "La información personal podrá utilizarse para:" },
  {
    tipo: "ul",
    itens: [
      "Permitir la gestión del sitio y del entorno de negocio;",
      "Personalizar el sitio según las preferencias de uso identificadas;",
      "Poner a disposición los recursos para el uso del sitio;",
      "Gestionar el envío de contenidos, enlaces, recordatorios de pago o carritos abandonados;",
      "Facilitar los servicios de atención a través del sitio;",
      "Operar el envío de los productos o servicios contratados;",
      "Enviar comunicaciones promocionales e informativas (con opción de cancelación en cualquier momento);",
      "Enviar los contenidos y notificaciones solicitados por el usuario;",
      "Proporcionar bases estadísticas sobre el perfil de los usuarios (sin identificación individual);",
      "Mantener el sitio seguro y evitar fraudes;",
      "Verificar el cumplimiento de los términos y condiciones de uso.",
    ],
  },

  { tipo: "h4", texto: "Divulgación de Información" },
  {
    tipo: "p",
    texto:
      "La divulgación de información personal se realiza para el fiel cumplimiento de la finalidad de nuestra empresa, conforme a los fines establecidos en esta política, por parte de nuestros empleados, gestores, autoridades y socios:",
  },
  {
    tipo: "ul",
    itens: [
      "Conforme a lo previsto o solicitado por la ley;",
      "Para dar soporte legal a procesos judiciales en curso o potenciales;",
      "Para ejercer la defensa de nuestros derechos legales;",
      "Para las autoridades fiscales (emisión de facturas);",
      "Para transportistas y repartidores, para el envío de mercancías.",
    ],
  },

  { tipo: "h4", texto: "Nuestros Anuncios y Campañas" },
  {
    tipo: "p",
    texto:
      "Utilizamos la información contenida en los anuncios (como IP, ISP y navegador) para el análisis de tráfico. Puede desactivar las cookies en las opciones de su navegador o en herramientas antivirus, teniendo en cuenta que esto puede afectar a la interacción con nuestro sitio y al acceso a áreas restringidas.",
  },

  { tipo: "h4", texto: "Cookies" },
  {
    tipo: "p",
    texto:
      "Comentarios: al dejar un comentario, puede optar por guardar su nombre y correo electrónico en cookies para su comodidad. Estas duran un año.",
  },
  {
    tipo: "p",
    texto:
      "Inicio de sesión: si visita nuestra página de inicio de sesión, se creará una cookie temporal para comprobar la compatibilidad del navegador (sin datos personales). Al iniciar sesión, se crean cookies de acceso que duran de dos días a dos semanas (si se selecciona “Recordarme”).",
  },
  {
    tipo: "p",
    texto:
      "Edición: si edita o publica un contenido, se guardará una cookie adicional (solo el ID de la publicación) durante 24 horas.",
  },

  { tipo: "h4", texto: "Dudas Generales" },
  {
    tipo: "p",
    texto:
      "Si tiene dudas tras leer esta Política, póngase en contacto con nuestro equipo por teléfono en el (46) 3224-3532 o envíe un correo electrónico a comercial@procgroup.com.br.",
  },
  {
    tipo: "p",
    texto: "Consideramos que al navegar por el sitio de PROC GROUP usted acepta los términos presentados.",
  },
];

/** Sem entrada para `pt`: lá o texto vem do WordPress, que é a fonte canônica. */
export const politicaTraduzida: Partial<Record<Locale, BlocoPolitica[]>> = { en: EN, es: ES };

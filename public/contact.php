<?php
/**
 * Contact form handler for the Proc Group site.
 *
 * Self-contained (no third-party service, no Composer dependency) so it runs
 * on plain PHP shared hosting such as Hostinger — the site's real deployment
 * target — without needing an account with an external form provider.
 *
 * Deploy alongside the static build (Astro's `public/` folder is copied to
 * the output root as-is) and update RECIPIENT_EMAIL / SITE_DOMAIN below for
 * the live environment before going live.
 */

declare(strict_types=1);

const RECIPIENT_EMAIL = 'comercial@procgroup.com.br';
// Used as the mail "From" address. Many hosts spam-filter or reject mail
// whose From domain doesn't match the sending server, so this should stay a
// no-reply address on the same domain as the site once deployed.
const SITE_DOMAIN = 'procgroup.com.br';
const FROM_EMAIL = 'no-reply@' . SITE_DOMAIN;
const FALLBACK_REDIRECT = '/contato/';

const INTEREST_OPTIONS = [
    'Cidades Inteligentes',
    'Segurança Corporativa',
    'Infraestrutura de TI',
    'IA Industrial',
];

const PROFILE_OPTIONS = [
    'Governo / Prefeitura',
    'Empresa',
    'Indústria',
    'Outro',
];

function wantsJson(): bool
{
    $accept = $_SERVER['HTTP_ACCEPT'] ?? '';
    $requestedWith = $_SERVER['HTTP_X_REQUESTED_WITH'] ?? '';
    return str_contains($accept, 'application/json') || strtolower($requestedWith) === 'fetch';
}

function respond(bool $ok, string $message, int $status = 200): never
{
    if (wantsJson()) {
        http_response_code($status);
        header('Content-Type: application/json; charset=utf-8');
        echo json_encode(['ok' => $ok, 'message' => $message]);
        exit;
    }

    $referer = $_SERVER['HTTP_REFERER'] ?? '';
    $redirectBase = FALLBACK_REDIRECT;
    if ($referer !== '' && parse_url($referer, PHP_URL_HOST) === ($_SERVER['HTTP_HOST'] ?? null)) {
        $redirectBase = parse_url($referer, PHP_URL_PATH) ?: FALLBACK_REDIRECT;
    }
    $flag = $ok ? 'enviado=1' : 'erro=1';
    header('Location: ' . $redirectBase . '?' . $flag);
    exit;
}

// A header value must never contain a raw newline — that's how header
// injection / email spoofing via this form would work if left unsanitized.
function cleanHeaderValue(string $value): string
{
    return trim(str_replace(["\r", "\n"], '', $value));
}

function cleanText(string $value, int $maxLength = 2000): string
{
    $value = trim(strip_tags($value));
    return mb_substr($value, 0, $maxLength);
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    respond(false, 'Método não permitido.', 405);
}

// Honeypot: a field real users never see or fill; bots that auto-fill every
// input trip it. Pretend success so the bot doesn't learn to avoid it.
if (($_POST['website'] ?? '') !== '') {
    respond(true, 'Recebemos sua mensagem.');
}

$name = cleanText($_POST['name'] ?? '', 200);
$email = trim($_POST['email'] ?? '');
$profileRaw = $_POST['profile'] ?? '';
$profile = in_array($profileRaw, PROFILE_OPTIONS, true) ? $profileRaw : '';
$organization = cleanText($_POST['organization'] ?? '', 200);
$interestRaw = $_POST['interest'] ?? '';
$interest = in_array($interestRaw, INTEREST_OPTIONS, true) ? $interestRaw : '';
$message = cleanText($_POST['message'] ?? '', 4000);
// Extra fields used by the event landing page (NFC keychains): a phone instead
// of e-mail, plus which event the lead came from.
$phone = cleanText($_POST['phone'] ?? '', 40);
$event = cleanText($_POST['event'] ?? '', 120);

// The site contact form requires a valid corporate e-mail; the event form
// collects a phone. Accept either, as long as there's a name and one way to
// reach the person back.
$emailValid = $email !== '' && filter_var($email, FILTER_VALIDATE_EMAIL) !== false;
if ($name === '' || (!$emailValid && $phone === '')) {
    respond(false, 'Preencha seu nome e um e-mail válido ou telefone.', 422);
}
if ($email !== '' && !$emailValid) {
    respond(false, 'Informe um e-mail válido.', 422);
}

$safeEmail = cleanHeaderValue($email);
$safeName = cleanHeaderValue($name);

$bodyLines = [
    ($event !== '' ? "Novo lead — evento: {$event}" : "Novo contato pelo site Proc Group"),
    "",
    "Nome: {$name}",
    "E-mail: " . ($email !== '' ? $email : '-'),
    "Telefone: " . ($phone !== '' ? $phone : '-'),
    "Perfil: " . ($profile !== '' ? $profile : '-'),
    "Empresa / Município / Cidade: " . ($organization !== '' ? $organization : '-'),
    "Área de interesse: " . ($interest !== '' ? $interest : '-'),
    "",
    "Mensagem:",
    ($message !== '' ? $message : '-'),
];
$body = implode("\n", $bodyLines);

$subject = ($event !== '' ? "Lead do evento {$event}" : 'Novo contato pelo site')
    . ($profile !== '' ? " — {$profile}" : '');
$headers = ['From: Site Proc Group <' . FROM_EMAIL . '>'];
if ($emailValid) {
    // Only set Reply-To when we actually have a valid address (event leads may
    // only leave a phone).
    $headers[] = 'Reply-To: ' . $safeName . ' <' . $safeEmail . '>';
}
$headers[] = 'Content-Type: text/plain; charset=UTF-8';
$headers[] = 'X-Mailer: PHP/' . phpversion();

$sent = @mail(RECIPIENT_EMAIL, $subject, $body, implode("\r\n", $headers));

if (!$sent) {
    respond(false, 'Não foi possível enviar sua mensagem agora. Tente novamente ou fale pelo WhatsApp.', 502);
}

respond(true, 'Mensagem enviada! Nossa equipe entrará em contato em breve.');

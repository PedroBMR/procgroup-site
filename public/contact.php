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
        $path = parse_url($referer, PHP_URL_PATH) ?: '';
        // Only a path starting with a single "/" is a same-site path. "//evil.com/x"
        // passes the host check above (the host came from the referer) but the
        // browser reads it as a protocol-relative URL and leaves the site.
        if (preg_match('#^/(?!/)#', $path) === 1) {
            $redirectBase = $path;
        }
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

// strip_tags() does NOT remove CR/LF, and trim() only touches the ends. Any
// value that later reaches a mail header (the subject is built from $event)
// would carry an injected newline straight into the header block. Stripping
// line breaks here covers every caller, present and future.
function cleanText(string $value, int $maxLength = 2000): string
{
    $value = trim(strip_tags($value));
    $value = str_replace(["\r", "\n"], ' ', $value);
    // mbstring existe no PHP 8.2 da Hostinger, mas se faltar um fatal aqui
    // derrubaria o formulário sem diagnóstico. substr corta por bytes e pode
    // partir um caractere acentuado ao meio — aceitável só como último recurso,
    // e num limite que nenhum envio real alcança.
    if (!function_exists('mb_substr')) {
        return substr($value, 0, $maxLength);
    }
    return mb_substr($value, 0, $maxLength);
}

// A display name goes inside a quoted string in the header. Without quoting,
// a name like `Fulano <atacante@exemplo.com>,` would add a second, attacker
// controlled address to Reply-To, so whoever answers the lead answers them too.
function quotedDisplayName(string $name): string
{
    $name = cleanHeaderValue($name);
    $name = str_replace(['"', '\\'], '', $name);
    return '"' . $name . '"';
}

/**
 * Simple per-IP throttle. The honeypot only stops bots that fill every field —
 * a direct POST loop ignores it and would burn the shared plan's mail quota.
 * The IP is stored hashed: we need to recognise a repeat sender, not to keep a
 * log of who visited.
 */
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW = 600; // segundos

function rateLimitExceeded(): bool
{
    $dir = sys_get_temp_dir() . '/procgroup-contact';
    if (!is_dir($dir)) {
        @mkdir($dir, 0700, true);
    }
    // If we cannot measure, let the message through: a broken throttle must not
    // silently swallow real leads.
    if (!is_dir($dir) || !is_writable($dir)) {
        return false;
    }

    $ip = $_SERVER['REMOTE_ADDR'] ?? '';
    // Deliberately not using X-Forwarded-For: it is attacker-controlled, so
    // trusting it would make the limit trivial to bypass.
    $file = $dir . '/' . hash('sha256', $ip) . '.json';
    $now = time();

    $hits = [];
    if (is_file($file)) {
        $raw = @file_get_contents($file);
        $decoded = $raw !== false ? json_decode($raw, true) : null;
        if (is_array($decoded)) {
            $hits = array_filter($decoded, static fn($t) => is_int($t) && $t > $now - RATE_LIMIT_WINDOW);
        }
    }

    if (count($hits) >= RATE_LIMIT_MAX) {
        return true;
    }

    $hits[] = $now;
    @file_put_contents($file, json_encode(array_values($hits)), LOCK_EX);
    return false;
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    respond(false, 'Método não permitido.', 405);
}

// Honeypot: a field real users never see or fill; bots that auto-fill every
// input trip it. Pretend success so the bot doesn't learn to avoid it.
if (($_POST['website'] ?? '') !== '') {
    respond(true, 'Recebemos sua mensagem.');
}

if (rateLimitExceeded()) {
    respond(false, 'Muitas tentativas seguidas. Aguarde alguns minutos e tente novamente.', 429);
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

// $event comes from a hidden field on the event landing page, so it is
// attacker-controlled. It reaches mail()'s subject parameter, which is written
// into the header block — hence cleanHeaderValue on the way out, on top of the
// line-break stripping cleanText() already does.
$subject = cleanHeaderValue(
    ($event !== '' ? "Lead do evento {$event}" : 'Novo contato pelo site')
    . ($profile !== '' ? " — {$profile}" : '')
);
$headers = ['From: Site Proc Group <' . FROM_EMAIL . '>'];
if ($emailValid) {
    // Only set Reply-To when we actually have a valid address (event leads may
    // only leave a phone).
    $headers[] = 'Reply-To: ' . quotedDisplayName($name) . ' <' . $safeEmail . '>';
}
$headers[] = 'Content-Type: text/plain; charset=UTF-8';

$sent = @mail(RECIPIENT_EMAIL, $subject, $body, implode("\r\n", $headers));

if (!$sent) {
    respond(false, 'Não foi possível enviar sua mensagem agora. Tente novamente ou fale pelo WhatsApp.', 502);
}

respond(true, 'Mensagem enviada! Nossa equipe entrará em contato em breve.');

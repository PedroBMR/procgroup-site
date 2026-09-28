/**
 * Verificação de propriedade junto aos buscadores.
 *
 * Hoje existe uma só: o **Google Search Console**, configurado em 2026-09-28.
 *
 * POR QUE META TAG E NÃO DNS: o caminho que o Google recomenda é a propriedade
 * de domínio, verificada por um registro TXT. Mas o DNS de procgroup.com.br não
 * fica na Hostinger, fica no Oracle Cloud (ns1 a ns4.p201.dns.oraclecloud.net),
 * e o acesso a essa conta não estava à mão. Então a propriedade é de prefixo de
 * URL, `https://procgroup.com.br/`, verificada por esta meta tag. Como o `www`
 * redireciona para o endereço sem `www`, tudo o que o Google indexa fica dentro
 * desse prefixo.
 *
 * ⚠️ NÃO REMOVER. O Google volta a conferir a tag de tempos em tempos. Se ela
 * sumir, a propriedade perde a verificação e o painel para de mostrar dados.
 *
 * O valor não é segredo: é feito para estar no HTML público de qualquer site.
 * Ele só prova que quem cadastrou a propriedade no Google controla o site.
 */
export const verificacaoGoogle = "4fr93j-yz7GK9o8X63tg7RbxDxKC7U0wMZ-KwMr_28I";

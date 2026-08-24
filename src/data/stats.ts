export interface Stat {
  value: number;
  suffix?: string;
  label: string;
}

// Numeros liberados para uso publico: apenas "200+ clientes" e "10+ anos".
// Sairam daqui, e nao devem voltar sem metodologia rastreavel:
//   - "99% de satisfacao": origem e metodo de apuracao desconhecidos.
//   - badge "24/7 - Monitoramento continuo": afirmava que a Proc opera a
//     central. A Proc fornece a plataforma; quem opera e o cliente.
export const homeStats: Stat[] = [
  { value: 200, suffix: "+", label: "Clientes atendidos" },
  { value: 10, suffix: "+", label: "Anos de experiência" },
];


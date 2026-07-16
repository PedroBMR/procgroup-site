export interface Stat {
  value: number;
  suffix?: string;
  label: string;
}

// Real published figures from procgroup.com.br
export const homeStats: Stat[] = [
  { value: 200, suffix: "+", label: "Clientes atendidos" },
  { value: 10, suffix: "+", label: "Anos de experiência" },
  { value: 99, suffix: "%", label: "Satisfação dos clientes" },
];

export const supportBadge = { value: "24/7", label: "Monitoramento contínuo" };

// Types globais do projeto

// Tipo para dados de veículos (exemplo para Desafio 1)
export interface Vehicle {
  id: string;
  brand: string;
  model: string;
  version: string;
  year: number;
  price: number;
  features: string[];
  category: string;
}

// Tipo para clientes (exemplo para Desafio 2)
export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  vehicleModel: string;
  purchaseDate: string;
}

// Tipo para serviços de manutenção (exemplo para Desafio 2)
export interface Service {
  id: string;
  customerId: string;
  vehicleModel: string;
  serviceType: string;
  date: string;
  description: string;
  status: 'agendado' | 'concluído' | 'cancelado';
}

// Tipo genérico para navegação
export type RootStackParamList = {
  index: undefined;
  lista: undefined;
  detalhes: { id: string };
  cadastro: undefined;
  perfil: undefined;
};

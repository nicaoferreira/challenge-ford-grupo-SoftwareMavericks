import { StandardSpecs } from '../types/specs';

/**
 * Mock de validação do Challenge (Sprint 1).
 *
 * IMPORTANTE:
 * - Ajuste os valores abaixo para bater 100% com o slide oficial da Ranger Raptor
 *   fornecido na disciplina.
 * - A ideia aqui é garantir que o app sempre consiga produzir uma saída padronizada
 *   mesmo com dados incompletos (usar "não disponível").
 */
export const RANGER_RAPTOR_SPECS: StandardSpecs = {
  brand: 'Ford',
  model: 'Ranger',
  version: 'Raptor',

  engine: 'não disponível',
  power: 'não disponível',
  torque: 'não disponível',
  transmission: 'não disponível',
  traction: 'não disponível',
  fuel: 'não disponível',
  consumption: 'não disponível',
  acceleration_0_100: 'não disponível',
  top_speed: 'não disponível',

  length: 'não disponível',
  width: 'não disponível',
  height: 'não disponível',
  wheelbase: 'não disponível',
  weight: 'não disponível',
  tank_capacity: 'não disponível',
  trunk_capacity: 'não disponível',
  seats: 'não disponível',

  ground_clearance: 'não disponível',
  approach_angle: 'não disponível',
  departure_angle: 'não disponível',
  wading_depth: 'não disponível',

  towing_capacity: 'não disponível',
  payload_capacity: 'não disponível',

  notes:
    'Sprint 1: complete os campos do mock com base no slide oficial da Ranger Raptor.',
};


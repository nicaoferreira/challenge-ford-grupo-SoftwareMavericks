import { SPEC_FIELDS } from '../data/specFields';
import { RANGER_RAPTOR_SPECS } from '../data/mockRangerRaptor';
import { StandardSpecs, VehicleQueryInput } from '../types/specs';

const NOT_AVAILABLE = 'não disponível';

function emptySpecs(): StandardSpecs {
  return SPEC_FIELDS.reduce((acc, field) => {
    acc[field.key] = NOT_AVAILABLE;
    return acc;
  }, {} as StandardSpecs);
}

function normalizeText(value: string) {
  return value.trim().toLowerCase();
}

function isRangerRaptor(input: VehicleQueryInput) {
  const brand = normalizeText(input.brand);
  const model = normalizeText(input.model);
  const version = normalizeText(input.version);

  return (
    (brand === 'ford' || brand.includes('ford')) &&
    (model === 'ranger' || model.includes('ranger')) &&
    (version === 'raptor' || version.includes('raptor'))
  );
}

export async function generateStandardSpecs(
  input: VehicleQueryInput
): Promise<{ specs: StandardSpecs; source: 'mock' | 'rules' }> {
  if (isRangerRaptor(input)) {
    return { specs: RANGER_RAPTOR_SPECS, source: 'mock' };
  }

  // Sprint 1: fallback simples. Os grupos vão evoluir isso (IA/regras/API).
  const specs = emptySpecs();
  specs.brand = input.brand || NOT_AVAILABLE;
  specs.model = input.model || NOT_AVAILABLE;
  specs.version = input.version || NOT_AVAILABLE;
  specs.notes =
    'Fonte: fallback Sprint 1 (sem coleta externa). Evolua este módulo para o seu método (IA/API/regras).';

  return { specs, source: 'rules' };
}


export type SpecFieldKey =
  | 'brand'
  | 'model'
  | 'version'
  | 'engine'
  | 'power'
  | 'torque'
  | 'transmission'
  | 'traction'
  | 'fuel'
  | 'consumption'
  | 'acceleration_0_100'
  | 'top_speed'
  | 'length'
  | 'width'
  | 'height'
  | 'wheelbase'
  | 'weight'
  | 'tank_capacity'
  | 'trunk_capacity'
  | 'seats'
  | 'ground_clearance'
  | 'approach_angle'
  | 'departure_angle'
  | 'wading_depth'
  | 'towing_capacity'
  | 'payload_capacity'
  | 'notes';

export type SpecValue = string;

export type StandardSpecs = Record<SpecFieldKey, SpecValue>;

export type SpecField = {
  key: SpecFieldKey;
  label: string;
};

export type VehicleQueryInput = {
  brand: string;
  model: string;
  version: string;
  attributesWanted: string[];
};

export type SpecRun = {
  id: string;
  createdAt: string;
  input: VehicleQueryInput;
  specs: StandardSpecs;
  isFavorite?: boolean;
  source?: 'mock' | 'api' | 'rules';
};


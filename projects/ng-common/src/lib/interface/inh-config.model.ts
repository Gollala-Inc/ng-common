export type EnvironmentName = 'local' | 'dev' | 'stg' | 'release';

export interface InhConfigModel {
  environmentName?: EnvironmentName;
}

import NativeConfig from 'react-native-config';

export interface AppConfig {
  APP_NAME: string;
  APP_TYPE: 'dev' | 'production';
  API_URL: string;
  BUNDLE_ID: string;
  VERSION: string;
  BUILD: number;
  IS_DEV: boolean;
}

export const Config: AppConfig = {
  APP_NAME: NativeConfig.APP_NAME ?? 'My App',
  APP_TYPE: (NativeConfig.APP_TYPE as any) ?? 'dev',
  API_URL: NativeConfig.API_URL ?? '',
  BUNDLE_ID: NativeConfig.BUNDLE_ID ?? '',
  VERSION: NativeConfig.APP_VERSION ?? '1.0.0',
  BUILD: Number(NativeConfig.BUILD_NUMBER ?? 1),
  IS_DEV: NativeConfig.APP_TYPE === 'dev',
};

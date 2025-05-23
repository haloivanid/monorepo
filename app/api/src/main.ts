import { RestPresentation } from './infrastructure/presentation/rest/rest.presentation';

async function bootstrap() {
  const restPresentation = new RestPresentation();

  await restPresentation.init();
}
void bootstrap();

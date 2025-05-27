import { RestPresenter } from './interface/presenter/rest/rest.presenter';

async function bootstrap() {
  const restPresentation = new RestPresenter();

  await restPresentation.init();
}
void bootstrap();

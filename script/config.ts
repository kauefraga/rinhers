import { gray } from './colors';

const DEFAULT_REPO = {
  owner: 'zanfranceschi',
  repo: 'rinha-de-backend-2025',
};

const GITHUB_AUTH_TOKEN = process.env.GITHUB_AUTH_TOKEN;

if (!GITHUB_AUTH_TOKEN) {
  console.log('O token de autenticação do GitHub é necessário.');
  gray(
    'Para gerar um token acesse o GitHub > Configuração > Configurações '
    + 'de desenvolvedor > Tokens de acesso pessoal > Tokens (clássico) e crie '
    + 'um novo token com acesso a repositórios públicos (public_repo).'
  );
  console.log('Crie um arquivo `.env` e preencha `GITHUB_AUTH_TOKEN` com o token.');

  process.exit(1);
}

const GITHUB_TOKEN_REGEX = /^ghp_[A-Za-z0-9]{36}$/;

if (!GITHUB_TOKEN_REGEX.test(GITHUB_AUTH_TOKEN)) {
  console.log('Use a valid token 😡');
  process.exit(1);
}

const headers = {
  authorization: `Bearer ${GITHUB_AUTH_TOKEN}`,
};

const ERROR_FLAGS = ['errors', '--errors', 'show-errors', '--show-errors', '--debug'];
const showErrors = process.argv.some(a => ERROR_FLAGS.includes(a));

export {
  DEFAULT_REPO,
  headers,
  showErrors
};

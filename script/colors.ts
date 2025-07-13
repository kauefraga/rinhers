const COLORS = {
  reset: '\x1b[0m',
  dim: '\x1b[2m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
};

const coloredLog = (color: string) =>
  (message: string) => console.log(color + message + COLORS.reset);

const green = coloredLog(COLORS.green);
const yellow = coloredLog(COLORS.yellow);
const gray = coloredLog(COLORS.dim);

export { gray, green, yellow };

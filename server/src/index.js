import { app } from './app.js';
import { insertSeeds } from './seeds/index.js';
import { sequelize } from './sequelize.js';

async function main() {
  // データベースの初期化をします
  await sequelize.sync({
    force: true,
    logging: false,
  });
  await insertSeeds();

  const address = await app.listen(Number(process.env.PORT || 3000), '0.0.0.0')
  console.log(`Listening on ${address}`);
}

main().catch(console.error);

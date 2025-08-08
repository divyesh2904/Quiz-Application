const setupAdmin = require('./utils/setupAdmin');

setupAdmin()
  .then(() => {
    console.log('Admin setup complete');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Setup failed:', error);
    process.exit(1);
  });

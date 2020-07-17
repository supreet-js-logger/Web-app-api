run below command to install express sub domain
`npm i express-subdomain --save`

include below code in your main index.js file or app entry file
`var subdomain = require('express-subdomain');`

Go to the line where `'/api'` route was delared and replace it with
`server.use(subdomain("api", apiRoute));`

If you are on windows server you might need to add your domains to host file
`

127.0.0.1 logger.com
::1 logger.com
127.0.0.1 api.logger.com
::1 api.logger.com
127.0.0.1 app.logger.com
::1 app.logger.com
`
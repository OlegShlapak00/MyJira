const express = require('express');
const app = express();

app.use(express.static(`dist/JIRAnimoo/`));

app.get(`/*`, function(req, res) {
  res.sendFile(`index.html`, {root: `dist/JIRAnimoo/`}
  );
});


app.listen(process.env.PORT || 8080);

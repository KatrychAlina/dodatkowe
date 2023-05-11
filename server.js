const http = require('http');

const server = http.createServer((req, res) => {
  // Pobieramy adres IP klienta
  const ip = req.connection.remoteAddress;
  
  // Zapisujemy informacje o żądaniu do logów
  console.log(`[${new Date()}] Request from ${ip}`);

  // Ustawiamy nagłówek Content-Type
  res.setHeader('Content-Type', 'text/plain');
  
  // Wyświetlamy adres IP klienta i datę/godzinę w jego strefie czasowej
  const date = new Date().toLocaleString('pl-PL', { timeZone: 'Europe/Warsaw' });
  res.end(`Twój adres IP: ${ip}\nData/godzina w Twojej strefie czasowej: ${date}`);
});

const PORT = 3000;

// Uruchamiamy serwer
server.listen(PORT, () => {
  const authorName = process.env.AUTHOR_NAME;
  console.log(`[${new Date()}] Server started by ${authorName} on port ${PORT}`);
});

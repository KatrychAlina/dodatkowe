# dodatkowe
# dodatkowe zadanie 1

# Po modyfikacjach z 1 zadania . Ma również dwuetapową budowę, ale nie korzysta z --platform=$BUILDPLATFORM.
# Ustala katalog roboczy za pomocą WORKDIR /app w obu etapach.
# Kopiuje pliki aplikacji serwera, takie jak package*.json i server.js, w pierwszym etapie.
# Instaluje zależności, wykonując RUN npm install w pierwszym etapie.
# W drugim etapie, który zaczyna się od FROM node:14-alpine, kopiuje pliki z poprzedniego etapu do bieżącego etapu za pomocą COPY --from=build /app ..
# Dodaje informacje o dacie uruchomienia serwera do pliku logów w drugim etapie, wykonując RUN echo "$(date) - Serwer został uruchomiony." >> logs.txt.
# Ustawia zmienną środowiskową PORT na wartość 3000.
# Dodaje zdrowie aplikacji za pomocą HEALTHCHECK, który sprawdza zdrowie serwera.
# Uruchamia serwer za pomocą CMD ["node", "server.js"].

# Polecenia zad1

# Build for linux/amd64
# docker build -t my-server-amd64 .

# Build for linux/arm/v7
# docker build --build-arg BUILDPLATFORM=linux/arm/v7 -t my-server-armv7 .

# Build for linux/arm64/v8
# docker build --build-arg BUILDPLATFORM=linux/arm64/v8 -t my-server-arm64 .

# dodatkowe zadanie 2
# plik Dockerfile obsługuje wiele architektur ( linux/arm/v7, linux/arm64/v8i linux/amd64) przez określenie --platformflagi podczas kompilacji. Używa określonego #node:14-alpineobrazu zarówno na etapie kompilacji, jak i na etapie środowiska wykonawczego.

# Na etapie kompilacji ustawia katalog roboczy, kopiuje pliki aplikacji ( package*.jsoni server.js) i instaluje zależności przy użyciu plików npm install.

# W fazie wykonawczej ponownie ustawia katalog roboczy, kopiuje pliki aplikacji z etapu budowania za pomocą flagi --from=build, dodaje informacje o starcie # serwera do pliku dziennika, ustawia port aplikacji za pomocą dyrektywy ENV, dodaje sprawdzanie kondycji aplikacji za pomocą HEALTHCHECK, oraz uruchamia serwer za # pomocą CMDdyrektywy.

# Za pomocą tego pliku Dockerfile możesz zbudować i uruchomić kontener na różnych architekturach, używając odpowiedniej flagi platformy.

# Polecenia zad2

# Build for linux/amd64
# docker build --build-arg BUILDPLATFORM=linux/amd64 -t my-server-amd64 .

# Build for linux/arm/v7
# docker build --build-arg BUILDPLATFORM=linux/arm/v7 -t my-server-armv7 .

# Build for linux/arm64/v8
# docker build --build-arg BUILDPLATFORM=linux/arm64/v8 -t my-server-arm64 .

# dodatkowe zad3

# Główna różnica między Dockerfile zad2 i Dockerfile zad3 polega na tym, że oba określają platformę jak linux/amd64dla etapu wykonawczego, podczas gdy Dockerfile # zad1 używa $BUILDPLATFORMargumentu. Argument $BUILDPLATFORMpozwala na elastyczne kompilacje wieloplatformowe, w których platforma może być określana dynamicznie # podczas procesu kompilacji.

# dodatkowe zad4
# Polecenia 
# sudo docker build --build-arg BUILDPLATFORM=linux/amd64 -t my-server-amd64 .

# Successfully built 328d4218f71f
# Successfully tagged my-server-amd64:latest

# alinakatrych@alinakatrych-VirtualBox:~/ZadanieDodatkowe$ sudo docker run -p 3000:3000 my-server-amd64
# [Thu May 11 2023 17:48:51 GMT+0000 (Coordinated Universal Time)] Server started by undefined on port 3000

# Aby przetestować działanie serwera, możena otworzyć przeglądarkę i odwiedzić http://localhost:3000. Jeśli wszystko działa poprawnie, można zobaczyć  odpowiedź serwera. Można również sprawdzić stan serwera, odwiedzając http://localhost:3000/health.
#  http://localhost:3000 -> TwÃ³j adres IP: ::ffff:172.17.0.1
# Data/godzina w Twojej strefie czasowej: 11.05.2023, 19:49:26

# Jeszcze dodałam zawartość plików na każdym etapie zadanie 1-4
# Zad1
# Stage 1: Build stage
# FROM node:14-alpine AS build

# Set the working directory
# WORKDIR /app

# Copy the application files
# COPY package*.json ./
# COPY server.js ./

# Install dependencies
# RUN npm install

# Stage 2: Runtime stage
# FROM --platform=$BUILDPLATFORM node:14-alpine

# Set the working directory
# WORKDIR /app

# Copy the application files from the build stage
# COPY --from=build /app .

# Add information about server startup to the log file
# RUN echo "$(date) - Serwer został uruchomiony." >> logs.txt

# Set the application port
# ENV PORT=3000

# Add application health check
# HEALTHCHECK --interval=30s CMD curl -f http://localhost:${PORT}/health || exit 1

# Start the server
# CMD ["node", "server.js"]

# Zad2
# Stage 1: Build stage
# FROM --platform=$BUILDPLATFORM node:14-alpine AS build

# Set the working directory
# WORKDIR /app

# Copy the application files
# COPY package*.json ./
# COPY server.js ./

# Install dependencies
# RUN npm install

# Stage 2: Runtime stage
# FROM --platform=linux/amd64 node:14-alpine

# Set the working directory
# WORKDIR /app

# Copy the application files from the build stage
# COPY --from=build /app .

# Add information about server startup to the log file
# RUN echo "$(date) - Serwer został uruchomiony." >> logs.txt

# Set the application port
# ENV PORT=3000

# Add application health check
# HEALTHCHECK --interval=30s CMD curl -f http://localhost:${PORT}/health || exit 1

# Start the server
# CMD ["node", "server.js"]

# Zad3
# Stage 1: Build stage
# FROM --platform=$BUILDPLATFORM node:14-alpine AS build

# Set the working directory
# WORKDIR /app

# Copy the application files
# COPY package*.json ./
# COPY server.js ./

# Install dependencies
# RUN npm install

# Stage 2: Runtime stage
# FROM --platform=linux/amd64 node:14-alpine AS runtime

# Set the working directory
# WORKDIR /app

# Copy the application files from the build stage
# COPY --from=build /app .

# Add information about server startup to the log file
# RUN echo "$(date) - Serwer został uruchomiony." >> logs.txt

# Set the application port
# ENV PORT=3000

# Add application health check
# HEALTHCHECK --interval=30s CMD curl -f http://localhost:${PORT}/health || exit 1

# Start the server
# CMD ["node", "server.js"]







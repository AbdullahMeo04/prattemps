# PratTemps 🌤️

PratTemps és una aplicació web lleugera i moderna desenvolupada amb **React 19**, **Vite** i **TypeScript** que mostra en temps real les condicions meteorològiques de vuit ciutats catalanes (El Prat de Llobregat, Barcelona, Girona, Lleida, Tarragona, Manresa, Figueres i Tortosa) consultant directament l'API de [OpenWeather](https://openweathermap.org/current).

L'aplicació permet commutar àgilment entre municipis a través d'una llista de selecció accessible, cancel·lant peticions anteriors en trànsit gràcies a `AbortController` i actualitzant a l'instant dotze indicadors climàtics essencials amb un disseny adaptat tant a pantalles d'escriptori com a dispositius mòbils.

## Captura de pantalla

![Captura](docs/screenshot.png)

## Com executar el projecte

Segueix aquests passos per posar en marxa l'aplicació en el teu entorn local:

1. **Clonar el repositori**:
   ```bash
   git clone https://github.com/AbdullahMeo04/prattemps.git
   cd prattemps
   ```

2. **Instal·lar dependències**:
   ```bash
   npm install
   ```

3. **Configurar la clau d'API**:
   Copia el fitxer d'exemple `.env.example` a `.env`:
   ```bash
   cp .env.example .env
   ```
   Obre el fitxer `.env` i afegeix la teva clau d'OpenWeather a la variable `VITE_OWM_KEY`:
   ```env
   VITE_OWM_KEY=la_teva_clau_aqui
   ```

4. **Executar en mode desenvolupament**:
   ```bash
   npm run dev
   ```

5. **Compilar per a producció**:
   ```bash
   npm run build
   ```

---

## Eines d'interfície natural

A continuació es descriuen tres tecnologies modernes que permeten crear interfícies d'usuari més naturals i accessibles, basades en aprenentatge automàtic o reconeixement de patrons al propi navegador:

| Eina | Què fa | Com es podria usar a PratTemps |
| :--- | :--- | :--- |
| **Web Speech API** | Permet el reconeixement de veu (SpeechRecognition) i la síntesi de veu (SpeechSynthesis) directament al navegador sense requerir llibreries externes ni servidors dedicats. | Permetria a l'usuari seleccionar una ciutat simplement dient el seu nom en veu alta (per exemple, "El Prat" o "Girona") i oferir un botó per escoltar el pronòstic meteorològic locutat de manera accessible. |
| **MediaPipe** | Plataforma de visió per computador desenvolupada per Google per detectar punts de referència facials, corporals i mans en temps real mitjançant la càmera web. | Permetria canviar de ciutat mitjançant gestos visuals de la mà (com fer lliscar cap a la dreta o esquerra davant de la càmera per navegar entre ciutats) o fer zoom a la targeta del temps. |
| **TensorFlow.js** | Llibreria de machine learning per entrenar i executar models d'intel·ligència artificial al navegador utilitzant l'acceleració per maquinari (WebGL o WebGPU). | Podria analitzar les 12 mètriques del temps (temperatura, vent, pluja, humitat) per recomanar en temps real la roba adequada (paraigua, abric, ulleres de sol) mitjançant un model de classificació local. |

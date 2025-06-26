# Air Patagonia Mobile App

Aplicación móvil para la aerolínea Air Patagonia que permite a los usuarios realizar seguimiento de vuelos, recibir alertas y acceder a información relevante sobre sus viajes.

## 🚀 Características

- Seguimiento de vuelos en tiempo real
- Alertas de estado de vuelos
- Información de aeropuertos
- Geolocalización para servicios cercanos
- Notificaciones push
- Generación de códigos QR para check-in
- Exportación de comprobantes en PDF

## 🛠️ Tecnologías Utilizadas

- **Framework**: Ionic Angular
- **Lenguaje**: TypeScript
- **UI Components**: Ionic Framework
- **Geolocalización**: Capacitor Geolocation
- **Notificaciones**: Capacitor Local Notifications
- **Generación de PDF**: pdfmake
- **Generación de QR**: qrcode
- **Plataforma**: Android (con Capacitor)

## 📋 Requisitos Previos

- Node.js (v16 o superior)
- npm (v8 o superior)
- Angular CLI (v15 o superior)
- Ionic CLI (v7 o superior)
- Android Studio (para desarrollo en Android)
- Java Development Kit (JDK) 11 o superior

## 🚀 Instalación

1. Clona el repositorio:
   ```bash
   git clone https://github.com/airpatagonia/air_patagonia-mobile.git
   cd air_patagonia-mobile
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

3. Instala Capacitor (si no está instalado globalmente):
   ```bash
   npm install -g @capacitor/cli
   ```

4. Agrega la plataforma Android:
   ```bash
   ionic build
   npx cap add android
   ```

5. Sincroniza los cambios con Capacitor:
   ```bash
   npx cap sync
   ```

## 🔧 Configuración

### Android

Asegúrate de tener los siguientes permisos en tu archivo `android/app/main/AndroidManifest.xml`:

```xml
<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
<uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
```

## 🏃 Ejecución

### Desarrollo web

```bash
ionic serve
```

### Android

1. Abre el proyecto en Android Studio:
   ```bash
   npx cap open android
   ```

2. Ejecuta la aplicación desde Android Studio o con:
   ```bash
   ionic capacitor run android
   ```

## 🌐 Estructura del Proyecto

```
air_patagonia-mobile/
├── android/                  # Código nativo de Android
├── src/
│   ├── app/                 # Módulo principal de la aplicación
│   ├── assets/               # Recursos estáticos
│   ├── theme/                # Estilos globales
│   └── ...
├── .gitignore
├── angular.json
├── capacitor.config.ts       # Configuración de Capacitor
├── package.json
└── README.md
```

## 🤝 Contribución

1. Crea un fork del proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Haz commit de tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Haz push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más información.

---

Desarrollado por el equipo de Air Patagonia ✈️

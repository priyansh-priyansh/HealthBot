# HealthBot - AI-Powered Symptom Checker

A modern, responsive healthcare website with an AI-powered symptom checker that helps users understand potential health conditions based on their symptoms.

## Features

- **Modern Dark Theme**: Sleek, professional design with orange accent colors
- **AI Symptom Checker**: Interactive chatbot that analyzes symptoms and provides disease predictions
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Real-time Chat Interface**: Smooth messaging experience with typing indicators
- **Disease Prediction**: AI-powered analysis of common health conditions
- **Professional UI**: Clean, modern interface inspired by medical websites

## Technologies Used

- **React 18**: Modern React with hooks
- **CSS3**: Custom styling with animations and responsive design
- **Lucide React**: Beautiful icons
- **JavaScript ES6+**: Modern JavaScript features

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn package manager

### Installation

1. **Clone or download the project**

   ```bash
   cd /Users/priyanshpriyansh/Desktop/ChatBot
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000` to view the application

### Available Scripts

- `npm start` - Runs the app in development mode
- `npm build` - Builds the app for production
- `npm test` - Launches the test runner
- `npm eject` - Ejects from Create React App (one-way operation)

## How to Use

1. **Homepage**: View the modern hero section with health information
2. **Symptom Checker**:
   - Scroll down to the AI Symptom Checker section
   - Type your symptoms in detail
   - Get instant AI-powered analysis and recommendations
   - View confidence levels and potential conditions

## AI Disease Prediction

The symptom checker includes patterns for common conditions:

- **Common Cold**: Runny nose, cough, sneezing, sore throat
- **Flu**: Fever, chills, body aches, fatigue
- **Migraine**: Severe headache, nausea, light sensitivity
- **Anxiety**: Worry, restlessness, trouble sleeping
- **Depression**: Persistent sadness, loss of interest, fatigue
- **Allergies**: Sneezing, itchy eyes, skin reactions

## Features in Detail

### Header

- Responsive navigation with mobile menu
- Logo with health icon
- Call-to-action button

### Hero Section

- Animated medical visual with pulsing effects
- Feature highlights
- Doctor showcase carousel

### Symptom Checker

- Real-time chat interface
- AI-powered disease prediction
- Confidence scoring
- Professional medical disclaimers
- Typing indicators

### Footer

- Contact information
- Service links
- Legal disclaimers
- Professional badges

## Customization

### Colors

The main color scheme can be customized in the CSS files:

- Primary: `#ff6b35` (Orange)
- Secondary: `#f7931e` (Light Orange)
- Background: `#000` (Black)
- Text: `#fff` (White)

### Adding New Diseases

To add new disease patterns, modify the `diseasePatterns` object in `SymptomChecker.js`:

```javascript
const diseasePatterns = {
  new_disease: {
    keywords: ["symptom1", "symptom2", "symptom3"],
    symptoms: ["Symptom 1", "Symptom 2", "Symptom 3"],
    description: "Description of the disease",
    severity: "Mild/Moderate/Severe",
    recommendations: ["Recommendation 1", "Recommendation 2"],
  },
};
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Important Disclaimer

⚠️ **This application is for educational and informational purposes only. It should not be used as a substitute for professional medical advice, diagnosis, or treatment. Always consult with a qualified healthcare provider for proper medical care.**

## License

This project is open source and available under the MIT License.

## Contributing

Feel free to submit issues, feature requests, or pull requests to improve the application.

---

**Built with ❤️ for better healthcare accessibility**

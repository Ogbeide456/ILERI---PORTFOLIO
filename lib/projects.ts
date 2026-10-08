export interface Project {
  slug: string;
  title: string;
  description: string;
  image: string;
  summary: string;
  problem: string;
  built: string;
  lessons: string[];
  tags: string[];
  link: string;
  sourceCode: string;
}

export const projects: Project[] = [
  {
    slug: 'property-plug',
    title: 'Property Plug Project',
    description:
      'A real-estate platform for landlords, tenants, and general users to buy, sell, or rent properties.',
    image: '/property-plug.jfif',
    summary:
      'Property Plug brings property-buying, selling, and rental use cases together for landlords, tenants, and general users.',
    problem:
      'People exploring real estate need a clear way to find property opportunities that fit whether they are buying, selling, renting, or managing a property.',
    built:
      'I built a property platform centred on buying, selling, and renting, for landlords, tenants, and general users.',
    lessons: [
      'A product serving different roles needs to make each audience and its relevant actions easy to understand.',
      'Property listings benefit from clear presentation so people can evaluate opportunities before taking the next step.',
    ],
    tags: ['HTML', 'CSS', 'JavaScript'],
    link: 'https://psychological-bronze-mqy1naebp2.edgeone.app/landingpageregistereduser.html',
    sourceCode: 'https://github.com/Ogbeide456/PROPERTY-PLUG-PROJECT',
  },
  {
    slug: 'academic-performance-predictor',
    title: 'Academic Performance Predictor Web App',
    description:
      'A machine-learning web app that estimates students’ GPA from academic, behavioural, and lifestyle factors.',
    image: '/screenshot-1788785589556.png',
    summary:
      'The Academic Performance Predictor explores how academic, behavioural, and lifestyle factors can be used to estimate a student’s GPA.',
    problem:
      'Students and educators may want a more considered view of academic performance than a single input can provide. This project brings several types of factors into one prediction experience.',
    built:
      'I built a machine-learning-driven web app that estimates GPA from key academic, behavioural, and lifestyle factors.',
    lessons: [
      'A prediction should be communicated as an estimate based on its inputs, not as a guaranteed outcome.',
      'Combining several kinds of information makes it important to present the prediction experience clearly.',
    ],
    tags: [
      'Python',
      'Flask',
      'Scikit-Learn',
      'NumPy',
      'Pandas',
      'Joblib',
      'Plotly',
      'Streamlit',
      'HTML',
      'CSS',
    ],
    link: 'https://academic-performance-predictor2026.streamlit.app/',
    sourceCode: 'https://github.com/Ogbeide456/ACADEMIC-PERFORMANCE-PREDICTOR',
  },
  {
    slug: 'emotion-detector',
    title: 'Emotion Detector Web App',
    description:
      'A deep-learning web app that predicts an emotion category from an uploaded facial image.',
    image: '/emotion-detector.jfif',
    summary:
      'The Emotion Detector analyses an uploaded facial image and predicts the most likely emotion from a set of standard categories.',
    problem:
      'Reading facial expressions is subjective. This project explores a machine-learning approach to classifying an image into a consistent set of emotion labels.',
    built:
      'I built an application that accepts a facial image, processes it with a trained deep-learning model, and predicts one of seven categories: Angry, Disgust, Fear, Happy, Sad, Surprise, or Neutral.',
    lessons: [
      'Image-based prediction tools need to make the upload process and the meaning of their output clear.',
      'A predicted category should be presented as a model result rather than a definitive statement about a person.',
    ],
    tags: [
      'Python',
      'Flask',
      'Scikit-Learn',
      'NumPy',
      'Pandas',
      'Joblib',
      'Plotly',
      'Streamlit',
      'HTML',
      'CSS',
    ],
    link: 'https://emotion-detector-ogbeide-samuel-22cd032172-qxyfzhp8x2tujwqg64n.streamlit.app/',
    sourceCode:
      'https://github.com/Ogbeide456/EMOTION-DETECTOR-OGBEIDE-SAMUEL-22CD032172',
  },
];

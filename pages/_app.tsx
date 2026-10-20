import type { AppProps } from 'next/app';
import '../styles/globals.css';
import { ThemeProvider } from '../components/ThemeContext';
import Snowfall from '../components/Snowfall';

export default function App({ Component, pageProps }: AppProps) {
    return (
        <ThemeProvider>
            <Snowfall />
            <div className="app-content">
                <Component {...pageProps} />
            </div>
        </ThemeProvider>
    );
}

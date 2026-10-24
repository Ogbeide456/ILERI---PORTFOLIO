import type { AppProps } from 'next/app';
import '../styles/globals.css';
import { ThemeProvider } from '../components/ThemeContext';
import Snowfall from '../components/Snowfall';
import Marquee from '../components/Marquee';
import { Analytics } from '@vercel/analytics/next';

export default function App({ Component, pageProps }: AppProps) {
    return (
        <ThemeProvider>
            <Marquee />
            <Snowfall />
            <div className="app-content">
                <Component {...pageProps} />
            </div>
            <Analytics />
        </ThemeProvider>
    );
}

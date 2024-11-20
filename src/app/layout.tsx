// app/layout.tsx
import {ReactNode} from 'react';
import './globals.css'
import OrientationCheck from "@/components/orientationCheck/OrientationCheck";

export default function RootLayout({
                                       children,
                                   }: {
    children: ReactNode;
}) {
    return (
        <html lang="ru">
        <body>
        <OrientationCheck>
            <div className='h-[60vh] w-[60vw]' style={{
                background: 'rgba(255, 255, 255, 0.21)',
                boxShadow: '14px 30px 28px -14px rgba(0, 0, 0, 0.16)'
            }}>
                {children}
            </div>
        </OrientationCheck>
        </body>
        </html>
    );
}
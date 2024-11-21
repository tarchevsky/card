// fonts.ts
import localFont from 'next/font/local';

export const rockstar = localFont({
    src: [
        {
            path: './fonts/RS-regular.otf',
            weight: '400',
            style: 'normal',
        },
        {
            path: './fonts/RS-extralight.otf',
            weight: '200',
            style: 'normal',
        },
        {
            path: './fonts/RS-semibold.otf',
            weight: '600',
            style: 'normal',
        },
        {
            path: './fonts/RS-extrabold.otf',
            weight: '800',
            style: 'normal',
        },
    ],
    variable: '--font-rs',  // опционально, для CSS переменной
    display: 'swap'
})

export const dance = localFont({
    src: './fonts/dance_partner.ttf',
    variable: '--font-dance',  // для заголовков
    display: 'swap'
})
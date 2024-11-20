'use client';
import {useState, useEffect, ReactNode} from 'react';
import Header from "@/components/header/Header";
import ScrollToTop from "@/components/scrollToTop/ScrollToTop";
import Footer from "@/components/footer/Footer";

export default function OrientationCheck({children}: { children: ReactNode }) {
    const [isMobile, setIsMobile] = useState<boolean>(false);
    const [isPortrait, setIsPortrait] = useState<boolean>(false);
    const [orientation, setOrientation] = useState<string | null>(null);

    useEffect(() => {
        // Проверка, является ли устройство мобильным
        const checkIfMobile = () => {
            const userAgent = navigator.userAgent.toLowerCase();
            const mobileKeywords = ['android', 'webos', 'iphone', 'ipad', 'ipod', 'blackberry', 'windows phone'];

            // Исключаем планшеты
            const isTablet = /(ipad|tablet|(android(?!.*mobile))|(windows(?!.*phone)(.*touch))|kindle|playbook|silk|(puffin(?!.*(IP|AP|WP))))/.test(userAgent);

            const isMobileDevice = mobileKeywords.some(keyword => userAgent.includes(keyword)) && !isTablet;
            setIsMobile(isMobileDevice);
        };

        checkIfMobile();
    }, []);

    useEffect(() => {
        if (!isMobile) return; // Если не мобильное устройство, прекращаем выполнение

        // Функция для проверки ориентации
        const checkOrientation = (): void => {
            if (window.screen && window.screen.orientation) {
                setIsPortrait(window.screen.orientation.type.includes('portrait'));
                setOrientation(window.screen.orientation.type);
            }
        };

        // Первоначальная проверка
        checkOrientation();

        // Добавляем слушатель событий изменения ориентации
        if (window.screen && window.screen.orientation) {
            window.screen.orientation.addEventListener('change', checkOrientation);
        }

        // Очистка слушателей при размонтировании компонента
        return () => {
            if (window.screen && window.screen.orientation) {
                window.screen.orientation.removeEventListener('change', checkOrientation);
            }
        };
    }, [isMobile]);

    // Для мобильных устройств проверяем ориентацию
    if (isMobile && isPortrait) {
        return (
            <div className='h-screen flex items-center cont text-center'>
                <div>Пожалуйста, переверните устройство горизонтально!</div>
            </div>
        );
    }

    // Для всех остальных случаев (десктоп или мобильный в ландшафтной ориентации)
    return (
        <div className='h-screen flex flex-col items-center justify-between'>
            <Header/>
            {children}
            <ScrollToTop/>
            <Footer/>
        </div>
    );
}
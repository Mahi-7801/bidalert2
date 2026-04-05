'use client';

import { useState, useEffect, useRef } from 'react';

// ╔══════════════════════════════════════╗
// ║   CHANGE ONLY THIS LINE             ║
// ╚══════════════════════════════════════╝
const SUPPORT_PHONE = '919106323130'; // ← BidAlert WhatsApp number
// ════════════════════════════════════════

export default function WhatsAppWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [showBadge, setShowBadge] = useState(true);
    const [timeStr, setTimeStr] = useState('');
    const [isMobile, setIsMobile] = useState(false);

    const popupRef = useRef<HTMLDivElement>(null);
    const fabRef = useRef<HTMLButtonElement>(null);

    // Initial setup
    useEffect(() => {
        const now = new Date();
        setTimeStr(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
        setIsMobile(/Android|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i.test(navigator.userAgent));

        // Auto-open after 3s
        const timer = setTimeout(() => {
            setIsOpen(true);
            setShowBadge(false);
        }, 3000);

        return () => clearTimeout(timer);
    }, []);

    // Close on outside click
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                isOpen &&
                popupRef.current && !popupRef.current.contains(event.target as Node) &&
                fabRef.current && !fabRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isOpen]);

    const handleFabClick = () => {
        setIsOpen(!isOpen);
        setShowBadge(false);
    };

    const handleSubmit = () => {
        // Build pre-filled message
        const message = 'Hello BidAlert Support! I need support regarding BidAlert\'s tender services...';
        const encoded = encodeURIComponent(message);

        if (isMobile) {
            // Mobile redirect
            const appLink = 'whatsapp://send?phone=' + SUPPORT_PHONE + '&text=' + encoded;
            const webLink = 'https://wa.me/' + SUPPORT_PHONE + '?text=' + encoded;
            const start = Date.now();
            window.location.href = appLink;
            setTimeout(() => {
                if (Date.now() - start < 2000) window.open(webLink, '_blank');
            }, 1500);
        } else {
            // Desktop popup
            const url = 'https://wa.me/' + SUPPORT_PHONE + '?text=' + encoded;
            const w = 480, h = 680;
            const left = Math.round((window.screen.width - w) / 2);
            const top = Math.round((window.screen.height - h) / 2);
            window.open(url, 'wa_bidalert',
                `width=${w},height=${h},top=${top},left=${left},resizable=yes,scrollbars=yes,toolbar=no,status=no`
            );
        }
    };

    return (
        <>
            <style>{`
                .wa-fab {
                    position: fixed; bottom: 24px; left: 24px;
                    width: 56px; height: 56px; border-radius: 50%;
                    background: #25D366;
                    box-shadow: 0 4px 22px rgba(37,211,102,.5);
                    border: none; cursor: pointer;
                    display: flex; align-items: center; justify-content: center;
                    z-index: 9999; transition: transform .25s, box-shadow .25s;
                }
                .wa-fab:hover { transform: scale(1.08); box-shadow: 0 6px 30px rgba(37,211,102,.65); }
                .wa-fab svg { width: 30px; height: 30px; }
                .wa-fab::before {
                    content: ''; position: absolute; inset: -5px; border-radius: 50%;
                    border: 2px solid #25D366; opacity: .55;
                    animation: wa-pulse 2.2s ease-out infinite;
                }
                @keyframes wa-pulse {
                    0%  { transform: scale(1);    opacity: .55; }
                    70% { transform: scale(1.38); opacity: 0;   }
                    100%{ transform: scale(1.38); opacity: 0;   }
                }
                .wa-badge {
                    position: absolute; top: -2px; right: -2px;
                    width: 20px; height: 20px; border-radius: 50%;
                    background: #ef4444; color: #fff; font-size: 11px; font-weight: 700;
                    display: flex; align-items: center; justify-content: center;
                    border: 2px solid #fff;
                }
                .wa-popup {
                    position: fixed; bottom: 104px; left: 28px; width: 320px;
                    max-width: calc(100vw - 56px);
                    border-radius: 18px; overflow: hidden;
                    box-shadow: 0 16px 50px rgba(0,0,0,.2);
                    z-index: 9998; transform-origin: bottom left;
                    transform: scale(0) translateY(20px); opacity: 0;
                    transition: transform .32s cubic-bezier(.34,1.56,.64,1), opacity .25s ease;
                    pointer-events: none;
                }
                .wa-popup.wa-open {
                    transform: scale(1) translateY(0); opacity: 1; pointer-events: all;
                }
                .wa-header { background: #075E54; padding: 14px 16px; display: flex; align-items: center; gap: 12px; position: relative; }
                .wa-avatar { width: 44px; height: 44px; border-radius: 50%; background: #128C7E; display: flex; align-items: center; justify-content: center; font-size: 22px; border: 2px solid rgba(255,255,255,.2); flex-shrink: 0; }
                .wa-header-info h3 { font-size: .93rem; font-weight: 600; color: #fff; margin: 0; }
                .wa-header-info p { font-size: .73rem; color: rgba(255,255,255,.8); display: flex; align-items: center; gap: 5px; margin: 0; }
                .wa-header-info p::before { content: ''; width: 7px; height: 7px; border-radius: 50%; background: #25D366; display: inline-block; }
                .wa-close-btn { position: absolute; top: 10px; right: 12px; background: rgba(255,255,255,.15); border: none; border-radius: 50%; width: 26px; height: 26px; cursor: pointer; color: #fff; font-size: 13px; display: flex; align-items: center; justify-content: center; transition: background .2s; }
                .wa-close-btn:hover { background: rgba(255,255,255,.28); }
                .wa-body { background: #ece5dd; padding: 14px; }
                .wa-bubble { background: #fff; border-radius: 0 12px 12px 12px; padding: 11px 13px; font-size: .82rem; line-height: 1.5; color: #1a1a2e; box-shadow: 0 1px 3px rgba(0,0,0,.1); position: relative; max-width: 92%; animation: wa-bubble-in .4s ease both; margin-bottom: 12px; }
                @keyframes wa-bubble-in { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
                .wa-bubble::before { content: ''; position: absolute; top: 0; left: -8px; border-width: 0 8px 8px 0; border-style: solid; border-color: transparent #fff transparent transparent; }
                .wa-time { font-size: .66rem; color: #999; text-align: right; margin-top: 4px; }
                .wa-form { display: flex; flex-direction: column; gap: 8px; }
                .wa-submit-btn { display: flex; align-items: center; justify-content: center; gap: 8px; margin-top: 4px; background: #25D366; color: #fff; font-size: .86rem; font-weight: 600; padding: 12px 18px; border-radius: 50px; border: none; cursor: pointer; width: 100%; box-shadow: 0 3px 12px rgba(37,211,102,.35); transition: background .2s, transform .15s; }
                .wa-submit-btn:hover { background: #1ebe5d; transform: translateY(-1px); }
                .wa-submit-btn svg { width: 17px; height: 17px; flex-shrink: 0; }
                .wa-footer { background: #f5f5f5; padding: 7px 10px; text-align: center; font-size: .67rem; color: #aaa; }

                @media (max-width: 480px) {
                    .wa-fab { bottom: 16px; left: 16px; width: 48px; height: 48px; }
                    .wa-fab svg { width: 26px; height: 26px; }
                    .wa-popup { 
                        bottom: 80px; left: 16px; 
                        width: calc(100vw - 32px); 
                        max-width: 340px;
                        transform-origin: bottom left;
                    }
                    .wa-header { padding: 12px; }
                    .wa-avatar { width: 38px; height: 38px; font-size: 18px; }
                    .wa-body { padding: 12px; }
                    .wa-bubble { font-size: 0.78rem; padding: 10px; }
                    .wa-submit-btn { padding: 10px 14px; font-size: 0.82rem; }
                }

            `}</style>


            <button
                ref={fabRef}
                className="wa-fab"
                onClick={handleFabClick}
                aria-label="Chat on WhatsApp"
            >
                <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill="#fff" d="M16 2C8.268 2 2 8.268 2 16c0 2.49.658 4.826 1.806 6.845L2 30l7.38-1.784A13.93 13.93 0 0016 30c7.732 0 14-6.268 14-14S23.732 2 16 2z" />
                    <path fill="#25D366" d="M16 4.4A11.6 11.6 0 004.4 16c0 2.13.575 4.125 1.578 5.838l.248.42-1.053 3.84 3.956-1.036.408.233A11.555 11.555 0 0016 27.6 11.6 11.6 0 0027.6 16 11.6 11.6 0 0027.6 16 11.6 11.6 0 0016 4.4z" />
                    <path fill="#fff" fillRule="evenodd" d="M12.57 10.4c-.28-.623-.575-.636-.841-.647l-.716-.009c-.248 0-.652.093-.993.466-.341.373-1.303 1.272-1.303 3.1s1.334 3.595 1.52 3.843c.186.248 2.575 4.1 6.315 5.585 3.124 1.233 3.74.988 4.414.926.675-.062 2.171-.888 2.48-1.745.31-.857.31-1.59.217-1.745-.093-.155-.341-.248-.714-.435-.373-.187-2.171-1.072-2.513-1.196-.342-.124-.59-.187-.838.186-.249.373-.964 1.196-1.181 1.444-.217.248-.435.28-.808.093-.373-.186-1.573-.58-2.997-1.85-1.107-.988-1.854-2.207-2.072-2.58-.217-.373-.023-.574.163-.76.168-.167.373-.435.56-.652.186-.217.248-.373.373-.622.124-.249.062-.467-.031-.653-.093-.187-.822-2.023-1.135-2.769z" />
                </svg>
                {showBadge && <span className="wa-badge">1</span>}
            </button>

            <div
                ref={popupRef}
                className={`wa-popup ${isOpen ? 'wa-open' : ''}`}
                role="dialog"
                aria-label="WhatsApp Support"
            >
                <div className="wa-header">
                    <div className="wa-avatar">👨‍💼</div>
                    <div className="wa-header-info">
                        <h3>BidAlert Support</h3>
                        <p>Typically replies instantly</p>
                    </div>
                    <button className="wa-close-btn" onClick={() => setIsOpen(false)} aria-label="Close">✕</button>
                </div>

                <div className="wa-body">
                    <div className="wa-bubble">
                        👋 Hi! How can we help you with your tender search today?
                        <div className="wa-time">{timeStr}</div>
                    </div>

                    <div className="wa-form">
                        <button className="wa-submit-btn" onClick={handleSubmit}>
                            <svg viewBox="0 0 24 24" fill="currentColor">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                            </svg>
                            Chat on WhatsApp
                        </button>
                    </div>
                </div>

                <div className="wa-footer">🔒 End-to-end encrypted by WhatsApp</div>
            </div>
        </>
    );
}

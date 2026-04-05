import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const size = {
    width: 180,
    height: 180,
}
export const contentType = 'image/png'

export default function AppleIcon() {
    return new ImageResponse(
        (
            <div
                style={{
                    fontSize: 120,
                    background: '#0f1b35',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 36,
                    position: 'relative',
                }}
            >
                {/* Letter B */}
                <span
                    style={{
                        color: '#00c853',
                        fontWeight: 900,
                        fontFamily: 'sans-serif',
                        fontSize: 120,
                        lineHeight: 1,
                        marginTop: 10,
                    }}
                >
                    B
                </span>

                {/* Alert dot */}
                <div
                    style={{
                        position: 'absolute',
                        top: 16,
                        right: 16,
                        width: 40,
                        height: 40,
                        borderRadius: '50%',
                        background: '#00c853',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <span
                        style={{
                            color: '#0f1b35',
                            fontSize: 28,
                            fontWeight: 900,
                            lineHeight: 1,
                        }}
                    >
                        !
                    </span>
                </div>
            </div>
        ),
        { ...size },
    )
}

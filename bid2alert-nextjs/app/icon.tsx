import { ImageResponse } from 'next/og'

// Route segment config
export const runtime = 'edge'

// Image metadata
export const size = {
    width: 32,
    height: 32,
}
export const contentType = 'image/png'

// Image generation
export default function Icon() {
    return new ImageResponse(
        (
            // ImageResponse JSX element
            <div
                style={{
                    fontSize: 22,
                    background: '#0f1b35',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 6,
                    position: 'relative',
                }}
            >
                {/* Letter B */}
                <span
                    style={{
                        color: '#00c853',
                        fontWeight: 900,
                        fontFamily: 'sans-serif',
                        fontSize: 22,
                        lineHeight: 1,
                        marginTop: 2,
                    }}
                >
                    B
                </span>

                {/* Alert dot */}
                <div
                    style={{
                        position: 'absolute',
                        top: 3,
                        right: 3,
                        width: 8,
                        height: 8,
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
                            fontSize: 7,
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

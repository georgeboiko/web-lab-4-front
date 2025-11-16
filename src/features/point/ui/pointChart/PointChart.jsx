import styles from "./PointChart.module.css";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { showError } from "../../../error/errorSlice";
import { useMemo } from "react";

export const PointChart = ({pointHook, rGet}) => {

    const {points, pointsWithR, loading, getPoints, getPointsWithR, addPoints, deletePoints} = pointHook;

    const dispatch = useDispatch();

    const scale = 35;
    const delta = 4;
    const center = 200;
    const graphicColor = "rgba(255,255,255,0.9)";
    const [mousePos, setMousePos] = useState({ x: center, y: center });

    useEffect(() => {
        if (rGet) getPointsWithR(rGet);
    }, [points, rGet]);

    const handleMouseMove = (e) => {
        const svg = e.currentTarget;
        const rect = svg.getBoundingClientRect();

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        setMousePos({ x, y });
    };

    const handleClick = (e) => {
        const svg = e.currentTarget;
        const rect = svg.getBoundingClientRect();

        const rawX = e.clientX - rect.left;
        const rawY = e.clientY - rect.top;

        const x = (rawX - center) / scale;
        const y = (center - rawY) / scale;

        if (rGet === null) {
            dispatch(showError({
                description: "R can't be null",
                fullText: null
            }));
            return;
        }

        addPoints({
            points: [
                {
                    x: x,
                    y: y,
                    r: rGet
                }
            ]
        });
    }

    const validate = (x, y, r) => {
        let error = "";
        if (x === null || x === "" || x < -5 || x > 3) error += "X must be in [-5; 3] \n";
        if (y === null || y === "" || y < -3 || y > 5) error += "Y must be in [-3; 5] \n";
        if (r === null || r === "" || r < -5 || r > 3) error += "R must be in [-5; 3] \n";
        return error;
    };

    const generateBatmanPath = useMemo(() => {
        if (!rGet || rGet === 0) return '';

        const scaleFactor = Math.abs(rGet / 7); 
        let pathData = '';
        let firstPoint = true;

        for (let localX = -7; localX <= 7; localX += 0.05) {
            const absX = Math.abs(localX);
            let localY;

            if (absX >= 3 && absX <= 7) {
                localY = 3 * Math.sqrt(1 - (localX / 7) ** 2);
            } else if (absX >= 1.5 && absX < 3) {
                const dx = absX - 2.25;
                localY = 2.0 - Math.sqrt(Math.max(0, 1 - dx * dx / (0.75 ** 2)));
            } else if (absX >= 0.6 && absX < 1.5) {
                if (absX <= 0.9) {
                    const dx = absX - 0.75;
                    localY = 3 + 0.4 * Math.sqrt(Math.max(0, 1 - dx * dx / (0.15 ** 2)));
                } else {
                    localY = 2.0 + (1.5 - absX) * 0.3;
                }
            } else {
                localY = 2.8;
            }

            const worldX = localX * scaleFactor;
            const worldY = localY * scaleFactor;
            const pixelX = center + worldX * scale;
            const pixelY = center - worldY * scale;

            if (firstPoint) {
                pathData += `M ${pixelX} ${pixelY} `;
                firstPoint = false;
            } else {
                pathData += `L ${pixelX} ${pixelY} `;
            }
        }

        for (let localX = 7; localX >= -7; localX -= 0.05) {
            const absX = Math.abs(localX);
            let localY;

            if (absX >= 4 && absX <= 7) {
                localY = -3 * Math.sqrt(1 - (localX / 7) ** 2);
            } else {
                const term1 = Math.abs(localX / 2);
                const term2 = ((3 * Math.sqrt(33) - 7) / 112) * localX ** 2;
                const term3 = Math.sqrt(Math.max(0, 1 - (Math.abs(absX - 2) - 1) ** 2));
                localY = term1 - term2 - 3 + term3;
            }

            const worldX = localX * scaleFactor;
            const worldY = localY * scaleFactor;
            const pixelX = center + worldX * scale;
            const pixelY = center - worldY * scale;
            pathData += `L ${pixelX} ${pixelY} `;
        }

        pathData += 'Z';
        return pathData;
    }, [rGet]);

    return (
        <div className={styles.container}>
            <svg className={styles.svg} onMouseMove={handleMouseMove} width={2*center} height={2*center} onClick={handleClick}>

                <defs>
                    <radialGradient id="pointerGradient" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="rgba(255,255,255,1)" />
                        <stop offset="15%" stopColor="rgba(255,255,255,0.7)" />
                        <stop offset="50%" stopColor="rgba(255,255,255,0.3)" />
                        <stop offset="100%" stopColor="rgba(255,255,255,0)" />
                    </radialGradient>
                    <radialGradient id="errorGradient" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="rgba(255,0,0,1)" />
                        <stop offset="15%" stopColor="rgba(255,0,0,0.7)" />
                        <stop offset="50%" stopColor="rgba(255,0,0,0.3)" />
                        <stop offset="100%" stopColor="rgba(255,0,0,0)" />
                    </radialGradient>
                </defs>

                <rect
                    x={center - 5 * scale}
                    y={center - 5 * scale}
                    width={8 * scale}
                    height={8 * scale}
                    fill="rgba(255, 255, 255, 0.1)"
                />

                <path
                    d={generateBatmanPath}
                    fill="rgba(234, 245, 255, 0.5)"
                    stroke="rgba(225, 240, 255, 0.8)"
                    strokeWidth="1"
                />

                <line x1={0} y1={center} x2={2*center} y2={center} stroke={graphicColor} />
                <line x1={center} y1={0} x2={center} y2={2*center} stroke={graphicColor} />

                {[1,2,3,4,5].map(v => (
                    <g key={v}>
                        <line x1={center + v*scale} y1={center-delta} x2={center + v*scale} y2={center+delta} stroke={graphicColor}/>
                        <text className={styles.text} x={center + v*scale - 5} y="220">{v}</text>
                    </g>
                ))}

                {[1,2,3,4,5].map(v => (
                    <g key={-v}>
                        <line x1={center - v*scale} y1={center-delta} x2={center - v*scale} y2={center+delta} stroke={graphicColor}/>
                        <text className={styles.text} x={center - v*scale - 10} y="220">-{v}</text>
                    </g>
                ))}

                <circle cx={center} cy={center} r={delta} fill={graphicColor}/>

                {[1,2,3,4,5].map(v => (
                    <g key={"y"+v}>
                        <line x1={center-delta} y1={center - v*scale} x2={center+delta} y2={center - v*scale} stroke={graphicColor}/>
                        <text className={styles.text} x="205" y={center - v*scale + 5}>{v}</text>
                    </g>
                ))}

                {[1,2,3,4,5].map(v => (
                    <g key={"y-"+v}>
                        <line x1={center-delta} y1={center + v*scale} x2={center+delta} y2={center + v*scale} stroke={graphicColor}/>
                        <text className={styles.text} x="180" y={center + v*scale + 5}>-{v}</text>
                    </g>
                ))}

                <polygon points="400,200 390,195 390,205" fill={graphicColor} />
                <polygon points="200,0 195,10 205,10" fill={graphicColor} />

                <circle
                    cx={mousePos.x}
                    cy={mousePos.y}
                    r={25}
                    fill={validate((mousePos.x-center)/scale, (center-mousePos.y)/scale, rGet).length === 0 ? "url(#pointerGradient)" : "url(#errorGradient)"}
                />

                {
                    pointsWithR && pointsWithR.validPoints.map(result => (
                        <circle
                            key={result.id}
                            cx={result.x*scale + center}
                            cy={-result.y*scale + center}
                            r={4}
                            fill={result.success ? "rgb(45, 255, 69)" : "rgb(255, 67, 67)"}
                            className={styles.resPoint}
                        />
                    ))
                }

            </svg>
        </div>
    );

};
import styles from "./PointChart.module.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { showError } from "../../../error/errorSlice";

export const PointChart = ({pointHook, rGet}) => {

    const {points, loading, getPoints, addPoints, deletePoints} = pointHook;

    const dispatch = useDispatch();

    const scale = 35;
    const delta = 4;
    const center = 200;
    const graphicColor = "rgba(255,255,255,0.9)";
    const [mousePos, setMousePos] = useState({ x: center, y: center });

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
                </defs>


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
                    fill="url(#pointerGradient)"
                />

                

            </svg>
        </div>
    );

};